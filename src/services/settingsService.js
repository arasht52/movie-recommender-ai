import { getItem, setItem } from "../utils/storage";
import { STORAGE_KEYS } from "../constants/storageKeys";
import { SCORING_WEIGHTS } from "../constants/scoringWeights";

export const DEFAULT_SETTINGS = {
  safetyFilters: {
    avoidViolence: false,
    avoidFear: false,
    avoidHeavySadness: false,
    avoidTriggeringThemes: true,
  },
  preferredTypes: ["movie", "series"],
  preferredRegions: [],
  preferredLanguages: [],
  weightOverrides: SCORING_WEIGHTS,
};

export const getSettings = () => {
  return getItem(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
};

export const saveSettings = (settings) => {
  return setItem(STORAGE_KEYS.SETTINGS, {
    ...DEFAULT_SETTINGS,
    ...settings,
    safetyFilters: {
      ...DEFAULT_SETTINGS.safetyFilters,
      ...(settings?.safetyFilters || {}),
    },
  });
};

export const resetSettings = () => {
  setItem(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  return DEFAULT_SETTINGS;
};