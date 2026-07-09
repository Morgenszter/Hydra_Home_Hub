import React from "react";
import {View,StyleSheet,ViewProps} from "react-native";

export default function Panel(props:ViewProps){
  return <View {...props} style={[styles.panel,props.style]}/>;
}
const styles=StyleSheet.create({
 panel:{backgroundColor:"#101418",borderRadius:8,padding:12,borderWidth:1,borderColor:"#2b3945"}
});
