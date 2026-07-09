export const EVENTS = {

    SYSTEM_READY:"system.ready",
    SYSTEM_BOOT:"system.boot",
    SYSTEM_SHUTDOWN:"system.shutdown",
    SYSTEM_ERROR:"system.error",

    AUDIO_PLAY:"audio.play",
    AUDIO_STOP:"audio.stop",
    AUDIO_PAUSE:"audio.pause",

    VOICE_COMMAND:"voice.command",
    VOICE_RESPONSE:"voice.response",

    DEVICE_CONNECTED:"device.connected",
    DEVICE_UPDATED:"device.updated",
    DEVICE_DISCONNECTED:"device.disconnected",

    HUD_REFRESH:"hud.refresh",

    PROTOCOL_EXECUTE:"protocol.execute"

} as const;

export type EventName = typeof EVENTS[keyof typeof EVENTS];