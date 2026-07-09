import React from "react";
import { Text, View } from "react-native";
import HydraAnimatedLoader from "../components/HydraAnimatedLoader";

type Props = {
  label?: string;
};

export function LoadingScreen({ label = "HYDRA BOOTING" }: Props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#020605",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
      }}
    >
      <HydraAnimatedLoader size={180} />
      <Text
        style={{
          color: "#8dffdc",
          fontSize: 18,
          fontWeight: "900",
          letterSpacing: 2,
        }}
      >
        {label}
      </Text>
      <Text style={{ color: "rgba(215,255,242,0.68)", fontSize: 12, letterSpacing: 1 }}>
        WIN11 BRIDGE / ANDROID HUD / ALPHA MODE
      </Text>
    </View>
  );
}

export default LoadingScreen;
