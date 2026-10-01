// node scripts/video.mjs out/mara/base.png "playful hair flip, handheld phone dance" out/mara/clip1.mp4
// Image-to-video via Kling. Roughly $0.5-1.5/clip: confirm before looping.
import { run, download, dataUri } from './fal.mjs';
const [img, motion, out] = process.argv.slice(2);
const res = await run('fal-ai/kling-video/v2.5-turbo/pro/image-to-video', {
  prompt: `${motion}. Vertical phone footage, handheld, natural light, subtle camera shake.`,
  image_url: dataUri(img), duration: '5', aspect_ratio: '9:16',
});
await download(res.video.url, out);
