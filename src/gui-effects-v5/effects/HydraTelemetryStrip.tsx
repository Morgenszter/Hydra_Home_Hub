import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { hydraTheme } from '../theme/hydraTheme';

type TelemetryItem = {
  label: string;
  value: string;
  active?: boolean;
};

type HydraTelemetryStripProps = {
  items?: TelemetryItem[];
};

const DEFAULT_ITEMS: TelemetryItem[] = [
  { label: 'WIFI', value: 'LINK', active: true },
  { label: 'LUX', value: 'SYNC', active: true },
  { label: 'TEMP', value: 'READ', active: true },
  { label: 'LOCK', value: 'ARM', active: false },
];

export default function HydraTelemetryStrip({ items = DEFAULT_ITEMS }: HydraTelemetryStripProps) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTick((value) => value + 1), 520);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.root}>
      {items.map((item, index) => {
        const pulse = (tick + index) % 3 === 0;
        return (
          <View key={item.label} style={styles.cell}>
            <View style={[styles.led, item.active && styles.ledActive, pulse && item.active && styles.ledPulse]} />
            <Text style={styles.label}>{item.label}</Text>
            <Text style={[styles.value, item.active && styles.valueActive]}>{item.value}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  cell: {
    minWidth: 88,
    borderWidth: 1,
    borderColor: 'rgba(0,255,213,0.18)',
    backgroundColor: 'rgba(0,0,0,0.24)',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 6,
  },
  led: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 99,
    backgroundColor: '#20383A',
  },
  ledActive: {
    backgroundColor: hydraTheme.colors.cyan,
  },
  ledPulse: {
    shadowColor: hydraTheme.colors.cyan,
    shadowRadius: 8,
    shadowOpacity: 0.8,
  },
  label: {
    color: hydraTheme.colors.textDim,
    fontSize: 9,
    letterSpacing: 1.6,
  },
  value: {
    color: '#536D6B',
    fontSize: 11,
    letterSpacing: 1.2,
    marginTop: 4,
    fontWeight: '700',
  },
  valueActive: {
    color: hydraTheme.colors.text,
  },
});
