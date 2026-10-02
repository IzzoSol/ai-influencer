set -e
cd /c/Users/Brittany/ai-influencer
FB="full body standing, facing camera, whole body visible head to feet, relaxed confident posture, arms slightly away from body"
node scripts/char.mjs frk "cropped white tee, high-waist blue jeans, white sneakers" "$FB" fb
node scripts/char.mjs ghost "oversized gray hoodie, black biker shorts, sneakers" "$FB" fb
node scripts/char.mjs sasha "black sports bra top, high-waist gray leggings, sneakers" "$FB" fb
M1="Use the uploaded reference as the exact character; keep face, freckles, hair, and proportions identical. 0-1s sharp point to camera already in motion; 1-3s side steps with confident arm hits to a medium beat; 3-4s head turn and smirk; 4-5s freeze in pose, matching the opening frame. Handheld phone footage, slight shake, natural window light, full body in frame, stable face. Forbidden: no face change, no hairstyle change, no outfit swap, no age shift."
M2="Use the uploaded reference as the exact character; keep face, hair, and proportions identical. 0-1s mid-spin already moving; 1-3s spin into a pose with hands on hips; 3-4s playful hip sway; 4-5s smile and wink, returning to the opening pose. Handheld phone footage, slight shake, natural light, full body in frame, stable face. Forbidden: no face change, no hairstyle change, no outfit swap, no age shift."
M3="Use the uploaded reference as the exact character; keep face, hair, and proportions identical. 0-1s hair flip already in motion; 1-3s gentle hip sway with shoulder shimmy; 3-4s laugh toward camera; 4-5s settle back to the opening pose. Handheld phone footage, slight shake, natural light, full body in frame, stable face. Forbidden: no face change, no hairstyle change, no outfit swap, no age shift."
node scripts/video.mjs out/faces/frk_fb.png "$M1" out/video/frk_kpop_raw.mp4 && node scripts/loopify.mjs out/video/frk_kpop_raw.mp4 out/video/frk_kpop_loop.mp4
node scripts/video.mjs out/faces/ghost_fb.png "$M2" out/video/ghost_reveal_raw.mp4 && node scripts/loopify.mjs out/video/ghost_reveal_raw.mp4 out/video/ghost_reveal_loop.mp4
node scripts/video.mjs out/faces/sasha_fb.png "$M3" out/video/sasha_flip_raw.mp4 && node scripts/loopify.mjs out/video/sasha_flip_raw.mp4 out/video/sasha_flip_loop.mp4
echo BATCH_DONE
