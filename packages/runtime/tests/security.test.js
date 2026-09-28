import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import { DreamLoopRunner, capsuleContentHash } from '../src/index.js';

function pair(permission = 'runtime.health.read') {
  const read = name => JSON.parse(fs.readFileSync(new URL(`../templates/${name}.manifest.json`, import.meta.url)));
  const capsule = read('capsule'); const loop = read('dreamloop');
  capsule.permissions = { allowed: [permission], blocked: [] };
  loop.allowed_actions = [permission]; loop.blocked_actions = [];
  loop.steps = [{ id: 'one', handler: permission, permission, with: {} }];
  return { capsule, loop };
}
function run(p, handler, options = {}) {
  p.capsule.provenance.content_hash = capsuleContentHash(p.capsule);
  return new DreamLoopRunner({ handlers: { [p.loop.steps[0].handler]: handler }, grantedPermissions: p.loop.allowed_actions, ...options }).run(p);
}
test('read_only cannot execute production.deploy even with lower grants', async () => {
  let calls = 0;
  await assert.rejects(run(pair('production.deploy'), async () => { calls++; }), /permission tier/);
  assert.equal(calls, 0);
});
test('the most restrictive step ceiling rejects before any handler runs', async () => {
  for (const host of [false, true]) {
    const p = pair(); p.loop.steps.push({ ...p.loop.steps[0], id: 'two' });
    if (!host) p.capsule.resource_limits.max_steps = 1;
    let calls = 0;
    await assert.rejects(run(p, async () => { calls++; }, host ? { limits: { max_steps: 1 } } : {}), /step ceiling/);
    assert.equal(calls, 0);
  }
});
test('Capsule retry budget limits attempts and produces a failure receipt', async () => {
  const p = pair(); p.capsule.resource_limits.max_retries_per_step = 1;
  p.loop.limits.max_retries_per_step = 2; p.loop.steps[0].retry = { max_attempts: 3 };
  let calls = 0;
  await assert.rejects(run(p, async () => { calls++; throw new Error('inert failure'); }), error => {
    assert.equal(error.receipt.effectiveLimits.max_retries_per_step, 1);
    assert.equal(error.receipt.steps.length, 2); return true;
  });
  assert.equal(calls, 2);
});
test('host can prohibit retries', async () => {
  const p = pair(); p.loop.steps[0].retry = { max_attempts: 2 }; let calls = 0;
  await assert.rejects(run(p, async () => { calls++; throw new Error('inert failure'); }, { limits: { max_retries_per_step: 0 } }));
  assert.equal(calls, 1);
});
test('Capsule timeout stops retries and continuation with cooperative abort', async () => {
  const p = pair(); p.capsule.resource_limits.max_wall_time_ms = 25;
  p.loop.steps[0].retry = { max_attempts: 2 }; let calls = 0; let aborted = false;
  await assert.rejects(run(p, async ({ signal }) => {
    calls++;
    return new Promise((resolve, reject) => signal.addEventListener('abort', () => { aborted = true; reject(signal.reason); }, { once: true }));
  }), /timed out|wall-time/);
  assert.equal(calls, 1); assert.equal(aborted, true);
});
test('unmapped capabilities and attempts to weaken built-in tiers fail closed', async () => {
  await assert.rejects(run(pair('custom.inspect'), async () => ({})), /unmapped/);
  assert.throws(() => new DreamLoopRunner({ permissionTiers: { 'production.deploy': 'read_only' } }), /cannot weaken/);
  const receipt = await run(pair('custom.inspect'), async () => ({ checked: true }), { permissionTiers: { 'custom.inspect': 'read_only' } });
  assert.equal(receipt.status, 'completed');
});
test('privileged handler cannot be relabelled as read-only', async () => {
  const p = pair(); p.loop.steps[0].handler = 'production.deploy'; let calls = 0;
  await assert.rejects(run(p, async () => { calls++; }), /handler permission mismatch/);
  assert.equal(calls, 0);
});
test('host-bound alias works without permitting manifest-controlled binding', async () => {
  const p = pair(); p.loop.steps[0].handler = 'inspect';
  const result = await run(p, async () => ({ inspected: true }), { handlerPermissions: { inspect: 'runtime.health.read' } });
  assert.equal(result.status, 'completed');
});
test('entire plan preflight blocks earlier effects when a later step is prohibited', async () => {
  const p = pair(); p.loop.allowed_actions.push('production.deploy');
  p.loop.steps.push({ id: 'later', handler: 'production.deploy', permission: 'production.deploy' });
  let calls = 0; await assert.rejects(run(p, async () => { calls++; })); assert.equal(calls, 0);
});
test('caller mutation during state retrieval cannot broaden the plan', async () => {
  const p = pair(); p.stateKey = 'test';
  const receipt = await run(p, async () => ({ inert: true }), { stateStore: {
    async get() { p.loop.steps[0].permission = 'production.deploy'; return {}; }, async put() {},
  } });
  assert.equal(receipt.steps[0].permission, 'runtime.health.read');
});
