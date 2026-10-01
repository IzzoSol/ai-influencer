# AI Influencer Engine

**Rules (non-negotiable):** original fictional adults only · no real person's likeness or scraped footage · flirty/playful/swimwear/costume, non-explicit · every export carries AI disclosure (`scripts/disclose.mjs`) and `#ad` where paid.

## Pipeline
1. **Lock the character** (`characters/cast.json`): face, hair, freckles, one signature accessory. Face is locked once approved; version the pack (`frk_v1`). Swapping the hero still = swapping the actor.
2. **Hero still** (`scripts/char.mjs`): phone-realism, not cinema. Approve the first frame; reject any face drift.
3. **Reference pack** per character: neutral front, 3/4, side, full body, expression sheet, accessory close-up, room board (3 anchor objects, 2 light states), product sheet (held by nobody), one "ordinary phone" style still.
4. **Still != motion.** Video prompt is timed action only (`bodies/dance_phrases.json`); outfit and room live in the still. Image-to-video from the locked still (`scripts/video.mjs`). One main action per clip, 5-8s. Test cheap model for outfit, ship with the model that holds hair.
5. **Slots, not one-offs:** Character x Hook x Body x Payoff x Outfit x Setting. A batch = ONE body x 4-6 hooks x ONE outfit. Never change face, room and hook in the same test.
6. **Edit:** cut dead first half-second, burn captions AFTER render, loop last frame to first on <15s, export 9:16 (`scripts/disclose.mjs`).
7. **Score** every export in `scores/scores.csv` (2-3s hook, hold, completion, saves/shares/profile taps). Kill under own baseline after ~2k impressions; confirm a winner twice before varying; only then spend on ads.

## Retention targets
Hook (2s TikTok / 3s Meta): 30-40% good. Completion: <15s 60-70%, 15-30s 50-60%, 30-60s 40-50%. Visual interrupt before 0.5s; promise by s3, pay off by s6-10; no walk-ins, no logo-first.

## Consistency tiers
face shape/eyes > hair silhouette+part > body proportions > accessory > outfit. Repair stills (inpaint) then re-render; never face-restore after motion. QA whole take: eye spacing, freckle map, curl silhouette, accessory, hands, no age jump.

## Character LoRA (optional, after hero approved) — see `lora/`
