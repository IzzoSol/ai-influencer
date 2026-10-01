// NO-FAL path: seamless handheld-phone loop from a still, free. Periodic motion => last frame == first frame.
// node scripts/localloop.mjs in.png out.mp4 [seconds=5] [caption]
import { execFileSync } from 'node:child_process';
const [inp, out, secs = '5', caption = ''] = process.argv.slice(2);
const N = Math.round(+secs * 30), W = 1080, H = 1920;
const P = `2*PI*on/${N}`;
const zp = `zoompan=z='1.07+0.035*sin(${P})':x='iw/2-(iw/zoom/2)+iw*0.012*sin(${P}+0.6)':y='ih/2-(ih/zoom/2)+ih*0.010*cos(${P})':d=${N}:s=${W}x${H}:fps=30`;
const FONT = 'C\\:/Windows/Fonts/arial.ttf';
const esc = (t) => t.replace(/([:'\\])/g, '\\$1');
const cap = caption ? `,drawtext=fontfile='${FONT}':text='${esc(caption)}':fontcolor=white:fontsize=58:box=1:boxcolor=black@0.45:boxborderw=16:x=(w-text_w)/2:y=h*0.12` : '';
const vf = `scale=${W * 2}:-1:flags=lanczos,${zp},eq=saturation=1.05:contrast=1.03,noise=alls=7:allf=t,unsharp=3:3:0.35,format=yuv420p${cap}`;
execFileSync('ffmpeg', ['-y', '-i', inp, '-vf', vf, '-frames:v', String(N), '-an', '-metadata', 'comment=AI-generated synthetic influencer content', out], { stdio: 'inherit' });
console.log('wrote', out);
