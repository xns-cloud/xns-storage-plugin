---
name: use-xns-storage
description: Use when the user already has an XNS Relayer running and wants to point tools at it (AWS CLI, rclone, restic, boto3, backup software), change its settings, restart it, or back up and restore its configuration.
---

# Use XNS storage

A running Relayer serves S3 at `http://<host>:9000` (HTTPS on port 9443 when the owner has
set up a certificate) and its dashboard at `http://<host>:8888`. Any tool that speaks S3
works with it once it has the endpoint and a key pair.

## If the XNS tools are not loaded

If the XNS tools are not available in this conversation, call no tool and skip every step that
names a tool (credentials, settings, restarts and backups). Still give the endpoint settings for
S3 tools from the lines below. Name the cause when you know it:

- In Claude Code with this plugin installed, the MCP server failed to start: run `/mcp` to see
  why, and check that `node --version` prints 24 or newer. Do not repeat the install steps.
- If Node.js is missing, install Node.js 24 first, then restart Claude Code.
- In claude.ai chat, the tools run only on a computer, so they cannot load here.

If the plugin is not installed yet and the person has no Relayer, say what XNS is and give the steps for a computer with Docker
and Node.js 24: in Claude Code or Cowork on that computer, run
`/plugin marketplace add xns-cloud/xns-storage-plugin`, then
`/plugin install xns-storage@xns-cloud`, and say "set up XNS storage".

## Credentials

- The user creates S3 keys in the dashboard, including a **Backup** key type made for immutable
  backups. Use that key pair in other S3 tools.
- Do not call `setup_cli_credentials`: it needs the user's sign-in token, which no tool hands
  back. Never ask the user to paste a sign-in token.
- Never print a secret key back into the conversation unless the user asks for it.

## Pointing common tools at it

Set the endpoint to the Relayer's S3 address and use the key pair:

- **AWS CLI**: add `--endpoint-url http://<host>:9000` to `aws s3` commands.
- **boto3**: `boto3.client("s3", endpoint_url="http://<host>:9000", ...)`.
- **rclone**: an `s3` remote with provider `Other` and `endpoint = http://<host>:9000`.
- **restic**: repository `s3:http://<host>:9000/<bucket>`.

Guides for backup and developer tools (Veeam, Proxmox Backup Server, Velero, pgBackRest,
restic, Terraform and more): https://xns.tech

## Day-to-day changes

- Settings: `describe_settings` lists what can be changed, with current values and guidance.
  Apply changes with `update_settings`. If the result says `require_restart`, run
  `restart_service`, then `check_relayer_health`.
- Restarts interrupt traffic. Tell the user before running `restart_service`.
- Configuration backups: `manage_backups` lists, starts, restores and deletes them. A restore
  overwrites the current configuration, so confirm with the user first and say which parts
  (`db`, `conf`, `hostio`, `samba`) will be restored.
