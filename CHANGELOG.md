# Changelog

## [0.3.1] - 2026-11-23

### Changed

- The plugin starts `@xns-cloud/relayer-mcp@0.14.1` (was 0.13.0). That brings relayer-mcp
  0.14.0's changes: `setup_cli_credentials` signs in with the server's own credentials instead of
  taking a sign-in token, and `install_relayer` takes a `compose_url` only from
  `releases.xns.tech`, a `file://` path or a local-network host. 0.14.1 adds `?src=mcp` to the
  default compose download.
- Both skills now offer `setup_cli_credentials` as an optional step: once the claim reaches
  STATE_3 it makes an S3 key pair and writes `~/.xns/credentials`. The skills still never ask the
  user to paste a sign-in token.

## [0.3.0] - 2026-11-13

### Changed

- The plugin now lives in `plugin/`; the marketplace entry's source is `./plugin`. Tests,
  the changelog and the marketplace file stay at the repository root.
- The README and the set-up skill no longer give a download-and-run install command. They state
  the requirements (Docker Engine with the compose plugin, Node.js 24) and link the Docker and
  Node.js install pages. The set-up skill still asks whether to keep or replace an existing
  Relayer.
- `documentationUrl` points to `plugin/README.md`.

### Added

- README sections for example prompts and for reporting security issues.
- Tests: allowed file types under `plugin/`, no download-and-run commands, example prompts,
  security contact, marketplace source, and skill frontmatter keys.

## [0.2.0] - 2026-11-13

### Changed

- The plugin starts `@xns-cloud/relayer-mcp@0.13.0`, the version published on npm and the MCP
  registry. The README names the same version.
- The manifest description and the README opening lead with S3-compatible cloud object storage,
  carry the full price line, and describe the gateway on your machine as control and privacy.
- The README lists every image the Relayer install pulls and where each comes from, the hosts the
  plugin contacts, and the Relayer that the host install script starts.
- Both skills have a section for conversations where the XNS tools are not loaded (claude.ai chat,
  an MCP server that failed to start, Node.js missing). They call no tool and give the steps to run
  on a computer with Docker and Node.js 24.
- The set-up skill asks before keeping or replacing an existing Relayer and installs only from the
  release files unless the user supplies their own compose file. Neither skill calls
  `setup_cli_credentials` or asks for a sign-in token; keys come from the dashboard.
- The README states which tools are limited to private addresses, matching the MCP server's
  privacy notes.
- Node.js 24 is the stated minimum, matching the MCP server.

### Added

- `.claude-plugin/marketplace.json`: the `xns-cloud` marketplace, so that
  `/plugin install xns-storage@xns-cloud` works. The entry has the category `deployment`, tags,
  and a relevance block for the `aws`, `rclone`, `restic` and `s5cmd` commands and for projects
  that depend on `boto3` or `@aws-sdk/client-s3`.
- Manifest fields: `icon`, `documentationUrl`, `supportUrl`, `privacyPolicyUrl` and
  `termsOfServiceUrl`, plus the icon file at `assets/icon.png`.
- Tests in `test/`: offline checks of the listing files, and network checks of the pinned version,
  the listing links and the README's image list.
