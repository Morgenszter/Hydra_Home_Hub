# HYDRA v8.4 P16 — Final Stabilization Pack

Naprawia realne błędy z logów Win11:
- mieszany Android stack Expo/RN,
- błędny `HydraAppRoot.tsx`,
- operator panel odpalany jako plik zamiast modułu,
- brak deps dla FastAPI TestClient.

## Uruchom
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\scripts\install_backend_test_deps_p16.ps1
.\scripts\run_p13_smoke.ps1
.\scripts\start_backend_p13.ps1
```

Android:
```powershell
.\scripts\install_android_deps_p16.ps1
.\scripts\start_android_p16.ps1
```
