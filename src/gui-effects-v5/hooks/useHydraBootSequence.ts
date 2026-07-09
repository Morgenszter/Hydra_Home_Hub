import { useEffect, useMemo, useState } from 'react';

export type HydraBootState = {
  stepIndex: number;
  stepLabel: string;
  progress: number;
  complete: boolean;
};

export const HYDRA_BOOT_STEPS = [
  'WAKING HOME COGITATOR',
  'LINKING WIFI MATRIX',
  'SYNCING LIGHT SYSTEMS',
  'READING TEMPERATURE GRID',
  'ARMING SECURITY SEAL',
  'DATA LINK COMPLETE',
];

export function useHydraBootSequence(durationMs = 4200, onReady?: () => void): HydraBootState {
  const [stepIndex, setStepIndex] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setStepIndex(0);
    setComplete(false);

    const stepInterval = Math.max(360, Math.floor(durationMs / HYDRA_BOOT_STEPS.length));
    const stepTimer = setInterval(() => {
      setStepIndex((current) => Math.min(current + 1, HYDRA_BOOT_STEPS.length - 1));
    }, stepInterval);

    const finishTimer = setTimeout(() => {
      setComplete(true);
      setStepIndex(HYDRA_BOOT_STEPS.length - 1);
      onReady?.();
    }, durationMs);

    return () => {
      clearInterval(stepTimer);
      clearTimeout(finishTimer);
    };
  }, [durationMs, onReady]);

  const progress = useMemo(() => {
    if (complete) return 100;
    return Math.round((stepIndex / Math.max(1, HYDRA_BOOT_STEPS.length - 1)) * 100);
  }, [complete, stepIndex]);

  return {
    stepIndex,
    stepLabel: HYDRA_BOOT_STEPS[stepIndex],
    progress,
    complete,
  };
}
