from __future__ import annotations
import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
loading = (ROOT / "src/screens/LoadingScreen.tsx").read_text(encoding="utf-8")
loader = (ROOT / "src/components/HydraAnimatedLoader.tsx").read_text(encoding="utf-8")
bootstrap = (ROOT / "src/app/HydraAndroidBootstrap.tsx").read_text(encoding="utf-8")

ok = (
    "export function LoadingScreen" in loading
    and "export default LoadingScreen" in loading
    and "export function HydraAnimatedLoader" in loader
    and "export default HydraAnimatedLoader" in loader
    and 'import LoadingScreen from "../screens/LoadingScreen";' in bootstrap
)

print({"ok": ok})
raise SystemExit(0 if ok else 1)
