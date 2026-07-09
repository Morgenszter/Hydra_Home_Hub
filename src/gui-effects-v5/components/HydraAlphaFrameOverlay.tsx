import React, { useEffect, useMemo, useRef } from 'react';
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

type FrameVariant = 'wide' | 'compact' | 'square' | 'vertical';

type HydraAlphaFrameOverlayProps = {
  variant?: FrameVariant;
  animated?: boolean;
  opacity?: number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

const FRAMES: Record<FrameVariant, ImageSourcePropType> = {
  wide: require('../../assets/alpha-frames/alpha_frame_wide_top_bottom.png'),
  compact: require('../../assets/alpha-frames/alpha_frame_wide_compact.png'),
  square: require('../../assets/alpha-frames/alpha_frame_square.png'),
  vertical: require('../../assets/alpha-frames/alpha_frame_vertical_columns.png'),
};

export default function HydraAlphaFrameOverlay({
  variant = 'wide',
  animated = true,
  opacity = 0.92,
  style,
  children,
}: HydraAlphaFrameOverlayProps) {
  const pulse = useRef(new Animated.Value(0)).current;
  const frameSource = useMemo(() => FRAMES[variant], [variant]);

  useEffect(() => {
    if (!animated) return;

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 1400,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]),
    );

    loop.start();
    return () => loop.stop();
  }, [animated, pulse]);

  const glowOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.18, 0.45],
  });

  return (
    <View style={[styles.root, style]}>
      <Animated.View style={[styles.outerGlow, { opacity: animated ? glowOpacity : 0.24 }]} />
      <Image source={frameSource} resizeMode="contain" style={[styles.frame, { opacity }]} />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outerGlow: {
    position: 'absolute',
    left: 24,
    right: 24,
    top: 24,
    bottom: 24,
    borderWidth: 1,
    borderColor: '#00FFD5',
    shadowColor: '#00FFD5',
    shadowOpacity: 0.9,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 0 },
  },
  frame: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  content: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
