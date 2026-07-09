import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type HydraHologramFrameProps = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  cornerSize?: number;
};

export default function HydraHologramFrame({ children, style, cornerSize = 34 }: HydraHologramFrameProps) {
  return (
    <View style={[styles.root, style]}>
      <Corner position="topLeft" size={cornerSize} />
      <Corner position="topRight" size={cornerSize} />
      <Corner position="bottomLeft" size={cornerSize} />
      <Corner position="bottomRight" size={cornerSize} />
      <View style={styles.innerGlow} />
      {children}
    </View>
  );
}

function Corner({ position, size }: { position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'; size: number }) {
  const verticalSide = position.includes('Left') ? { left: 0 } : { right: 0 };
  const horizontalSide = position.includes('top') ? { top: 0 } : { bottom: 0 };

  return (
    <View style={[styles.corner, verticalSide, horizontalSide, { width: size, height: size }]}> 
      <View style={[styles.cornerLineHorizontal, position.includes('top') ? { top: 0 } : { bottom: 0 }]} />
      <View style={[styles.cornerLineVertical, position.includes('Left') ? { left: 0 } : { right: 0 }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    borderColor: 'rgba(0,255,213,0.22)',
    backgroundColor: 'rgba(0,0,0,0.20)',
    overflow: 'hidden',
  },
  innerGlow: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: 'rgba(0,255,213,0.06)',
  },
  corner: {
    position: 'absolute',
    zIndex: 2,
  },
  cornerLineHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#00FFD5',
    opacity: 0.72,
  },
  cornerLineVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: '#00FFD5',
    opacity: 0.72,
  },
});
