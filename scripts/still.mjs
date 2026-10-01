// node scripts/still.mjs prompts/mara-base.json out/mara/base.png [--ref=out/mara/base.png]
// ~$0.15/image. Run ONE, review, then continue. With --ref it edits from the approved base (keeps her face consistent).
import fs from 'node:fs';
import { run, download, dataUri } from './fal.mjs';
const [spec, out, ...rest] = process.argv.slice(2);
const ref = rest.find((a) => a.startsWith('--ref='))?.slice(6);
const prompt = JSON.stringify(JSON.parse(fs.readFileSync(spec, 'utf8')));
const res = ref
  ? await run('fal-ai/nano-banana-pro/edit', { prompt, image_urls: [dataUri(ref)], aspect_ratio: '9:16', num_images: 1 })
  : await run('fal-ai/nano-banana-pro', { prompt, aspect_ratio: '9:16', num_images: 1 });
await download(res.images[0].url, out);
