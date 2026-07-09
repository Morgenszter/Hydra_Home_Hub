[Setup]
AppName=HYDRA Intelligence System
AppVersion=8.4.0.1
DefaultDirName={pf}\HYDRA
DefaultGroupName=HYDRA
DisableProgramGroupPage=yes
OutputDir=output
OutputBaseFilename=HYDRA_Setup_8.4.0.1
Compression=lzma
SolidCompression=yes
ArchitecturesAllowed=x64
ArchitecturesInstallIn64BitMode=x64
WizardStyle=modern
SetupIconFile=assets\hydra.ico
UninstallDisplayIcon={app}\assets\hydra.ico

[Files]
Source:"dist\HYDRA_Win11_Mainline\*"; DestDir:"{app}"; Flags: recursesubdirs createallsubdirs
Source:"assets\hydra.ico"; DestDir:"{app}\assets"; Flags: ignoreversion

[Icons]
Name:"{group}\Start HYDRA Backend";  Filename:"{app}\scripts\win11_start_backend_p19.ps1";  WorkingDir:"{app}"
Name:"{group}\Start Operator Panel"; Filename:"{app}\scripts\win11_start_operator_p19.ps1"; WorkingDir:"{app}"
Name:"{group}\Readme";               Filename:"{app}\README_WIN11_MAINLINE_P19.md"
Name:"{commondesktop}\HYDRA";        Filename:"{app}\scripts\win11_start_operator_p19.ps1"; WorkingDir:"{app}";       IconFilename:"{app}\assets\hydra.ico"

[Run]
Filename:"{app}\scripts\win11_start_backend_p19.ps1"; Description:"Uruchom backend po instalacji"; Flags: postinstall shellexec
