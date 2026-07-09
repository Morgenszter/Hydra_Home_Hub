# HYDRA bridge PyInstaller spec scaffold
block_cipher = None

a = Analysis(
    ['-m', 'uvicorn', 'backend.api.asgi_v51:app', '--host', '0.0.0.0', '--port', '8765'],
    pathex=[],
    binaries=[],
    datas=[('config', 'config'), ('models', 'models')],
    hiddenimports=['backend.api.asgi_v51'],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    cipher=block_cipher,
)
pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)
exe = EXE(pyz, a.scripts, [], exclude_binaries=True, name='hydra_bridge', console=True)
coll = COLLECT(exe, a.binaries, a.zipfiles, a.datas, strip=False, upx=True, name='hydra_bridge')
