# HYDRA v6.3 — E2E Lab

## Dodane
- `backend/tests/hydra_e2e_lab_v63.py`

## Testuje
- voice wake scaffold
- command router
- fake device manager
- fake scene manager
- UDP transport decision
- event broadcast

## Uruchomienie

```bash
python backend/tests/hydra_e2e_lab_v63.py
```

Oczekiwane:
- `ok: true`
- completed device route
- completed scene route
- udp route deferred
