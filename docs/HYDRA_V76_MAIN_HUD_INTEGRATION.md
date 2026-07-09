# HYDRA v7.6 — Main HUD Integration Pass

## Dodane
- `HydraMainCockpitScreen`
- `hydraCockpitRoutes`

## Cel
Podpiąć recovery/offline bridge flow pod główny cockpit, a nie trzymać go jako osobny ekran testowy.

## Flow
- main cockpit ładuje cache
- pokazuje recovery banner
- łączy się z bridge WebSocket
- obsługuje reconnect
- wysyła testowy PING
- pokazuje podstawowy runtime snapshot
