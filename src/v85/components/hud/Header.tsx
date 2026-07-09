import React from "react";

import {
    View,
    Text,
    StyleSheet
} from "react-native";

import colors from "../../config/colors";


export default function Header(){

return (

<View style={styles.container}>

<Text style={styles.title}>
HYDRA INTELLIGENCE
</Text>

<Text style={styles.subtitle}>
TACTICAL CONTROL SYSTEM v2.0
</Text>

</View>

);

}



const styles =
StyleSheet.create({

container:{

padding:15,

borderBottomWidth:1,

borderColor:
colors.border

},


title:{

color:
colors.primary,

fontSize:22,

fontWeight:"900",

letterSpacing:3

},


subtitle:{

color:
colors.textDim,

fontSize:12,

marginTop:5

}


});