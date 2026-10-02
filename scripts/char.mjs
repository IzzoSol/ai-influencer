// node scripts/char.mjs <id> [outfit] [shot]   -> out/faces/<id>.png  (~$0.15, base look for a character)
import fs from 'node:fs';
import { run, download } from './fal.mjs';
const [id, outfit = 'plain gray t-shirt', shot = 'front-facing chest-up, neutral relaxed expression'] = process.argv.slice(2);
const cast = JSON.parse(fs.readFileSync('characters/cast.json', 'utf8')).cast[id];
const S = JSON.parse(fs.readFileSync('settings.json', 'utf8'));
const prompt = `Photorealistic phone photo. ${cast.lock}, wearing ${cast.accessory}. ${outfit}. ${shot}. Room: ${S.rooms.bedroom_v1}. ${S.camera}. ${S.realism.join(', ')}. Avoid: ${S.negative.join(', ')}.`;
const res = await run('fal-ai/nano-banana-pro', { prompt, aspect_ratio: '9:16', num_images: 1 });
await download(res.images[0].url, `out/faces/${id}${process.argv[5] ? '_' + process.argv[5] : ''}.png`);
