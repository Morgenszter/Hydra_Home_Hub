import React from "react";

import {
View,
Text,
StyleSheet
} from "react-native";

import colors from "../../config/colors";


export default function Footer(){

return (

<View style={styles.footer}>

<Text style={styles.text}>
HYDRA CORE // ONLINE
</Text>

</View>

);

}



const styles =
StyleSheet.create({

footer:{

padding:10,

borderTopWidth:1,

borderColor:
colors.border

},

text:{

color:
colors.primary,

fontSize:11,

textAlign:"center",

letterSpacing:2

}

});