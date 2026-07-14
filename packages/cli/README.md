# `@dreamloops/cli`

Command-line tools for creating and inspecting persistent-agent projects.

```bash
dreamloops init ./my-agent
dreamloops validate ./capsule.manifest.json
dreamloops validate-all
dreamloops seal ./capsule.manifest.json
dreamloops list
dreamloops run --capsule ./capsule.manifest.json --loop ./dreamloop.manifest.json
```

`run` is a simulation command. It registers inert dry-run handlers and performs no external action. Real applications must register their own typed handlers through `@dreamloops/runtime`.
