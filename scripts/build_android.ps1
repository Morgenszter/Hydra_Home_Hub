$ErrorActionPreference = "Stop"
Write-Host "HYDRA Android P18 npm override fixed helper" -ForegroundColor Cyan
Write-Host "1. Clean + install + doctor + typecheck"
Write-Host "2. Expo start"
Write-Host "3. EAS preview APK"
Write-Host "4. EAS production AAB"
$choice = Read-Host "Choose option"
if ($choice -eq "1") {
  .\scripts\install_android_deps_p18.ps1
} elseif ($choice -eq "2") {
  .\scripts\start_android_p18.ps1
} elseif ($choice -eq "3") {
  npx eas build -p android --profile preview
} elseif ($choice -eq "4") {
  npx eas build -p android --profile production
} else {
  Write-Host "Unknown option" -ForegroundColor Red
  exit 1
}
