import { PERMISSION_TIERS } from './contracts.js';

// Exact names from the starter kit. New capabilities require a host-owned mapping.
const read = ['runtime.health.read', 'memory.read', 'state.local.read', 'task.read',
  'budget.read', 'model.usage.read', 'component.catalog.read', 'source.public.read',
  'project.read', 'proposal.local.read', 'relationship.read', 'inbox.read', 'calendar.read',
  'checkpoint.local.read', 'source.local.read', 'warper.assignment.read', 'warper.receipt.read'];
const local = ['receipt.local.write', 'proposal.local.write', 'approval.request',
  'communication.draft', 'artifact.local.write', 'creative.draft', 'creative.review',
  'project.write', 'checkpoint.local.write', 'memory.write', 'task.plan', 'experiment.local.run',
  'experiment.result.evaluate', 'message.classify', 'state.local.write', 'task.capture',
  'memory.consolidate', 'memory.expire', 'priority.plan', 'relationship.write', 'citation.write', 'research.synthesize'];
const live = ['social.publish', 'wallet.sign', 'warper.approval.request', 'warper.artifact.submit',
  'warper.context.append', 'warper.trapper.close', 'warper.trapper.open'];
export const DEFAULT_PERMISSION_TIERS = Object.freeze(Object.fromEntries([
  ...read.map(name => [name, 'read_only']), ...local.map(name => [name, 'local_draft_write']),
  ...live.map(name => [name, 'live_guarded_action']),
  ['production.deploy', 'production_write'], ['cloud.mutate', 'production_write'],
]));

export function createPermissionPolicy(overrides = {}) {
  const mapping = new Map(Object.entries(DEFAULT_PERMISSION_TIERS));
  for (const [permission, tier] of Object.entries(overrides)) {
    if (!PERMISSION_TIERS.includes(tier)) throw new Error(`unknown permission tier: ${tier}`);
    if (mapping.has(permission) && PERMISSION_TIERS.indexOf(tier) < PERMISSION_TIERS.indexOf(mapping.get(permission))) {
      throw new Error(`cannot weaken built-in permission tier: ${permission}`);
    }
    mapping.set(permission, tier);
  }
  return (permission, tier) => {
    const required = mapping.get(permission);
    if (!required) throw new Error(`unmapped permission: ${permission}`);
    if (PERMISSION_TIERS.indexOf(required) > PERMISSION_TIERS.indexOf(tier)) {
      throw new Error(`permission tier ${tier} cannot authorize ${permission} (requires ${required})`);
    }
  };
}
