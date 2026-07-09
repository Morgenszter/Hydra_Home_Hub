# HYDRA v8.4 Android E2E Checklist P12

## Boot
- [ ] splash/icon visible
- [ ] loader screen appears
- [ ] bootstrap enters selected mode

## Modes
- [ ] cockpit renders
- [ ] operator renders
- [ ] alpha renders

## Bridge
- [ ] API host defaults to `:8765`
- [ ] WS defaults to `/ws/runtime`
- [ ] persisted settings survive restart
- [ ] reconnect works after backend restart

## Actions
- [ ] operator action executes
- [ ] live event reaches backend
- [ ] voice status visible in UI

## Packaging
- [ ] preview APK produced
- [ ] production AAB/APK produced
