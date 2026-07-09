from __future__ import annotations

import json
import pathlib
from dataclasses import dataclass, asdict


@dataclass
class HydraVoiceModelConfigV84:
    sample_rate: int = 16000
    wake_threshold: float = 0.55
    command_window_seconds: float = 4.0
    vosk_model_path: str = "models/vosk-pl"
    openwakeword_model_path: str = "models/openwakeword/omegon.onnx"
    enable_microphone_runtime: bool = False

    @classmethod
    def load(cls, path: str | pathlib.Path = "config/voice.v84.json") -> "HydraVoiceModelConfigV84":
        config_path = pathlib.Path(path)
        if not config_path.exists():
            return cls()
        data = json.loads(config_path.read_text(encoding="utf-8"))
        return cls(
            sample_rate=int(data.get("sampleRate", data.get("sample_rate", 16000))),
            wake_threshold=float(data.get("wakeThreshold", data.get("wake_threshold", 0.55))),
            command_window_seconds=float(data.get("commandWindowSeconds", data.get("command_window_seconds", 4.0))),
            vosk_model_path=str(data.get("voskModelPath", data.get("vosk_model_path", "models/vosk-pl"))),
            openwakeword_model_path=str(data.get("openWakeWordModelPath", data.get("openwakeword_model_path", "models/openwakeword/omegon.onnx"))),
            enable_microphone_runtime=bool(data.get("enableMicrophoneRuntime", data.get("enable_microphone_runtime", False))),
        )

    def diagnostics(self) -> dict:
        vosk = pathlib.Path(self.vosk_model_path)
        wake = pathlib.Path(self.openwakeword_model_path)
        data = asdict(self)
        data.update({
            "voskModelExists": vosk.exists(),
            "openWakeWordModelExists": wake.exists(),
        })
        return data
