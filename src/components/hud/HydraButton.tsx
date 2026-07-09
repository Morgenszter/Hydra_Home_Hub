import React from "react";

import Button from "../common/Button";


interface Props{

label:string;

action:()=>void;

}



export default function HydraButton(
{
label,
action
}:Props
){

return (

<Button

title={label}

onPress={action}

/>

);

}