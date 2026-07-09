import React from "react";
import {View,StyleSheet} from "react-native";
export default ({children}:{children:React.ReactNode})=><View style={s.g}>{children}</View>;
const s=StyleSheet.create({g:{shadowOpacity:.4,shadowRadius:8}});
