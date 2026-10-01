# AI Influencer (private)
Fictional, original influencers -> stills -> short vertical videos -> post-process -> disclosed posts / UGC ads.
Flow: `still.mjs` (base look) -> approve -> `still.mjs --ref=` (variations) -> `video.mjs` (motion) -> `postprocess.mjs`.
Rules: original characters only, no real people's likeness, adults only, non-explicit, always AI-labeled.
Key: put it in `fal.key` (gitignored). Every paid step is run one at a time.
