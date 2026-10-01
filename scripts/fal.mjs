// Minimal fal client. Key from FAL_KEY or ./fal.key (gitignored). Never pass the key on the CLI.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const KEY = process.env.FAL_KEY?.trim() || (fs.existsSync(path.join(root, 'fal.key')) ? fs.readFileSync(path.join(root, 'fal.key'), 'utf8').trim() : null);
if (!KEY) { console.error('No fal key: put it in ./fal.key or set FAL_KEY'); process.exit(1); }
const H = { Authorization: `Key ${KEY}`, 'Content-Type': 'application/json' };

export const dataUri = (file) => `data:image/${path.extname(file).slice(1).replace('jpg', 'jpeg')};base64,${fs.readFileSync(file).toString('base64')}`;

export async function run(model, input) { // queue API: works for slow video models too
  const sub = await fetch(`https://queue.fal.run/${model}`, { method: 'POST', headers: H, body: JSON.stringify(input) });
  if (!sub.ok) throw new Error(`submit ${sub.status}: ${(await sub.text()).slice(0, 300)}`);
  const { status_url, response_url } = await sub.json();
  for (;;) {
    await new Promise((r) => setTimeout(r, 4000));
    const s = await (await fetch(status_url, { headers: H })).json();
    if (s.status === 'COMPLETED') break;
    if (s.status === 'FAILED' || s.error) throw new Error(`job failed: ${JSON.stringify(s).slice(0, 300)}`);
  }
  return (await fetch(response_url, { headers: H })).json();
}

export async function download(url, out) {
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, Buffer.from(await (await fetch(url)).arrayBuffer()));
  console.log('wrote', out);
}
