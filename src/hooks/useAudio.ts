import { useState } from "react";
import AudioEngine from "../services/AudioEngine";


export default function useAudio() {

    const [playing, setPlaying] = useState(false);
    const [volume, setVolumeState] = useState(1);


    async function play(source: any) {

        await AudioEngine.play(source);

        setPlaying(true);

    }


    async function stop() {

        await AudioEngine.stop();

        setPlaying(false);

    }


    async function setVolume(value:number) {

        setVolumeState(value);

        await AudioEngine.setVolume(value);

    }


    return {

        play,
        stop,
        setVolume,
        volume,
        playing

    };

}