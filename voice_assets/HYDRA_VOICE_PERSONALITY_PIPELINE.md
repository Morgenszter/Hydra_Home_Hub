# HYDRA Voice Personality Pipeline v7.1

## Cel
AI Voice Generator służy do produkcji wysokiej jakości MP3, ale nie zastępuje lokalnego OMEGON runtime.

## Struktura assetów

```txt
voice_assets/
  pl/
    ready/
    acknowledged/
    warning/
    completed/
    failed/
  en/
    ready/
    acknowledged/
    warning/
    completed/
    failed/
```

## Naming

```txt
<locale>_<category>_<variant>_<mood>.mp3
pl_acknowledged_01_calm.mp3
pl_warning_03_red_alert.mp3
```

## Runtime rules
- AudioQueue nie odpala dwóch MP3 naraz.
- Voice Personality Engine wybiera wariant.
- OMEGON runtime tylko wykrywa i rozpoznaje.
- MP3 pack odpowiada za jakość charakteru HYDRY.
