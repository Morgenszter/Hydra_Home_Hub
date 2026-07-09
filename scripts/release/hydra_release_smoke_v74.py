from __future__ import annotations
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]

checks = {
    "backend": (ROOT / "backend").exists(),
    "src": (ROOT / "src").exists(),
    "release_manifest": (ROOT / "scripts/release/hydra_release_manifest_v74.json").exists(),
    "release_checklist": (ROOT / "docs/HYDRA_V74_RELEASE_CHECKLIST.md").exists(),
    "test_matrix": (ROOT / "docs/HYDRA_V74_TEST_MATRIX.md").exists(),
}
print(json.dumps({"ok": all(checks.values()), "checks": checks}, ensure_ascii=False, indent=2))
