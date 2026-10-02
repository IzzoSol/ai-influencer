// Glitch-free loop: find the two most similar frames (>= minSec apart) and hard-cut there. No crossfade, no ghosting.
// node scripts/loopfind.mjs in.mp4 out.mp4 [minSec=2.0]
import { spawnSync, execFileSync } from 'node:child_process';
const [inp, out, minSec = '2.0'] = process.argv.slice(2);
const W = 36, H = 64;
const fps = (() => { const [a, b] = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v', '-show_entries', 'stream=r_frame_rate', '-of', 'csv=p=0', inp]).toString().trim().split('/'); return +a / (+b || 1); })();
const r = spawnSync('ffmpeg', ['-v', 'error', '-threads', '1', '-i', inp, '-vf', `scale=${W}:${H},format=gray`, '-f', 'rawvideo', '-'], { maxBuffer: 1 << 28 });
const buf = r.stdout, fs_ = W * H, n = Math.floor(buf.length / fs_);
const minGap = Math.round(+minSec * fps);
let best = { i: 0, j: n - 1, e: Infinity };
for (let i = 0; i < n - minGap; i++) for (let j = i + minGap; j < n; j++) {
  let e = 0; for (let k = 0; k < fs_; k += 2) { const d = buf[i * fs_ + k] - buf[j * fs_ + k]; e += d * d; if (e > best.e) break; }
  if (e < best.e) best = { i, j, e };
}
const len = best.j - best.i;
console.log(`frames=${n} fps=${fps} loop ${best.i}->${best.j} (${(len / fps).toFixed(2)}s) mse=${(best.e / (fs_ / 2)).toFixed(1)}`);
execFileSync('ffmpeg', ['-y', '-v', 'error', '-threads', '2', '-i', inp, '-vf', `trim=start_frame=${best.i}:end_frame=${best.j},setpts=PTS-STARTPTS,format=yuv420p`, '-an', '-crf', '17', out]);
console.log('wrote', out);
