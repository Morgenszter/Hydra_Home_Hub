import React from "react";

import {
View,
Text,
ScrollView,
StyleSheet
} from "react-native";

import colors from "../../config/colors";


interface Props{

logs:any[];

}



export default function ConsoleLog(
{
logs
}:Props
){

return (

<ScrollView style={styles.box}>


{
logs.map(
(log)=>(

<View key={log.id}>

<Text style={styles.line}>

[{log.timestamp}]
 {log.message}

</Text>

</View>

)

)

}


</ScrollView>

);

}



const styles =
StyleSheet.create({

box:{

backgroundColor:"#020303",

padding:10,

height:150

},


line:{

color:
colors.primary,

fontSize:12

}


});