# Dependency Vulnerability Review (2026-04-22)

This review validates the vulnerable packages reported in `package-lock.json` and maps each one to the currently resolved version in this repository.

## Method used

- Enumerated package versions from `package-lock.json` using a Node.js script.
- Cross-checked dependency paths with `npm ls <package> --all`.
- Attempted `npm audit --json`, but the environment returned `403 Forbidden` for the advisory endpoint.

## Findings

| Dependency | Version(s) currently resolved | Reported safe target | Status |
|---|---:|---:|---|
| loader-utils | 0.2.17, 2.0.4, 3.3.1 | `~1.4.1` | **Needs review**: legacy `0.2.17` present via `postcss-icss-selectors -> generic-names`. |
| json5 | 0.5.1, 2.2.3 | `~1.0.2` | **Needs review**: legacy `0.5.1` present via `generic-names -> loader-utils@0.2.17`. |
| postcss | 6.0.23, 7.0.39, 8.5.4 | `~8.4.31` | **Version appears above target** for main path (`8.5.4`), but older majors still present for older plugins. |
| parse-git-config | 3.0.0 | (not provided) | **Needs remediation**: comes from `git-repo-name -> remote-origin-url`. |
| on-headers | 1.0.2 | `~1.1.0` | **Needs remediation** (`webpack-dev-server -> compression`). |
| min-document | 2.19.0 | `~2.19.1` | **Needs remediation** (`react-hot-loader -> global`). |
| @messageformat/runtime | 3.0.1 | `~3.0.2` | **Needs remediation** (`prettier-eslint-cli -> @messageformat/core`). |
| js-yaml | 3.14.1, 4.1.0 | `~4.1.1` | **Needs remediation** for `3.14.1` path and patch bump for v4 path. |
| glob | 7.2.3, 10.4.5 | `~10.5.0` | **Needs review**: vulnerable report may target v10 path; patch bump recommended. |
| node-forge | 1.3.1 | `~1.3.2` | **Needs remediation** (`webpack-dev-server -> selfsigned`). |
| qs | 6.13.0 | `~6.14.1` | **Needs remediation** (`express`). |
| lodash | 4.17.21 | `~4.17.23` | **Needs remediation**. |
| webpack | 5.99.9 | `~5.104.1` | **Needs remediation** (direct devDependency bump). |
| minimatch | 3.0.8, 3.1.2, 9.x | `~3.1.3` | **Needs remediation** for v3 paths. |
| serialize-javascript | 6.0.2 | `~7.0.3` | **Needs remediation** (`webpack -> terser-webpack-plugin`). |
| svgo | 3.3.2 | `~3.3.3` | **Needs remediation**. |
| socket.io-parser | 4.2.4 | `~4.2.6` | **Needs remediation** (`socket.io-client`). |
| flatted | 3.3.3 | `~3.4.2` | **Needs remediation**. |
| picomatch | 2.3.1 | `~2.3.2` | **Needs remediation**. |
| follow-redirects | 1.15.9 | `~1.16.0` | **Needs remediation** (`http-proxy`). |

## Blockers encountered while remediating

1. `npm audit` is currently blocked by registry policy:
   - `403 Forbidden - POST https://registry.npmjs.org/-/npm/v1/security/advisories/bulk`
2. Attempting to install updated versions is blocked in this environment for some packages:
   - `403 Forbidden - GET https://registry.npmjs.org/webpack`

## Recommended remediation strategy

1. **Unblock registry access for installs and audit**, then run:
   - `npm audit --json`
   - `npm audit fix`
   - targeted updates for unresolved transitive dependencies.
2. Add `overrides` in `package.json` for transitive-only vulnerable packages that are not updated by parent package bumps.
3. Replace or remove stale packages introducing old transitive chains (notably `git-repo-name` path pulling `parse-git-config@3.0.0` and `postcss-icss-selectors` path pulling `loader-utils@0.2.17`/`json5@0.5.1`).
4. Re-run full checks:
   - `npm ls` for each affected package
   - `npm audit --production --json`
   - project lint/tests/build.
