# Security Policy

Report vulnerabilities privately through GitHub Security Advisories for this repository. Do not open a public issue containing credentials, exploit details, private data, or a working bypass.

## Trust Boundary

Capsules and DreamLoop manifests are untrusted data. Runtimes must never evaluate manifest text, import code named by an arbitrary path, infer permissions from prose, or treat a content hash as authorization.

Authority requires all three:

1. The Capsule allows the typed permission.
2. The DreamLoop step declares the same permission.
3. The host runtime grants that permission and registers the named handler.

Blocked permissions override allowed permissions. Connector clients default to disabled mode. Secret values, private keys, signer material, wallet authority, and unrestricted shell access do not belong in portable packages.
