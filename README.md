# XNS Storage plugin for Claude

A Claude Code plugin marketplace for XNS S3-compatible cloud object storage.
$6.00 per TB per month. $0 egress, uncapped. 30-day minimum retention, no early-delete fee.

It holds two plugins:

- [`plugin/`](./plugin): `xns-storage`, the set-up and day-to-day skills. Full documentation in
  [plugin/README.md](./plugin/README.md).
- [`connector/`](./connector): `xns-relayer`, the XNS Relayer MCP server that runs on your
  computer and gives Claude the tools. Details in [connector/README.md](./connector/README.md).

## Install

In Claude Code, run these commands in order:

```text
/plugin marketplace add xns-cloud/xns-storage-plugin
/plugin install xns-storage@xns-cloud
/plugin install xns-relayer@xns-cloud
```

If you installed XNS Storage from the Claude plugin directory, skip the second command.
Then say: set up XNS storage

Requirements: Docker Engine with the compose plugin
([install](https://docs.docker.com/engine/install/)) and Node.js 24
([download](https://nodejs.org/en/download)).

## Support and security

Support: <https://github.com/xns-cloud/xns-storage-plugin/issues> or <https://xns.tech>.
Report security issues to support@xns.tech.

## License

Apache-2.0 © SCP Corp. See [LICENSE](./LICENSE).
