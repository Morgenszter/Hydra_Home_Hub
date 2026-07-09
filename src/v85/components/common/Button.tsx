import React from "react";
import {
    TouchableOpacity,
    Text,
    StyleSheet
} from "react-native";

import colors from "../../config/colors";


interface Props {

    title:string;

    onPress:()=>void;

    danger?:boolean;

}


export default function Button(
{
    title,
    onPress,
    danger=false
}:Props
){


return (

<TouchableOpacity

style={[
styles.button,
danger && styles.danger
]}

onPress={onPress}

>


<Text style={styles.text}>

{title}

</Text>


</TouchableOpacity>

);


}



const styles = StyleSheet.create({

button:{

backgroundColor:
colors.panelLight,

borderWidth:1,

borderColor:
colors.primary,

paddingVertical:12,

paddingHorizontal:20,

borderRadius:4,

alignItems:"center"

},


danger:{

borderColor:
colors.danger,

backgroundColor:
"#241010"

},


text:{

color:
colors.text,

fontSize:14,

fontWeight:"700",

letterSpacing:1

}


});