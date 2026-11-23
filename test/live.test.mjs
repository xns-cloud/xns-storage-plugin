// Network checks. Run: node --test test/live.test.mjs
import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(path.join(ROOT, p), 'utf8');
const json = (p) => JSON.parse(read(p));
const flat = (s) => s.replace(/\s+/g, ' ');

const PLUGIN_JSON = 'plugin/.claude-plugin/plugin.json';
const README = 'plugin/README.md';
const PRICE = '$6.00 per TB per month. $0 egress, uncapped. 30-day minimum retention, no early-delete fee.';
const CONNECTOR_README = 'connector/README.md';
const PIN = /@(\d+\.\d+\.\d+)$/.exec(json('connector/.mcp.json').mcpServers['xns-relayer'].args[1])[1];
const COMPOSE = 'https://releases.xns.tech/relayer/release/docker-compose.yml';

const getJson = async (url) => {
  const res = await fetch(url);
  assert.equal(res.status, 200, url);
  return res.json();
};
const registryEntry = async () => {
  const body = await getJson('https://registry.modelcontextprotocol.io/v0/servers?search=tech.xns/relayer');
  return body.servers.map((s) => s.server).find((s) => s.name === 'tech.xns/relayer' && s.version === PIN);
};
const firstParagraph = (readme) => {
  const lines = readme.split('\n').slice(1);
  while (lines.length && lines[0].trim() === '') lines.shift();
  const out = [];
  for (const l of lines) {
    if (l.trim() === '') break;
    out.push(l);
  }
  return out.join('\n');
};

describe('live', () => {
  test('the pinned version is on npm and in the MCP registry', async () => {
    const npm = execFileSync('npm', ['view', `@xns-cloud/relayer-mcp@${PIN}`, 'version'], { encoding: 'utf8' }).trim();
    assert.equal(npm, PIN);
    const entry = await registryEntry();
    assert.ok(entry, `registry has no tech.xns/relayer ${PIN}`);
    assert.equal(entry.version, PIN);
  });

  test('README opening and manifest description hold the registry sentence and the price line', async () => {
    const entry = await registryEntry();
    assert.ok(entry);
    const sentence = entry.description;
    assert.ok(sentence && sentence.length >= 20, `registry description too short: ${sentence}`);
    for (const [name, text] of [
      ['README', firstParagraph(read(README))],
      ['manifest', json(PLUGIN_JSON).description],
    ]) {
      const t = flat(text);
      assert.ok(t.includes(sentence), `${name}: registry sentence missing`);
      assert.ok(t.includes(PRICE), `${name}: price line missing`);
      assert.ok(t.includes('S3-compatible cloud object storage'), name);
      for (const w of ['cloud storage', 'object storage', 's3', 'backup', 'egress']) {
        assert.ok(t.toLowerCase().includes(w), `${name}: missing "${w}"`);
      }
    }
  });

  test('listing and README links answer 200 with no redirect', async () => {
    const urls = new Set();
    for (const pj of [json(PLUGIN_JSON), json('connector/.claude-plugin/plugin.json')]) {
      for (const u of [pj.documentationUrl, pj.supportUrl, pj.privacyPolicyUrl, pj.termsOfServiceUrl]) urls.add(u);
    }
    for (const f of [README, CONNECTOR_README]) {
      for (const m of read(f).matchAll(/https:\/\/xns\.tech\/[^\s)>`]*/g)) urls.add(m[0].replace(/[.,;]+$/, ''));
    }
    urls.add('https://github.com/xns-cloud/relayer-mcp#troubleshooting');
    urls.add('https://github.com/xns-cloud/relayer-mcp/blob/main/PRIVACY.md');
    for (const url of urls) {
      // Space out requests to xns.tech.
      if (new URL(url).hostname === 'xns.tech') await new Promise((r) => setTimeout(r, 3000));
      const res = await fetch(url, { redirect: 'manual' });
      assert.equal(res.status, 200, `${url} answered ${res.status}`);
      const anchor = new URL(url).hash.slice(1);
      if (anchor) {
        const page = await res.text();
        assert.ok(page.includes(`id="user-content-${anchor}"`) || page.includes(`id="${anchor}"`), `${url}: no #${anchor} on the page`);
      }
    }
  });

  test('connector README names every image of the release compose and the Docker Hub source', async () => {
    const res = await fetch(COMPOSE);
    assert.equal(res.status, 200);
    const compose = await res.text();
    const repos = [...compose.matchAll(/^\s*image:\s*(\S+)/gm)].map((m) => m[1].replace(/:[^:/]+$/, ''));
    assert.ok(repos.length >= 8, `found ${repos.length} images`);
    const readme = read(CONNECTOR_README);
    const at = readme.indexOf('## What this connector runs, sends and fetches');
    assert.ok(at >= 0, 'connector README section missing');
    const sec = readme.slice(at);
    const body = sec.slice(0, sec.indexOf('\n## ', 5) < 0 ? undefined : sec.indexOf('\n## ', 5));
    for (const r of repos) assert.ok(body.includes(r), `README section lacks ${r}`);
    const node = body.split('\n').find((l) => l.includes('prom/node-exporter'));
    assert.ok(node && node.includes('Docker Hub'), 'node-exporter bullet must say Docker Hub');
  });
});
