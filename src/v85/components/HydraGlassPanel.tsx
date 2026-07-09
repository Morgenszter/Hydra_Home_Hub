import React from "react";
import { View } from "react-native";
import { hydraGuiEffectsTheme } from "../effects/HydraGuiEffectsTheme";

export function HydraGlassPanel({ children }: { children: React.ReactNode }) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: hydraGuiEffectsTheme.colors.border,
        borderRadius: hydraGuiEffectsTheme.radius.panel,
        backgroundColor: hydraGuiEffectsTheme.colors.panel,
        padding: 16,
        shadowColor: hydraGuiEffectsTheme.colors.accent,
        shadowOpacity: 0.24,
        shadowRadius: 18,
      }}
    >
      {children}
    </View>
  );
}
