import * as Speech from "expo-speech";


export default function useSpeech(){



    function speak(text:string){


        Speech.speak(
            text,
            {

                language:"pl-PL",

                pitch:1,

                rate:0.9

            }
        );


    }



    function stop(){


        Speech.stop();


    }



    return {

        speak,
        stop

    };


}