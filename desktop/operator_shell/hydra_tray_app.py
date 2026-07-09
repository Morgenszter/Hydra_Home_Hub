from __future__ import annotations

from desktop.operator_shell.hydra_operator_shell import HydraOperatorShell


class HydraTrayApp:
    def __init__(self, shell: HydraOperatorShell | None = None):
        self.shell = shell or HydraOperatorShell()
        self.running = False

    def build_menu(self):
        try:
            import pystray  # type: ignore
            from PIL import Image  # type: ignore
            return pystray, Image
        except Exception as exc:
            return {"fallback": True, "error": str(exc)}

    def notify(self, title: str, message: str) -> None:
        print(f"[HYDRA TRAY] {title}: {message}")

    def on_open_panel(self):
        from desktop.operator_shell.hydra_operator_panel import HydraOperatorPanel
        panel = HydraOperatorPanel(self.shell)
        return panel.start()

    def on_pairing(self):
        result = self.shell.run("pairing")
        self.notify("Pairing", str(result))
        return result

    def on_restart_bridge(self):
        result = self.shell.run("restart_bridge")
        self.notify("Restart Bridge", str(result))
        return result

    def on_restart_discovery(self):
        result = self.shell.run("restart_discovery")
        self.notify("Restart Discovery", str(result))
        return result

    def on_logs(self):
        result = self.shell.run("logs")
        self.notify("Logs", str(result))
        return result

    def on_red_alert(self):
        result = self.shell.run("emergency_red_alert")
        self.notify("Emergency Red Alert", str(result))
        return result

    def on_export_diagnostics(self):
        result = self.shell.run("export_diagnostics")
        self.notify("Diagnostics", str(result))
        return result

    def on_exit(self):
        self.running = False
        self.notify("Exit", "HYDRA tray stopped")

    def run(self):
        menu = self.build_menu()
        if isinstance(menu, dict) and menu.get("fallback"):
            self.running = True
            self.notify("Fallback", "pystray unavailable; CLI tray fallback active.")
            return {"ok": True, "fallback": True, "error": menu.get("error")}
        self.running = True
        self.notify("Started", "pystray available; native tray lifecycle should be attached in packaged build.")
        return {"ok": True, "fallback": False}


if __name__ == "__main__":
    print(HydraTrayApp().run())
