# XNS Storage plugin for Claude

S3-compatible cloud object storage from XNS, set up and managed by your AI assistant. $6.00 per TB per month. $0 egress, uncapped. 30-day minimum retention, no early-delete fee. A small gateway, the Relayer, runs in Docker on your own machine, which gives you control, privacy and a say in where your data lives; it speaks S3 locally and spreads your data across a network of independent storage hosts. Use it as cloud storage for backups and developer tools.

With this plugin, Claude can check your machine, help you create an [XNS](https://xns.tech)
account, install the Relayer, link it to your account, let you choose where your data is
stored, and confirm that storage works. Your part is four browser steps: sign up, click one
email link, confirm one claim and sign in to the Relayer dashboard. Claude never sees your password.

This plugin holds the instructions. The tools that do the work come from the XNS Relayer
connector (`xns-relayer`), a separate plugin that runs on your computer. Install both.

## Install

In Claude Code, run these commands in order:

```text
/plugin marketplace add xns-cloud/xns-storage-plugin
/plugin install xns-storage@xns-cloud
/plugin install xns-relayer@xns-cloud
```

If you installed XNS Storage from the Claude plugin directory, skip the second command.
Then say: set up XNS storage

In claude.ai chat the XNS tools cannot load, because they run only on a computer. There the
plugin explains XNS and gives these same steps to run on a computer with Docker and Node.js 24,
in Claude Code or Cowork.

In Cowork (the Claude desktop app), open the Plugins page, add the GitHub marketplace
`xns-cloud/xns-storage-plugin` and install `xns-storage` and `xns-relayer`.

## What's inside

- **Skill `set-up-xns-storage`**: the onboarding sequence from sign-up to a verified bucket.
- **Skill `use-xns-storage`**: pointing S3 tools at the Relayer and day-to-day changes.

The connector, in its own plugin: the XNS Relayer MCP server
([`@xns-cloud/relayer-mcp`](https://www.npmjs.com/package/@xns-cloud/relayer-mcp), open
source, [source code](https://github.com/xns-cloud/relayer-mcp)), with 15 tools for install,
sign-in, health checks, settings, restarts and configuration backups. What it runs, sends and
fetches is listed in its
[README](https://github.com/xns-cloud/xns-storage-plugin/blob/main/connector/README.md).

## Requirements

- Docker Engine with the compose plugin, on the machine where Claude runs the tools
  ([install Docker Engine](https://docs.docker.com/engine/install/))
- Node.js 24 or newer ([download Node.js](https://nodejs.org/en/download))
- Ports 8888, 9000 and 9443 free, and at least 10 GB of free disk

## Example prompts

- "Set up XNS storage." Claude runs the `set-up-xns-storage` skill: prerequisites check,
  sign-up, Relayer install, claim, and a verified bucket.
- "Check that my Relayer is healthy." Claude calls `check_relayer_health`.
- "Show which Relayer settings I can change, then restart it if one needs a restart." Claude
  calls `describe_settings`, `update_settings` and `restart_service`.
- "Point rclone at my Relayer." Claude uses the `use-xns-storage` skill to give the S3
  endpoint and remote settings.
- "List my Relayer configuration backups." Claude calls `manage_backups`.

## What this plugin runs, sends and fetches

Nothing. This plugin is two skills: text that tells Claude how to set up and use XNS storage.
It runs no program, starts no server, and sends and fetches nothing. The connector does that
work; see its README, linked above.

## Privacy policy

XNS privacy policy: <https://xns.tech/privacy-policy>. Terms of service:
<https://xns.tech/tos>. Details for the MCP server:
[PRIVACY.md](https://github.com/xns-cloud/relayer-mcp/blob/main/PRIVACY.md).

## Security

Report security issues to support@xns.tech.

## Support

Open an issue at <https://github.com/xns-cloud/xns-storage-plugin/issues>, or see
<https://xns.tech>. Troubleshooting for the MCP server:
<https://github.com/xns-cloud/relayer-mcp#troubleshooting>.

## License

Apache-2.0 © SCP Corp. See [LICENSE](./LICENSE).
