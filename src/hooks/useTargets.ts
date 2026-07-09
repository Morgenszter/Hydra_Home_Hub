import { useState } from "react";


export default function useTargets(){


    const [targets,setTargets] =
        useState<any[]>([]);



    function addTarget(target:any){


        setTargets(
            old=>[
                ...old,
                target
            ]
        );


    }



    function removeTarget(id:string){


        setTargets(
            old=>
            old.filter(
                x=>x.id!==id
            )
        );


    }



    function clear(){


        setTargets([]);


    }



    return {

        targets,
        addTarget,
        removeTarget,
        clear

    };


}