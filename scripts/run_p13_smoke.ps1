$ErrorActionPreference = "Stop"
python -m compileall backend
python -m compileall desktop
python backend\tests\hydra_v84_p5_backend_smoke.py
python backend\tests\hydra_v84_p6_smoke.py
python backend\tests\hydra_v84_p10_release_smoke.py
python backend\tests\hydra_v84_p12_android_release_smoke.py
python backend\tests\hydra_v84_p13_consolidation_smoke.py
