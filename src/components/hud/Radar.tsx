import React from "react";

import {
View,
StyleSheet
} from "react-native";

import colors from "../../config/colors";


export default function Radar(){

return (

<View style={styles.radar}/>

);

}



const styles =
StyleSheet.create({

radar:{

width:160,

height:160,

borderRadius:80,

borderWidth:2,

borderColor:
colors.primary,

alignSelf:"center",

margin:20

}

});