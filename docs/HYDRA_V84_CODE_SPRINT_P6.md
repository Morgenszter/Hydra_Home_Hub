# HYDRA v8.4 — Code Sprint P6

## Implemented
- `voice_model_config_v84.py`
- `microphone_runtime_v84.py`
- `config/voice.v84.example.json`
- native voice mic endpoints:
  - `POST /native-voice/mic/start`
  - `POST /native-voice/mic/stop`
  - `GET /native-voice/mic/status`
- Windows packaging specs/scripts
- Android release checklist/build script
- P6 smoke test and QA doc

## Status
This is dependency-safe real runtime boundary. If `sounddevice`, `vosk`, `openwakeword` and models are present, the runtime has the correct integration points. Without them, fallback diagnostics are explicit and non-crashing.
