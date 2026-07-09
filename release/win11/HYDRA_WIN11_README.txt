HYDRA WIN11 X64 RELEASE

1. Run:
   run_hydra_bridge_release.bat

2. Open pairing window:
   http://localhost:8765/pairing/open

3. Pair Android APK:
   - open HYDRA Android HUD
   - enter PC URL: http://<PC-IP>:8765
   - enter pairing code

4. Voice scaffold:
   http://localhost:8765/voice/status

5. UDP fast path:
   http://localhost:8765/udp/sent

Recommended Windows Firewall:
- allow private network access for hydra_bridge.exe
- port 8765 TCP
- discovery UDP port 9876
