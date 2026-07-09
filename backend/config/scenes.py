SCENES = {
    "red_alert": {
        "id": "red_alert",
        "name": "Czerwony Alert",
        "mode": "sequential",
        "steps": [
            {"deviceId": "lotus_ble_main", "command": "setColor", "params": {"color": "#ff0000", "brightness": 100}},
            {"deviceId": "tapo_l630_main", "command": "setColor", "params": {"color": "#ff0000", "brightness": 100}},
            {"deviceId": "heater_wifi_main", "command": "setMode", "params": {"mode": "standby"}},
        ],
    },
    "night_ops": {
        "id": "night_ops",
        "name": "Night Ops",
        "mode": "parallel",
        "steps": [
            {"deviceId": "lotus_ble_main", "command": "setColor", "params": {"color": "#00aaff", "brightness": 20}},
            {"deviceId": "tapo_l630_main", "command": "setBrightness", "params": {"brightness": 15}},
            {"deviceId": "heater_wifi_main", "command": "setTemperature", "params": {"temperature": 20}},
        ],
    },
    "sector_heat": {
        "id": "sector_heat",
        "name": "Rozgrzewanie Sektora",
        "mode": "sequential",
        "steps": [
            {"deviceId": "heater_wifi_main", "command": "setPower", "params": {"on": True}},
            {"deviceId": "heater_wifi_main", "command": "setMode", "params": {"mode": "comfort"}},
            {"deviceId": "heater_wifi_main", "command": "setTemperature", "params": {"temperature": 22}},
            {"deviceId": "lotus_ble_main", "command": "setColor", "params": {"color": "#ffaa00", "brightness": 45}},
        ],
    },
}
