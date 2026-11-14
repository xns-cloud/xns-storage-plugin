# XNS Storage plugin for Claude

A Claude Code plugin and marketplace for XNS S3-compatible cloud object storage.
$6.00 per TB per month. $0 egress, uncapped. 30-day minimum retention, no early-delete fee.
The plugin
lives in [`plugin/`](./plugin); its full documentation is in
[plugin/README.md](./plugin/README.md).

## Install

In Claude Code, run these two commands in order:

```text
/plugin marketplace add xns-cloud/xns-storage-plugin
/plugin install xns-storage@xns-cloud
```

Then say: set up XNS storage

Requirements: Docker Engine with the compose plugin
([install](https://docs.docker.com/engine/install/)) and Node.js 24
([download](https://nodejs.org/en/download)).

## Support and security

Support: <https://github.com/xns-cloud/xns-storage-plugin/issues> or <https://xns.tech>.
Report security issues to support@xns.tech.

## License

Apache-2.0 © SCP Corp. See [LICENSE](./LICENSE).
