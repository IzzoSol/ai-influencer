# Teaching QUILL + TURTLE
QUILL (prompt writing/improvement): given a body + character + hook type, return 5 hook variants + the video prompt using the skeleton in PROMPT_BOOK §2; rewrite weak prompts to name moves/tempo/framing; keep outfit/room out of motion prompts; enforce the forbidden line; never output explicit content; always keep the AI-disclosure step.
TURTLE (generation): picks the pipeline per clip — still (nano-banana-pro) -> i2v (kling) or local loop (no fal) -> loopify -> disclose. Applies QA gate (eye spacing, freckle map, curl silhouette, accessory, hands).
Loop: after each batch, update PROMPT_BOOK statuses (works/weak) from scores/scores.csv, then re-feed this file to QUILL.
