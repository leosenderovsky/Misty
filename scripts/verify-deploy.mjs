import { execFileSync } from 'node:child_process';

const siteArgument = process.argv[2];
if (!siteArgument) {
  console.error('Uso: npm run verify:deploy -- https://<sitio>.netlify.app');
  process.exit(1);
}

let siteUrl;
try {
  siteUrl = new URL(siteArgument);
  if (siteUrl.protocol !== 'https:' && siteUrl.protocol !== 'http:') {
    throw new Error('La URL debe usar HTTP o HTTPS.');
  }
} catch (error) {
  console.error(`URL del sitio inválida: ${error.message}`);
  process.exit(1);
}

function getMainCommit() {
  const output = execFileSync('git', ['ls-remote', 'origin', 'refs/heads/main'], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
  const commit = output.split(/\s+/)[0];
  if (!/^[a-f0-9]{40}$/i.test(commit || '')) {
    throw new Error('No se pudo obtener refs/heads/main de origin.');
  }
  return commit;
}

async function getJson(url) {
  const response = await fetch(url);
  if (response.status !== 200) {
    throw new Error(`GET ${url} respondió ${response.status}.`);
  }
  return response.json();
}

async function checkAsset(url) {
  const response = await fetch(url);
  return response.status === 200 ? '200 OK' : `FALLO (${response.status})`;
}

function readAttribute(html, regex, name) {
  const match = html.match(regex);
  if (!match?.[1]) throw new Error(`No se encontró ${name} en index.html.`);
  return match[1];
}

let failed = false;
const rows = [];

try {
  const [info, mainCommit, indexResponse] = await Promise.all([
    getJson(new URL('/build-info.json', siteUrl)),
    Promise.resolve().then(getMainCommit),
    fetch(siteUrl),
  ]);

  if (indexResponse.status !== 200) {
    throw new Error(`GET ${siteUrl} respondió ${indexResponse.status}.`);
  }
  const html = await indexResponse.text();
  const publishedCommit = typeof info.commit === 'string' ? info.commit : 'unknown';
  const commitsMatch = publishedCommit !== 'unknown'
    && mainCommit.toLowerCase().startsWith(publishedCommit.toLowerCase());

  rows.push({
    Verificación: 'Commit publicado vs main',
    Estado: commitsMatch ? 'OK' : 'DESACTUALIZADO',
    Detalle: `${publishedCommit} vs ${mainCommit}`,
  });
  if (!commitsMatch) failed = true;

  rows.push({ Verificación: 'Contexto', Estado: 'OK', Detalle: info.context ?? 'unknown' });
  const source = info.siteUrlSource ?? 'none';
  const sourceNeedsAttention = info.context === 'production' && source === 'DEPLOY_PRIME_URL';
  rows.push({
    Verificación: 'URL y fuente',
    Estado: sourceNeedsAttention ? 'ATENCIÓN' : 'OK',
    Detalle: `${info.siteUrl || '(vacía)'} (${source})`,
  });

  for (const variable of ['VITE_SITE_URL', 'VITE_DEMO_BRAND_NAME', 'VITE_DEMO_BRAND_URL']) {
    const configured = info.env?.[variable] === true;
    rows.push({
      Verificación: variable,
      Estado: configured ? 'CARGADA' : 'NO CARGADA',
      Detalle: configured ? 'sí' : 'no',
    });
  }

  const ogImage = readAttribute(
    html,
    /<meta\b(?=[^>]*\bproperty=["']og:image["'])(?=[^>]*\bcontent=["']([^"']+)["'])[^>]*>/i,
    'og:image',
  );
  const canonical = readAttribute(
    html,
    /<link\b(?=[^>]*\brel=["']canonical["'])(?=[^>]*\bhref=["']([^"']+)["'])[^>]*>/i,
    'canonical',
  );
  const assetResults = await Promise.all([
    checkAsset(new URL(ogImage, siteUrl)),
    checkAsset(new URL(canonical, siteUrl)),
  ]);
  for (const [name, result] of [['og:image', assetResults[0]], ['canonical', assetResults[1]]]) {
    rows.push({ Verificación: `GET ${name}`, Estado: result, Detalle: '' });
    if (result !== '200 OK') failed = true;
  }

  console.table(rows);
  if (failed) process.exitCode = 1;
} catch (error) {
  rows.push({ Verificación: 'Verificación', Estado: 'FALLO', Detalle: error.message });
  console.table(rows);
  console.error(error.message);
  process.exitCode = 1;
}
