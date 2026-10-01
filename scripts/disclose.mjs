// Final export step. Burns captions AFTER render, adds AI-disclosure metadata + a per-export manifest.
// node scripts/disclose.mjs in.mp4 out.mp4 "caption text" [--ad]
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
const [inp, out, caption = '', flag] = process.argv.slice(2);
const esc = (t) => t.replace(/([:'\\])/g, '\\$1');
const vf = caption ? `drawtext=fontfile='C\\:/Windows/Fonts/arial.ttf':text='${esc(caption)}':fontcolor=white:fontsize=h/22:box=1:boxcolor=black@0.45:boxborderw=14:x=(w-text_w)/2:y=h*0.12` : 'null';
execFileSync('ffmpeg', ['-y', '-i', inp, '-vf', vf, '-metadata', 'comment=AI-generated synthetic influencer content', out], { stdio: 'inherit' });
fs.writeFileSync(out + '.json', JSON.stringify({ ai_generated: true, ad: flag === '--ad', made: new Date().toISOString(), checklist: ['Tick the platform AI-generated label', flag === '--ad' ? 'Add #ad / paid-partnership label' : 'n/a'] }, null, 2));
console.log('Post with the AI label ticked.' + (flag === '--ad' ? ' Mark as #ad.' : ''));
