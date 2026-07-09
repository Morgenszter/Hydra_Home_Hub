import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

type HydraDataRainProps = {
  columns?: number;
  opacity?: number;
  speedMs?: number;
  style?: StyleProp<ViewStyle>;
};

const GLYPHS = ['XX', 'HYD', 'LUX', 'WIFI', 'TEMP', 'LOCK', 'Ω', 'Σ', 'Δ', '0101', 'DATA'];

function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 999) * 10000;
  return x - Math.floor(x);
}

export default function HydraDataRain({
  columns = 18,
  opacity = 0.22,
  speedMs = 4200,
  style,
}: HydraDataRainProps) {
  const progress = useRef(new Animated.Value(0)).current;

  const rain = useMemo(
    () =>
      Array.from({ length: columns }, (_, index) => {
        const glyphCount = 4 + Math.floor(pseudoRandom(index + 3) * 5);
        return {
          id: index,
          left: `${(index / Math.max(1, columns - 1)) * 100}%`,
          delay: Math.floor(pseudoRandom(index + 9) * speedMs),
          topOffset: -160 - Math.floor(pseudoRandom(index + 11) * 260),
          glyphs: Array.from({ length: glyphCount }, (__, glyphIndex) => GLYPHS[(index + glyphIndex) % GLYPHS.length]),
        };
      }),
    [columns, speedMs],
  );

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(progress, {
        toValue: 1,
        duration: speedMs,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    loop.start();
    return () => loop.stop();
  }, [progress, speedMs]);

  const translateY = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [-220, 920],
  });

  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.root, style]}>
      {rain.map((column) => (
        <Animated.View
          key={column.id}
          style={[
            styles.column,
            {
              left: column.left,
              top: column.topOffset,
              opacity,
              transform: [{ translateY }],
            },
          ]}
        >
          {column.glyphs.map((glyph, index) => (
            <Text key={`${column.id}-${index}`} style={styles.glyph}>
              {glyph}
            </Text>
          ))}
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    overflow: 'hidden',
  },
  column: {
    position: 'absolute',
    width: 48,
  },
  glyph: {
    color: '#00FFD5',
    fontSize: 9,
    letterSpacing: 1.4,
    marginVertical: 4,
    textAlign: 'center',
  },
});
