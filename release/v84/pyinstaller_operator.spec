# HYDRA operator PyInstaller spec scaffold
block_cipher = None

a = Analysis(
    ['desktop/operator_shell/hydra_tray_app.py'],
    pathex=[],
    binaries=[],
    datas=[('desktop/operator_shell/panel_assets', 'desktop/operator_shell/panel_assets'), ('config', 'config')],
    hiddenimports=['desktop.operator_shell.hydra_operator_shell', 'desktop.operator_shell.hydra_operator_panel'],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=[],
    cipher=block_cipher,
)
pyz = PYZ(a.pure, a.zipped_data, cipher=block_cipher)
exe = EXE(pyz, a.scripts, [], exclude_binaries=True, name='hydra_operator', console=True)
coll = COLLECT(exe, a.binaries, a.zipfiles, a.datas, strip=False, upx=True, name='hydra_operator')
