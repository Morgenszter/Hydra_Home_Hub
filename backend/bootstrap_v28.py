from backend.config.scenes import SCENES
from backend.core.command_tracker import CommandTracker
from backend.core.device_contracts import DeviceCapabilities, HydraDevice
from backend.core.device_manager_v28 import DeviceManagerV28
from backend.core.event_protocol import EventBus, HydraEvent
from backend.core.scene_manager_v28 import SceneManagerV28
from backend.integrations.simulated_adapters import SimulatedAdapter

def create_hydra_system(simulation: bool = True):
    event_bus = EventBus()
    command_tracker = CommandTracker()
    device_manager = DeviceManagerV28(event_bus, command_tracker)

    lotus = HydraDevice(
        id="lotus_ble_main",
        name="Lotus Lantern BLE",
        kind="light",
        protocol="ble",
        room="sector_alpha",
        capabilities=DeviceCapabilities(power=True, brightness=True, color=True),
    )
    tapo = HydraDevice(
        id="tapo_l630_main",
        name="Tapo L630",
        kind="light",
        protocol="wifi",
        room="sector_alpha",
        capabilities=DeviceCapabilities(power=True, brightness=True, color=True),
    )
    heater = HydraDevice(
        id="heater_wifi_main",
        name="Grzejnik Wi-Fi",
        kind="heater",
        protocol="wifi",
        room="sector_alpha",
        capabilities=DeviceCapabilities(power=True, temperature=True, modes=["eco", "comfort", "standby", "boost", "manual"]),
    )

    device_manager.register_device(lotus, SimulatedAdapter(lotus.id, {"color": "#00ffaa"}))
    device_manager.register_device(tapo, SimulatedAdapter(tapo.id, {"color": "#ffffff"}))
    device_manager.register_device(heater, SimulatedAdapter(heater.id, {"mode": "standby", "targetTemperature": 21.0}))

    scene_manager = SceneManagerV28(device_manager, event_bus, command_tracker, SCENES)

    event_bus.emit(HydraEvent(
        type="SYSTEM_READY",
        source="bridge",
        message="HYDRA Bridge v2.8 gotowy. Wszystkie moduły w trybie lokalnym.",
        payload={"simulation": simulation},
    ))

    return {
        "event_bus": event_bus,
        "command_tracker": command_tracker,
        "device_manager": device_manager,
        "scene_manager": scene_manager,
    }
