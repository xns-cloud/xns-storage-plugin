# XNS Relayer connector for Claude

The connector for [XNS](https://xns.tech) Storage. It runs the XNS Relayer MCP server
([`@xns-cloud/relayer-mcp`](https://www.npmjs.com/package/@xns-cloud/relayer-mcp), open
source, [source code](https://github.com/xns-cloud/relayer-mcp)) on your computer: 15 tools for
install, sign-in, health checks, settings, restarts and configuration backups of the Relayer.

The skills that tell Claude how to use these tools are in the `xns-storage` plugin
([`plugin/`](../plugin)). Install both.

## Install

In Claude Code, run these commands in order:

```text
/plugin marketplace add xns-cloud/xns-storage-plugin
/plugin install xns-storage@xns-cloud
/plugin install xns-relayer@xns-cloud
```

If `xns-storage` is already installed from the Claude plugin directory, skip the second command.
Then say: set up XNS storage

In Cowork (the Claude desktop app), open the Plugins page, add the GitHub marketplace
`xns-cloud/xns-storage-plugin` and install `xns-storage` and `xns-relayer`.

## Requirements

- Docker Engine with the compose plugin, on the machine where Claude runs the tools
  ([install Docker Engine](https://docs.docker.com/engine/install/))
- Node.js 24 or newer ([download Node.js](https://nodejs.org/en/download))
- Ports 8888, 9000 and 9443 free, and at least 10 GB of free disk

## What this connector runs, sends and fetches

- **Runs** the MCP server with `npx -y @xns-cloud/relayer-mcp@0.14.3`, which downloads that
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
  to claim your Relayer, `releases.xns.tech` to download the compose bundle and images, and
  Docker Hub for the `prom/node-exporter` image. Reading or changing your Relayer's settings goes
  to the Relayer itself.
- **Sends your sign-in token to your Relayer.** `get_host_tags`, `configure_vpd`,
  `describe_settings`, `update_settings`, `restart_service`, `manage_backups` and
  `setup_cli_credentials` send it to the Relayer address set in the server,
  `http://localhost:8888` by default; the caller cannot change the host (`setup_cli_credentials`
  lets you pick only the port). `verify_storage` sends the server's sign-in only to that same
  address; a token you pass to it yourself goes to the Relayer address you pass, which must be
  `localhost`, loopback, a private (RFC 1918) address or `*.local`. `verify_storage` and
  `setup_cli_credentials` refuse a redirect the Relayer returns; the other tools follow one. Two
  inputs take any address, and neither gets the token: the host of the health check and the S3
  endpoint of the storage test. A custom compose file URL for install is taken only from https
  on `releases.xns.tech`, a `file://` path to a `.yml` or `.yaml` file, or a loopback,
  private-network or `.local` host.
- **Writes** `~/.xns/credentials` only when `setup_cli_credentials` runs. It uses the server's
  own sign-in (you never pass it a token), creates an S3 key pair named `xns-cli` on your
  Relayer that can read, write and delete in every bucket, and adds the keys to the file as one
  profile. A profile that holds a secret key is never
  replaced: the new keys go in `default` only when it is absent or holds no secret key, and
  otherwise in a new profile (`xns-cli`, then `xns-cli-2`). A file that is not an XNS credentials
  file is left as it is. The `xns-storage` skills offer it as an optional step once the claim is
  complete.
- **Does not** collect telemetry, analytics or crash reports. The default compose download asks
  for `docker-compose.yml?src=mcp`: `src=mcp` is a fixed source tag, the same for every user
  and carrying no identifier, used only to count downloads by how they were made. The `.env`
  download and a compose file URL you pass carry no tag. Sign-in tokens stay in memory
  and are discarded when the server exits. Your stored objects never pass through the connector.

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
