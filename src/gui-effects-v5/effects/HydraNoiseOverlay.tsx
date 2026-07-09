import React, { useEffect, useMemo, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type HydraNoiseOverlayProps = {
  density?: number;
  opacity?: number;
  style?: StyleProp<ViewStyle>;
};

function prng(seed: number) {
  const x = Math.sin(seed * 43758.5453) * 10000;
  return x - Math.floor(x);
}

export default function HydraNoiseOverlay({ density = 95, opacity = 0.08, style }: HydraNoiseOverlayProps) {
  const [salt, setSalt] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setSalt((value) => (value + 1) % 9), 180);
    return () => clearInterval(timer);
  }, []);

  const specks = useMemo(
    () =>
      Array.from({ length: density }, (_, index) => ({
        id: index,
        left: `${prng(index + salt * 17) * 100}%`,
        top: `${prng(index + salt * 31 + 9) * 100}%`,
        size: 1 + Math.floor(prng(index + 4) * 2),
        alpha: opacity * (0.4 + prng(index + 11) * 0.8),
      })),
    [density, opacity, salt],
  );

  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.root, style]}>
      {specks.map((speck) => (
        <View
          key={speck.id}
          style={[
            styles.speck,
            {
              left: speck.left,
              top: speck.top,
              width: speck.size,
              height: speck.size,
              opacity: speck.alpha,
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    overflow: 'hidden',
  },
  speck: {
    position: 'absolute',
    backgroundColor: '#D8FFFA',
  },
});
