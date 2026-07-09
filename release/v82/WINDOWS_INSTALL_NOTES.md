# HYDRA v8.2 Windows Install Notes

## Dev run

```powershell
python -m pip install -r backend/requirements_v50.txt
python -m uvicorn backend.api.asgi_v51:app --host 0.0.0.0 --port 8765
```

## Operator shell

```powershell
python desktop/operator_shell/hydra_operator_shell.py status
python desktop/operator_shell/hydra_operator_shell.py pairing
```

## Release target

Final production packaging should produce:
- HYDRA Bridge executable
- operator shell/tray frontend
- `.hydra` data directory
- logs/config/models folders
