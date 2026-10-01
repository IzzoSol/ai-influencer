# Character LoRA plan (own approved stills only)
- Trigger tokens: frk -> `frkcurl`, bcb -> `bcbcurl`, ghost -> `ghstcurl`, yuna -> `yunabob`, sasha -> `sshblnd`, mara -> `marared` (rare, never reused).
- Dataset: ~20 stills per character generated FROM the approved hero (`--ref`), 1024x1024, adults only, mix of angles/lights/expressions/plain clothes (list in `shots.txt`). Reject anything that drifted. Never train on scraped or other people's images.
- Captions: token first, describe only what varies (angle, expression, clothes, light, room). Do NOT caption freckles/curls/eye color.
- Train (fal flux-lora-fast-training or ai-toolkit): rank 16, 1024, ~1000-2000 steps, lr 1e-4 (5e-5 if faces melt), save every 2 epochs; pick middle checkpoint; inference weight 0.8.
- Test (same seed): portrait -> 3/4 -> full body -> new outfit -> new room. Pass only if outfit actually changes and freckles/curls match.
- Do NOT train on video frames. Retrain only on an intentional identity change.
