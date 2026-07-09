import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

type HydraAnimatedLoaderProps = {
  active?: boolean;
  intervalMs?: number;
  size?: number;
  loop?: boolean;
  stopAt100?: boolean;
  style?: StyleProp<ViewStyle>;
  onCycleComplete?: () => void;
};

const FRAMES: { progress: number; source: ImageSourcePropType }[] = [
  { progress: 0, source: require('../../assets/loading/hydra_loader_00.png') },
  { progress: 20, source: require('../../assets/loading/hydra_loader_20.png') },
  { progress: 40, source: require('../../assets/loading/hydra_loader_40.png') },
  { progress: 60, source: require('../../assets/loading/hydra_loader_60.png') },
  { progress: 80, source: require('../../assets/loading/hydra_loader_80.png') },
  { progress: 100, source: require('../../assets/loading/hydra_loader_100.png') },
];

export function preloadHydraLoaderFrames(): void {
  FRAMES.forEach((frame) => {
    const resolved = Image.resolveAssetSource(frame.source);
    if (resolved?.uri) {
      Image.prefetch(resolved.uri).catch(() => undefined);
    }
  });
}

export default function HydraAnimatedLoader({
  active = true,
  intervalMs = 140,
  size = 360,
  loop = true,
  stopAt100 = false,
  style,
  onCycleComplete,
}: HydraAnimatedLoaderProps) {
  const [frameIndex, setFrameIndex] = useState(0);
  const opacity = useRef(new Animated.Value(1)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  const currentFrame = useMemo(() => FRAMES[frameIndex], [frameIndex]);

  useEffect(() => {
    preloadHydraLoaderFrames();
  }, []);

  useEffect(() => {
    const pulseLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 900,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );

    if (active) {
      pulseLoop.start();
    }

    return () => pulseLoop.stop();
  }, [active, pulse]);

  useEffect(() => {
    if (!active) {
      setFrameIndex(0);
      return;
    }

    const timer = setInterval(() => {
      setFrameIndex((current) => {
        const next = current + 1;

        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0.72,
            duration: 42,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 78,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
        ]).start();

        if (next >= FRAMES.length) {
          onCycleComplete?.();

          if (stopAt100) {
            return FRAMES.length - 1;
          }

          return loop ? 0 : FRAMES.length - 1;
        }

        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, [active, intervalMs, loop, onCycleComplete, opacity, stopAt100]);

  const pulseScale = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.018],
  });

  const pulseOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.72, 1],
  });

  return (
    <View style={[styles.root, style]} pointerEvents="none">
      <Animated.Image
        source={currentFrame.source}
        style={[
          styles.image,
          {
            width: size,
            height: size,
            opacity: Animated.multiply(opacity, pulseOpacity),
            transform: [{ scale: pulseScale }],
          },
        ]}
        resizeMode="contain"
        accessibilityLabel={`Hydra Home loading ${currentFrame.progress}%`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    shadowColor: '#00FFD5',
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 0 },
  },
});
