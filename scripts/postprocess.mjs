// node scripts/postprocess.mjs in.(png|mp4) out.(png|mp4)
// Authentic-phone look (grain, soft grade) + AI disclosure metadata. Disclosure is always applied.
import { execFileSync } from 'node:child_process';
const [inp, out] = process.argv.slice(2);
const vf = 'eq=saturation=1.05:contrast=1.03,noise=alls=6:allf=t,unsharp=3:3:0.4';
execFileSync('ffmpeg', ['-y', '-i', inp, '-vf', vf, '-metadata', 'comment=AI-generated content (synthetic influencer)', '-metadata', 'description=AI-generated', out], { stdio: 'inherit' });
console.log('Reminder: also tick the platform "AI-generated" label when posting (IG/TikTok) and say #ad where paid.');
