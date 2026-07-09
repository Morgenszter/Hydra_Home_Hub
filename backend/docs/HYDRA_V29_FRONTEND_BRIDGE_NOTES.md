# HYDRA v2.9 — Frontend Bridge Wiring

Ta paczka łączy istniejący projekt z backendiem Bridge v2.8 oraz dodaje po stronie React Native klienta API.

Backend:
- działa lokalnie przez `python -m backend.api.main_v28`
- wystawia event protocol i komendy urządzeń

Frontend:
- używa `HydraBridgeClient`
- hook `useHydraBridge`
- opcjonalny `useHydraEventStream`
- mapper eventów pod przyszły Protocol Engine

Następny krok:
- wpiąć `useHydraBridge()` w istniejący `HydraContext` albo ekran `Settings`,
- zapisać `baseUrl` przez AsyncStorage,
- podpiąć eventy do Twojego Audio Queue / HUD Animation Engine.
