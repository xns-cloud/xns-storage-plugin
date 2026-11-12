# XNS Storage plugin for Claude

Set up and run [XNS](https://xns.tech) object storage from a conversation with Claude. XNS is
S3-compatible storage at $6.00 per TB per month with $0 egress. You run a small gateway, the
Relayer, in Docker on your own machine; it speaks S3 locally and spreads your data across a
network of independent storage hosts.

With this plugin, Claude can check your machine, help you create an XNS account, install the
Relayer, link it to your account, let you choose where your data is stored, and confirm that
storage works. Your part is three browser steps: sign up, click one email link and confirm
one claim. Claude never sees your password.

## What's inside

- **The XNS Relayer MCP server**
  ([`@xns-cloud/relayer-mcp`](https://www.npmjs.com/package/@xns-cloud/relayer-mcp), open
  source, [source code](https://github.com/xns-cloud/relayer-mcp)): 15 tools for install,
  sign-in, health checks, settings, restarts and configuration backups.
- **Skill `set-up-xns-storage`**: the onboarding sequence from sign-up to a verified bucket.
- **Skill `use-xns-storage`**: pointing S3 tools at the Relayer and day-to-day changes.

## Requirements

- Docker Engine with the compose plugin, on the machine where Claude runs the tools
- Node.js 20 or newer
- Ports 8888, 9000 and 9443 free, and at least 10 GB of free disk

On Ubuntu 24.04 or Debian 12, `curl -fsSL https://releases.xns.tech/relayer/install.sh | sh`
installs the prerequisites.

## What this plugin runs, sends and fetches

- **Runs** the MCP server with `npx -y @xns-cloud/relayer-mcp@0.12.3`, which downloads that
  exact version from the npm registry.
- **Starts Docker containers** on your machine when you ask Claude to install the Relayer:
  the Relayer and its Prometheus and Grafana monitoring, pulled from `releases.xns.tech`.
  It writes `docker-compose.yml` and `.env` to the install directory.
- **Contacts** `auth.xns.tech` for sign-in (in your browser, with PKCE), and the XNS account
  and Relayer services to register, verify email and claim your Relayer.
- **Talks only to Relayers on your private network.** Tools that take a host accept only
  `localhost`, loopback, private (RFC 1918) addresses and `*.local`.
- **Writes** `~/.xns/credentials` only when you ask Claude to set up command line credentials.
- **Does not** collect telemetry, analytics or crash reports. Sign-in tokens stay in memory
  and are discarded when the server exits. Your stored objects never pass through the plugin.

## Privacy policy

XNS privacy policy: <https://xns.tech/privacy-policy/>. Details for the MCP server:
[PRIVACY.md](https://github.com/xns-cloud/relayer-mcp/blob/main/PRIVACY.md).

## Support

Open an issue at <https://github.com/xns-cloud/xns-storage-plugin/issues>, or see
<https://xns.tech>.

## License

Apache-2.0 © SCP Corp. See [LICENSE](./LICENSE).
