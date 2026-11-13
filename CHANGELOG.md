# Changelog

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
- The set-up skill works with whichever XNS tool set is loaded.
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
