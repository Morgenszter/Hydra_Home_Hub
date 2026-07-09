# HYDRA_HOME V86 — Android / Expo konfiguracja

## Co jest skonfigurowane

- `app.json` pod Android APK/AAB
- `eas.json` z profilami `development`, `preview`, `production`
- ikona aplikacji `assets/android/icon.png`
- adaptive icon `assets/android/adaptive-icon.png`
- splash screen `assets/android/splash.png`
- runtime config `src/config/hydraAndroidConfig.ts`
- pakiet `com.alphariusomegon.hydrahome`
- tryb dark UI
- uprawnienia pod LAN/WiFi/BLE/UDP discovery

## Build lokalny / EAS

### Instalacja zależności

```bash
npm install
```

### Test Expo

```bash
npx expo start
```

### APK preview

```bash
npx eas build -p android --profile preview
```

### AAB production

```bash
npx eas build -p android --profile production
```

## Ważne

Domyślny bridge ustawiony w `app.json` i `src/config/hydraAndroidConfig.ts`:

```txt
http://192.168.1.100:5000
```

Zmień IP na adres komputera / serwera Hydra Bridge w LAN.

## Pliki dodane / zmienione

```txt
app.json
eas.json
assets/android/icon.png
assets/android/adaptive-icon.png
assets/android/splash.png
src/config/hydraAndroidConfig.ts
```

## Uprawnienia Android

```txt
INTERNET
ACCESS_NETWORK_STATE
ACCESS_WIFI_STATE
CHANGE_WIFI_MULTICAST_STATE
BLUETOOTH
BLUETOOTH_ADMIN
BLUETOOTH_SCAN
BLUETOOTH_CONNECT
ACCESS_FINE_LOCATION
VIBRATE
```

## Profile build

```txt
development -> APK debug / development client
preview     -> APK do ręcznych testów
production  -> AAB pod sklep / release
```
