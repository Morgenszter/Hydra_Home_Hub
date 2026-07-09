import React from "react";

import {
Text
} from "react-native";


interface Props{

temperature:number;

}



export default function ThermalGauge(
{
temperature
}:Props
){

return (

<Text>

THERMAL:
{temperature}°C

</Text>

);

}