# `@dreamloops/okf-exporter`

Exports human-readable `.dreamloop.md`, `.mdloop`, and Markdown Loop documents into standalone OKF-style playbooks with source references and an index.

```bash
dreamloops-okf --source ./library/dreamnet --output ./exports/okf
```

The exporter reads local files and writes local Markdown only. It does not call networks, mutate memory systems, or publish content.
