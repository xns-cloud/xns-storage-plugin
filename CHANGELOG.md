# Changelog

## [0.4.0] - 2026-11-23

### Changed

- The MCP server moved out of `xns-storage` into a second plugin, `xns-relayer`, in
  `connector/`. `xns-storage` in `plugin/` now holds only the two skills, the README, the
  license and the icon. The marketplace lists both plugins; install both.
- The skills and READMEs give three install commands: add the marketplace, install
  `xns-storage` (skipped when it came from the Claude plugin directory), install `xns-relayer`.
- When the XNS tools are missing, the skills name the connector as their source and give the
  steps to install it.
- What the MCP server runs, sends and fetches is documented in `connector/README.md`.
- Upgrading from 0.3.x: after `xns-storage` updates, the XNS tools are gone until
  `xns-relayer` is installed. They then load under the new plugin's name, so tool permissions
  saved for the old names have to be granted again.
- The connector starts `@xns-cloud/relayer-mcp@0.14.3`, where `setup_cli_credentials` keeps every
  profile in `~/.xns/credentials` that holds keys and gives the new key its permissions: read,
  write and delete in every bucket. The skills no longer ask whether to replace the file, and give
  the user the `xns` command from the reply.

### Fixed

- 0.3.1 pinned `@xns-cloud/relayer-mcp@0.14.1`, which is not on npm, so its MCP server could not
  start.

### Added

- Tests: `plugin/` holds no MCP server, hooks or launcher text; `connector/` holds exactly one
  pinned MCP server; both plugins carry the same version.

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
- The README's "What this plugin runs, sends and fetches" section now matches relayer-mcp 0.14.1:
  it names every tool that sends the sign-in token to the server's own Relayer address and which
  of them refuse a redirect, says settings calls go to the Relayer rather than
  `console.xns.tech`, `setup_cli_credentials` uses the server's own sign-in, a custom compose file URL is limited to `releases.xns.tech`, a `file://`
  path or a local-network host, and the default compose download carries `?src=mcp`, a fixed
  source tag with no identifier. Because the tool replaces `~/.xns/credentials` with a single
  profile, the README says so and both skills first ask the user whether that file holds
  profiles they want to keep.

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
