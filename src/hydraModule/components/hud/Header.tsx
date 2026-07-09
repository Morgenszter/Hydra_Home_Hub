import React from "react";import {View,Text,StyleSheet} from "react-native";
export default function Header(){return <View style={s.c}><Text style={s.t}>HYDRA INTELLIGENCE</Text></View>}
const s=StyleSheet.create({c:{padding:16,borderBottomWidth:1,borderColor:"#234",backgroundColor:"#111"},t:{color:"#0f8",fontSize:20,fontWeight:"700"}});