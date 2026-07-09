import React, { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type HydraScanlineOverlayProps = {
  opacity?: number;
  lineCount?: number;
  animated?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function HydraScanlineOverlay({
  opacity = 0.18,
  lineCount = 42,
  animated = true,
  style,
}: HydraScanlineOverlayProps) {
  const offset = useRef(new Animated.Value(0)).current;

  const lines = useMemo(() => Array.from({ length: lineCount }, (_, index) => index), [lineCount]);

  useEffect(() => {
    if (!animated) return;

    const loop = Animated.loop(
      Animated.timing(offset, {
        toValue: 1,
        duration: 1800,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );

    loop.start();
    return () => loop.stop();
  }, [animated, offset]);

  const translateY = offset.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 12],
  });

  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.root, style]}>
      <Animated.View style={[StyleSheet.absoluteFill, { transform: [{ translateY }] }]}> 
        {lines.map((line) => (
          <View
            key={line}
            style={[
              styles.scanline,
              {
                top: `${(line / Math.max(1, lineCount - 1)) * 100}%`,
                opacity,
              },
            ]}
          />
        ))}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    overflow: 'hidden',
  },
  scanline: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#00FFD5',
  },
});
