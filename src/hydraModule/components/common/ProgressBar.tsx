import React from "react";
import {View,StyleSheet} from "react-native";
export default function ProgressBar({value}:{value:number}){
return <View style={s.o}><View style={[s.i,{width:`${Math.max(0,Math.min(100,value*100))}%`}]} /></View>}
const s=StyleSheet.create({o:{height:8,backgroundColor:"#333",borderRadius:4},i:{height:8,backgroundColor:"#00ff88",borderRadius:4}});
