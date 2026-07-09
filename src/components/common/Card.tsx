import React from "react";

import {
    View,
    Text,
    StyleSheet
} from "react-native";

import colors from "../../config/colors";


interface Props {

title?:string;

children:
React.ReactNode;

}



export default function Card(
{
title,
children
}:Props
){

return (

<View style={styles.card}>


{
title &&
<Text style={styles.title}>
{title}
</Text>
}


{children}


</View>

);


}



const styles =
StyleSheet.create({

card:{

backgroundColor:
colors.panel,

borderWidth:1,

borderColor:
colors.border,

padding:15,

margin:8,

borderRadius:6

},


title:{

color:
colors.primary,

fontSize:14,

fontWeight:"bold",

marginBottom:10

}


});