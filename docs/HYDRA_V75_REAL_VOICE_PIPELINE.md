# HYDRA v7.5 — Real Voice Pipeline

## Dodane
- `voice_intent_parser_v75.py`
- `real_voice_pipeline_v75.py`
- `/voice-pipeline/start`
- `/voice-pipeline/stop`
- `/voice-pipeline/status`
- `/voice-pipeline/transcript`

## Flow
1. `OMEGON` otwiera wake window.
2. Następny transcript w oknie 5 sekund jest parsowany.
3. Intent może iść do command routera.
4. Eventy trafiają do pipeline history.

## Intencje lokalne
- czerwony alert
- panic stop
- generator
- światła / LED
- grzejnik / temperatura
