# HYDRA Frontend Bridge v2.9

Ta iteracja dodaje warstwę integracji React Native ↔ HYDRA Bridge API.

## Dodane moduły

- `src/types/hydraProtocol.ts`
- `src/services/hydraBridgeClient.ts`
- `src/hooks/useHydraBridge.ts`
- `src/hooks/useHydraEventStream.ts`
- `src/services/hydraProtocolMapper.ts`
- `src/constants/hydraBridge.ts`

## Kontrakt

Frontend nie importuje adapterów backendowych.

Dozwolone:
- `GET /health`
- `GET /status`
- `GET /devices`
- `POST /devices/<deviceId>/command`
- `GET /scenes`
- `POST /scenes/<sceneId>`
- `GET /events/history`
- `GET /events/stream`

## Przykład użycia

```ts
const hydra = useHydraBridge({ baseUrl: "http://192.168.1.20:8765", autoRefreshMs: 5000 });

await hydra.sendCommand("lotus_ble_main", "setColor", {
  color: "#ff0000",
  brightness: 100,
});

await hydra.runScene("red_alert");
```

## Granica z Twoją warstwą UX

Ten moduł nie robi:
- animacji,
- głosu,
- audio queue,
- theme engine,
- design system.

On tylko dostarcza czyste dane, komendy i eventy do Twojego Protocol Engine.
