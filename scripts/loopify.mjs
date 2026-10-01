// Make any clip loop seamlessly: crossfade its tail into its head. node scripts/loopify.mjs in.mp4 out.mp4 [fade=0.6]
import { execFileSync, execSync } from 'node:child_process';
const [inp, out, fade = '0.6'] = process.argv.slice(2);
const f = +fade, D = +execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 "${inp}"`).toString().trim();
const fc = `[0:v]trim=${f}:${D},setpts=PTS-STARTPTS[a];[0:v]trim=0:${f},setpts=PTS-STARTPTS[b];[a][b]xfade=transition=fade:duration=${f}:offset=${(D - 2 * f).toFixed(3)},format=yuv420p[v]`;
execFileSync('ffmpeg', ['-y', '-i', inp, '-filter_complex', fc, '-map', '[v]', '-an', out], { stdio: 'inherit' });
console.log('wrote', out);
