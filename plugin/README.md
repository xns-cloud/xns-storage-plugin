# XNS Storage plugin for Claude

S3-compatible cloud object storage from XNS, set up and managed by your AI assistant. $6.00 per TB per month. $0 egress, uncapped. 30-day minimum retention, no early-delete fee. A small gateway, the Relayer, runs in Docker on your own machine, which gives you control, privacy and a say in where your data lives; it speaks S3 locally and spreads your data across a network of independent storage hosts. Use it as cloud storage for backups and developer tools.

With this plugin, Claude can check your machine, help you create an [XNS](https://xns.tech)
account, install the Relayer, link it to your account, let you choose where your data is
stored, and confirm that storage works. Your part is four browser steps: sign up, click one
email link, confirm one claim and sign in to the Relayer dashboard. Claude never sees your password.

## Install

In Claude Code, run these two commands in order:

```text
/plugin marketplace add xns-cloud/xns-storage-plugin
/plugin install xns-storage@xns-cloud
```

Then say: set up XNS storage

In claude.ai chat the XNS tools cannot load, because they run only on a computer. There the
plugin explains XNS and gives these same steps to run on a computer with Docker and Node.js 24,
in Claude Code or Cowork.

In Cowork (the Claude desktop app), open the Plugins page, add the GitHub marketplace
`xns-cloud/xns-storage-plugin` and install `xns-storage`.

## What's inside

- **The XNS Relayer MCP server**
  ([`@xns-cloud/relayer-mcp`](https://www.npmjs.com/package/@xns-cloud/relayer-mcp), open
  source, [source code](https://github.com/xns-cloud/relayer-mcp)): 15 tools for install,
  sign-in, health checks, settings, restarts and configuration backups.
- **Skill `set-up-xns-storage`**: the onboarding sequence from sign-up to a verified bucket.
- **Skill `use-xns-storage`**: pointing S3 tools at the Relayer and day-to-day changes.

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

- **Runs** the MCP server with `npx -y @xns-cloud/relayer-mcp@0.13.0`, which downloads that
  exact version from the npm registry.
- **Starts Docker containers** on your machine when you ask Claude to install the Relayer. It
  writes `docker-compose.yml` and `.env` to the install directory. The release compose pulls
  eight images:
  - `releases.xns.tech/xns-relayer`, the Relayer, from `releases.xns.tech`
  - `releases.xns.tech/relayer-loki`, log storage, from `releases.xns.tech`
  - `releases.xns.tech/relayer-alloy`, log collection, from `releases.xns.tech`
  - `releases.xns.tech/relayer-audit-logrotate`, audit log rotation, from `releases.xns.tech`
  - `releases.xns.tech/relayer-prometheus`, metrics, from `releases.xns.tech`
  - `releases.xns.tech/relayer-alertmanager`, alerts, from `releases.xns.tech`
  - `releases.xns.tech/relayer-grafana`, dashboards, from `releases.xns.tech`
  - `prom/node-exporter`, host metrics, from Docker Hub
- **Contacts** `auth.xns.tech` for sign-in (in your browser, with PKCE), `console.xns.tech`
  to claim your Relayer and to read or change its settings, `releases.xns.tech` to download
  the compose bundle and images, and Docker Hub for the `prom/node-exporter` image.
- **Sends your sign-in token to your Relayer.** The tools that send it
  to a host you name (`verify_storage`, `setup_cli_credentials`) accept only `localhost`,
  loopback, private (RFC 1918) addresses and `*.local`. `get_host_tags` and `configure_vpd` send
  it to the Relayer address set in the server, `http://localhost:8888` by default; the caller
  cannot change it, and those two follow a redirect the Relayer returns, where the other two
  refuse one. Three inputs take any address: the host of the health
  check, the S3 endpoint of the storage test, and a custom compose file URL for install.
- **Writes** `~/.xns/credentials` only when `setup_cli_credentials` runs. The skills do not call
  it, because it needs a sign-in token that no tool hands back; create keys in the dashboard.
- **Does not** collect telemetry, analytics or crash reports. Sign-in tokens stay in memory
  and are discarded when the server exits. Your stored objects never pass through the plugin.

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
