# HYDRA Intelligence — wersja skompilowana z Bridge v2.8

Ta paczka zachowuje istniejący projekt i dokłada backendową warstwę HYDRA Bridge v2.8.

Dodane/uzupełnione:
- Event Protocol
- Command Tracker
- Device Contract
- DeviceManagerV28
- SceneManagerV28
- symulowane adaptery dla Lotus BLE, Tapo L630 i grzejnika Wi-Fi
- Flask API pod lokalny bridge
- sceny: Czerwony Alert, Night Ops, Rozgrzewanie Sektora

Uruchomienie backendu:

```bash
cd backend
python -m pip install -r requirements.txt
python -m backend.api.main_v28
```

Endpointy:
- GET `/health`
- GET `/status`
- GET `/devices`
- POST `/devices/<deviceId>/command`
- GET `/commands`
- GET `/scenes`
- POST `/scenes/<sceneId>`
- GET `/events/history`
- GET `/events/stream`

Frontend/HUD nie powinien znać adapterów bezpośrednio. Komunikuje się tylko przez API i Event Protocol.
