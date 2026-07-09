import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';

type HydraGlitchTextProps = {
  children: string;
  style?: StyleProp<TextStyle>;
  glitchColorA?: string;
  glitchColorB?: string;
  intensity?: 'low' | 'medium' | 'high';
};

const INTENSITY = {
  low: { distance: 1, opacity: 0.24, interval: 1600 },
  medium: { distance: 2, opacity: 0.36, interval: 1100 },
  high: { distance: 3, opacity: 0.48, interval: 720 },
} as const;

export default function HydraGlitchText({
  children,
  style,
  glitchColorA = '#00FFD5',
  glitchColorB = '#D13333',
  intensity = 'medium',
}: HydraGlitchTextProps) {
  const profile = INTENSITY[intensity];
  const shift = useRef(new Animated.Value(0)).current;
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(true);
      shift.setValue(0);

      Animated.sequence([
        Animated.timing(shift, {
          toValue: 1,
          duration: 42,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(shift, {
          toValue: 0,
          duration: 62,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]).start(() => setActive(false));
    }, profile.interval);

    return () => clearInterval(timer);
  }, [profile.interval, shift]);

  const xA = shift.interpolate({ inputRange: [0, 1], outputRange: [0, -profile.distance] });
  const xB = shift.interpolate({ inputRange: [0, 1], outputRange: [0, profile.distance] });

  return (
    <View style={styles.root}>
      {active && (
        <Animated.Text
          style={[
            styles.layer,
            style,
            { color: glitchColorA, opacity: profile.opacity, transform: [{ translateX: xA }] },
          ]}
        >
          {children}
        </Animated.Text>
      )}
      {active && (
        <Animated.Text
          style={[
            styles.layer,
            style,
            { color: glitchColorB, opacity: profile.opacity, transform: [{ translateX: xB }] },
          ]}
        >
          {children}
        </Animated.Text>
      )}
      <Text style={style}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  layer: {
    position: 'absolute',
  },
});
