import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

export type BrowserState = {
  unique: {
    uuid: string;
    languages: string;
    resolution: string;
    orientation: string;
    touch: boolean;
  };
};

export type BrowserActions = {
  setUnique: (nextBrowser: BrowserState["unique"]) => void;
};

export type Browser = BrowserState & BrowserActions;
const hasTouchScreen = (): boolean => navigator.maxTouchPoints > 0;
const getResolution = (): string =>
  `${screen?.width || "??"}x${screen?.height || "??"}`;
const getOrientation = (): string => screen?.orientation?.type || "unknown";
const getLanguages = (): string => navigator?.languages?.join(",") || "unknown";
export const browserStore = createStore<Browser>()(
  persist(
    (set) => ({
      unique: {
        uuid: crypto.randomUUID(),
        languages: getLanguages(),
        resolution: getResolution(),
        orientation: getOrientation(),
        touch: hasTouchScreen(),
      },
      setUnique: (unique: any) => set({ unique }),
    }),
    { name: "unique-storage" },
  ),
);
