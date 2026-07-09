import React, { useEffect, useMemo, useState } from "react";
import { Text, View } from "react-native";

type Props = {
  size?: number;
};

export function HydraAnimatedLoader({ size = 160 }: Props) {
  const frames = useMemo(() => ["◈", "◇", "◆", "◇"], []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((value) => (value + 1) % frames.length);
    }, 140);
    return () => clearInterval(timer);
  }, [frames.length]);

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: size / 2,
        borderWidth: 1,
        borderColor: "rgba(141,255,220,0.44)",
        backgroundColor: "rgba(0,20,17,0.52)",
      }}
    >
      <Text style={{ color: "#8dffdc", fontSize: Math.max(40, size * 0.38), fontWeight: "900" }}>
        {frames[index]}
      </Text>
    </View>
  );
}

export default HydraAnimatedLoader;
