import React from "react";

import {
    View,
    StyleSheet
} from "react-native";


import colors from "../../config/colors";


interface Props {

children:
React.ReactNode;

}



export default function Panel(
{
children
}:Props
){

return (

<View style={styles.panel}>

{children}

</View>

);


}



const styles =
StyleSheet.create({

panel:{

backgroundColor:
colors.background,

borderWidth:1,

borderColor:
colors.border,

padding:10,

margin:5,

flex:1

}


});