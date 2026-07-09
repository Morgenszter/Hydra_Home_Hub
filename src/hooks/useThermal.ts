import { useState } from "react";


export default function useThermal(){


    const [temperature,setTemperature]
    =
    useState<number>(0);



    const [status,setStatus]
    =
    useState<string>(
        "NORMAL"
    );



    function update(value:number){


        setTemperature(value);



        if(value > 80){

            setStatus("CRITICAL");

        }
        else if(value > 50){

            setStatus("WARNING");

        }
        else {

            setStatus("NORMAL");

        }


    }



    return {

        temperature,
        status,
        update

    };


}