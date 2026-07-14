# GENEALOGIST INTEGRATION LAYER

The Genealogist receives assessments from fish species and verifies lineage,
parentage, mutation history, and provenance. It may reject an invalid lineage
claim, but it does not approve deployment or other external action.

Hybridization proposals flow through:

```text
species assessments
-> Genealogist lineage review
-> policy checks
-> Quorum decision when required
-> signed receipt
-> capsule manifest update
```

Without reproducible receipt references, lineage review and governance remain
`pending` and capsule activation remains `blocked`.
