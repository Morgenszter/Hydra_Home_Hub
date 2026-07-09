# HYDRA v8.2 Android Install Notes

## Entry candidate
Use:

```tsx
import { HydraAndroidBootstrap } from "./src/app";
```

## Required runtime wiring
- bridge host discovery / manual host input
- persisted bridge host
- websocket reconnect lifecycle
- Android permissions/network security for local LAN bridge

## Production target
- APK or AAB
- local LAN access
- secure storage for pairing/recovery state
