import React, { useMemo } from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { hydraTheme } from '../theme/hydraTheme';

type HydraIconDockProps = {
  activeIndex?: number;
  onSelect?: (index: number) => void;
  style?: StyleProp<ViewStyle>;
};

const ICONS: ImageSourcePropType[] = [
  require('../../assets/alpha-icons/alpha_icon_01.png'),
  require('../../assets/alpha-icons/alpha_icon_02.png'),
  require('../../assets/alpha-icons/alpha_icon_03.png'),
  require('../../assets/alpha-icons/alpha_icon_04.png'),
  require('../../assets/alpha-icons/alpha_icon_05.png'),
  require('../../assets/alpha-icons/alpha_icon_06.png'),
  require('../../assets/alpha-icons/alpha_icon_07.png'),
  require('../../assets/alpha-icons/alpha_icon_08.png'),
  require('../../assets/alpha-icons/alpha_icon_09.png'),
];

const LABELS = ['CORE', 'WIFI', 'LUX', 'HEAT', 'LOCK', 'SCAN', 'DATA', 'AUX', 'HYDRA'];

export default function HydraIconDock({ activeIndex = 0, onSelect, style }: HydraIconDockProps) {
  const items = useMemo(() => ICONS.map((source, index) => ({ source, label: LABELS[index] })), []);

  return (
    <View style={[styles.root, style]}>
      {items.map((item, index) => {
        const active = index === activeIndex;
        return (
          <Pressable
            key={item.label}
            onPress={() => onSelect?.(index)}
            style={[styles.item, active && styles.itemActive]}
            accessibilityRole="button"
            accessibilityLabel={`Hydra module ${item.label}`}
          >
            <Image source={item.source} style={[styles.icon, active && styles.iconActive]} resizeMode="contain" />
            <Text style={[styles.label, active && styles.labelActive]}>{item.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 213, 0.22)',
    backgroundColor: 'rgba(0, 8, 10, 0.56)',
  },
  item: {
    width: 72,
    height: 84,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 213, 0.12)',
    backgroundColor: 'rgba(3, 16, 18, 0.58)',
  },
  itemActive: {
    borderColor: hydraTheme.colors.cyan,
    backgroundColor: 'rgba(0, 255, 213, 0.1)',
  },
  icon: {
    width: 46,
    height: 46,
    opacity: 0.62,
  },
  iconActive: {
    opacity: 1,
  },
  label: {
    marginTop: 4,
    fontSize: 10,
    letterSpacing: 1.2,
    color: hydraTheme.colors.textDim,
    fontWeight: '700',
  },
  labelActive: {
    color: hydraTheme.colors.text,
  },
});
