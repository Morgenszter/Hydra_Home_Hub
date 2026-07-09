export const hydraTheme = {
  colors: {
    background: '#020608',
    backgroundAlt: '#050B0E',
    panel: '#071114',
    panelSoft: 'rgba(7, 17, 20, 0.76)',
    cyan: '#00FFD5',
    cyanDim: '#0A7F78',
    teal: '#00BFA5',
    steel: '#7FA7A5',
    bronze: '#7B6041',
    red: '#D13333',
    text: '#D8FFFA',
    textDim: '#7BA9A5',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 18,
    xl: 28,
  },
  radius: {
    sm: 6,
    md: 10,
    lg: 18,
  },
} as const;

export type HydraTheme = typeof hydraTheme;
