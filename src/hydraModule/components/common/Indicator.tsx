import React from "react";
import {View,StyleSheet} from "react-native";
export default function Indicator({active}:{active:boolean}){return <View style={[s.d,active&&s.a]}/>;}
const s=StyleSheet.create({d:{width:10,height:10,borderRadius:5,backgroundColor:"#666"},a:{backgroundColor:"#00ff88"}});
