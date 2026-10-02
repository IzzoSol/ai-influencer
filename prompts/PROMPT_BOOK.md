# PROMPT BOOK (source of truth for QUILL + TURTLE)
Scope: original fictional adults, flirty/playful/swimwear/costume, NON-explicit. Explicit prompts are intentionally not stored here.
Format of every entry: what it is -> prompt -> status (untested | works | weak) -> notes. Update status from `scores/` + eyeballed QA.

## 1. Still template (phone realism, not cinema) — status: WORKS (nano-banana-pro, 6/6 faces distinct)
`Photorealistic phone photo. {CHARACTER LOCK}, wearing {ACCESSORY}. {OUTFIT}. {SHOT}. Room: {ROOM ANCHORS}. vertical 9:16 phone selfie, arm's length, slightly below eye level, slight wide-angle edges, natural HDR, both hands visible, slight off-center framing, no portrait blur. visible pores, slight facial asymmetry, peach fuzz, no beauty filter, correct hands, no text, no watermark. Avoid: extra fingers, plastic skin, face morph, cartoon, 3D render, warped mirror, text, logo.`
Notes: JSON-style prompts also work but plain sentences were enough. Lock = face/hair/age/accessory only; never lighting color.

## 2. Video prompt skeleton (motion only) — status: TESTING (kling v2.5 turbo i2v)
`Use the uploaded reference as the exact character; keep face, freckles, hair, and proportions identical. {0-1s hook move already in motion}; {1-3s main move}; {3-4s turn/flip}; {4-5s look at camera}. Handheld phone footage, slight shake, natural window light, stable face. Forbidden: no face change, no hairstyle change, no outfit swap, no age shift.`
Rules: one main action; name 2-4 moves in order; state tempo (slow/medium/sharp) + framing (full body / waist-up); environment & outfit live in the still; motion-control endpoints take env/outfit/mood only, the reference video supplies the dance.

## 3. Character locks — status: WORKS
- frk: dense natural freckles across nose and cheeks, full lips, sharp winged liner, long voluminous Brazilian curly hair dark brown w/ caramel highlights, curvy athletic build, gold hoops
- bcb: warm medium-brown skin, tight defined 3C/4A curls past shoulders, high cheekbones, glossy nude lip, hourglass figure, thin gold chains
- ghost: light freckles, green-hazel eyes, loose Brazilian curls with baby hairs, soft glam, playful smirk
- (yuna, sasha, mara: see characters/cast.json)

## 4. Non-explicit dance/flirt bodies (from owner list 11-20, SFW) — status: untested
K-pop idol routine (side steps, arm hits, point, wink, freeze) · viral social dance in hoodie · hip-hop groove w/ shoulder pops + freeze · soft contemporary flirty dance in park · cute idol bouncy dance · street-festival spins (handheld tracking) · studio contemporary phrase · stage K-pop choreography · relaxed bedroom social dance · gritty-studio K-pop/rock lean-to-camera. Full text of each lives in bodies/dance_phrases.json (expanding).

## 5. Costume (Halloween) outfits, suggestive-light — status: untested
devil bodysuit+horns, ghost sheet dress, vampire corset+cape, bunny ears+corset, witch hat dress, skeleton bodysuit, pumpkin-orange mini dress, cat ears, mummy wrap, black-widow bodysuit, fairy wings, pirate corset, ghost bride, scarecrow. Pair each with ONE body and the same face. Costume enters at second 0-1.

## 6. Hooks — see hooks/library.json (10 types) + 12 non-seasonal lines
problem-agitation, contrarian, comparison, mistake, specific outcome, identity, confession, demo, POV, social proof, list, pattern-interrupt. Visual interrupt <0.5s, on-screen text states the loop, promise by s3, pay by s6-10.

## 7. LoRA captions — see lora/PLAN.md, lora/shots.txt
Token first, caption only what varies, never caption freckles/curls/eyes.

## 8. Failure log (add as we learn)
- Local zoompan loops: 5s clip ~1 min render at 2x upscale; fine for fallback, not a substitute for real motion.
- Reference videos of real people: not used (consent/provenance). Motion refs must be ours.

## 9. LOOP RULE (supersedes crossfade) — status: WORKS
Crossfade loops (loopify.mjs) ghost the subject = visible "fade glitch". DO NOT USE for posting.
Use `node scripts/video.mjs still.png "<prompt ending 'returning exactly to the opening pose'>" out.mp4 --loop` (same still as first+last frame via tail_image_url). Verified on ghost_fb spin: 5.08s, last frame == first frame, no blend. loopfind.mjs (best-matching frame cut) = fallback only; gave 2s loops with visible jump.
Known drift: mid-clip hair can shift slightly during turns; QA the whole take.
