import React from "react";
import {Text,StyleSheet} from "react-native";
export default ({children}:{children:React.ReactNode})=><Text style={s.t}>{children}</Text>;
const s=StyleSheet.create({t:{color:"#9fb3c8",fontSize:12,fontWeight:"600"}});
