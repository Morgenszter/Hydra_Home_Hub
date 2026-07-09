# HYDRA v8.4 P13 — Final Risk Register

## Critical risks

### R1 Real voice quality
The voice architecture is wired, but production quality depends on:
- Vosk PL model
- OpenWakeWord OMEGON model
- microphone hardware
- threshold tuning
- sample rate compatibility

### R2 Android real build
Expo/EAS build must be run in the target environment. Smoke tests confirm config, not store-ready signing.

### R3 Win11 binary packaging
PyInstaller/Nuitka must be tested on Windows with real optional dependencies.

### R4 LAN IP onboarding
Default host is developer-oriented. Real deployment should use pairing, discovery, or QR host config.

### R5 IoT execution
Router contracts exist, but real devices/adapters require physical validation.

## Recommended release status
CONDITIONAL PASS until:
- Android APK/AAB is built and installed on a real phone.
- Win11 dist starts outside repo.
- Voice mic/model test passes.
- 30–60 minute soak test passes.
