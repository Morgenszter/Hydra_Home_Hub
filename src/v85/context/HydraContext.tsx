import React, {
  createContext,
  useContext,
  ReactNode
} from "react";

import useLogger from "../hooks/useLogger";
import useBLE from "../hooks/useBLE";
import useBridge from "../hooks/useBridge";
import useThermal from "../hooks/useThermal";
import useTargets from "../hooks/useTargets";


interface HydraContextType {

  logger:any;

  ble:any;

  bridge:any;

  thermal:any;

  targets:any;

}



const HydraContext =
  createContext<HydraContextType | null>(null);



interface Props {

  children: ReactNode;

}



export function HydraProvider({
  children
}:Props){


  const logger =
    useLogger();


  const ble =
    useBLE();


  const bridge =
    useBridge();


  const thermal =
    useThermal();


  const targets =
    useTargets();



  return (

    <HydraContext.Provider

      value={{

        logger,

        ble,

        bridge,

        thermal,

        targets

      }}

    >

      {children}

    </HydraContext.Provider>

  );

}



export function useHydra(){

  const context =
    useContext(
      HydraContext
    );


  if(!context){

    throw new Error(
      "useHydra must be used inside HydraProvider"
    );

  }


  return context;

}



export default HydraContext;