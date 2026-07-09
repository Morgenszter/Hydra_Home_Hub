

export {};

// HYDRA_COMPAT_PROVIDER_EXPORTS
import React from "react";

export type HydraProviderProps = {
  children: React.ReactNode;
};

export function HydraProvider({ children }: HydraProviderProps) {
  return <>{children}</>;
}

export default HydraProvider;
