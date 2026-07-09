from __future__ import annotations

import pathlib
import webbrowser

from desktop.operator_shell.hydra_operator_shell import HydraOperatorShell


class HydraOperatorPanel:
    def __init__(self, shell: HydraOperatorShell | None = None):
        self.shell = shell or HydraOperatorShell()

    def start(self):
        html_path = pathlib.Path(__file__).parent / "panel_assets" / "index.html"
        try:
            import webview  # type: ignore
            webview.create_window("HYDRA Operator", url=str(html_path), width=980, height=720)
            webview.start()
            return {"ok": True, "mode": "pywebview"}
        except Exception as exc:
            webbrowser.open(str(html_path))
            return {"ok": True, "mode": "browser_fallback", "path": str(html_path), "error": str(exc)}

    def refresh_status(self):
        return self.shell.run("status")

    def invoke_action(self, action: str):
        return self.shell.run(action)

    def render_html(self):
        return (pathlib.Path(__file__).parent / "panel_assets" / "index.html").read_text(encoding="utf-8")
