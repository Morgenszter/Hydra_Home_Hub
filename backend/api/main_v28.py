from __future__ import annotations

import asyncio
import json
from flask import Flask, Response, jsonify, request

from backend.bootstrap_v28 import create_hydra_system

system = create_hydra_system(simulation=True)
event_bus = system["event_bus"]
command_tracker = system["command_tracker"]
device_manager = system["device_manager"]
scene_manager = system["scene_manager"]

app = Flask(__name__)

@app.get("/health")
def health():
    return jsonify({"ok": True, "system": "HYDRA Bridge", "version": "2.8", "mode": "local"})

@app.get("/status")
def status():
    return jsonify({"ok": True, "devices": device_manager.list_devices(), "events": event_bus.recent(20)})

@app.get("/devices")
def devices():
    return jsonify(device_manager.list_devices())

@app.post("/devices/<device_id>/command")
def device_command(device_id: str):
    body = request.get_json(force=True, silent=True) or {}
    result = asyncio.run(device_manager.execute(device_id, body.get("command", ""), body.get("params", {})))
    return jsonify(result)

@app.get("/commands")
def commands():
    return jsonify(command_tracker.all())

@app.get("/commands/<command_id>")
def command(command_id: str):
    record = command_tracker.get(command_id)
    if not record:
        return jsonify({"ok": False, "error": "COMMAND_NOT_FOUND"}), 404
    return jsonify(record.to_dict())

@app.get("/scenes")
def scenes():
    return jsonify(scene_manager.list_scenes())

@app.post("/scenes/<scene_id>")
def scene(scene_id: str):
    result = asyncio.run(scene_manager.execute_scene(scene_id))
    return jsonify(result)

@app.get("/events/history")
def event_history():
    return jsonify(event_bus.recent(int(request.args.get("limit", 100))))

@app.get("/events/stream")
def event_stream():
    def generate():
        last_index = 0
        while True:
            events = event_bus.history[last_index:]
            last_index += len(events)
            for event in events:
                yield f"data: {json.dumps(event.to_dict(), ensure_ascii=False)}\n\n"
    return Response(generate(), mimetype="text/event-stream")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8765, debug=False)
