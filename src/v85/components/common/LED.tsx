import React from "react";

import {
    View,
    StyleSheet
} from "react-native";


import colors from "../../config/colors";


interface Props {

active:boolean;

}



export default function LED(
{
active
}:Props
){

return (

<View

style={[
styles.led,
active
?
styles.active
:
styles.off
]}

/>

);


}



const styles =
StyleSheet.create({

led:{

width:14,

height:14,

borderRadius:7,

margin:5

},


active:{

backgroundColor:
colors.primary,

},


off:{

backgroundColor:
"#333"

}


});