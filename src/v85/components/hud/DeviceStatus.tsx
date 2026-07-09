import React from "react";

import {
Text,
View,
StyleSheet
} from "react-native";

import LED from "../common/LED";

import colors from "../../config/colors";


interface Props{

online:boolean;

}



export default function DeviceStatus(
{
online
}:Props
){

return (

<View style={styles.row}>


<LED active={online}/>


<Text style={styles.text}>

DEVICE LINK:
{online ? " ONLINE":" OFFLINE"}

</Text>


</View>

);

}



const styles =
StyleSheet.create({

row:{

flexDirection:"row",

alignItems:"center"

},


text:{

color:
colors.text

}


});