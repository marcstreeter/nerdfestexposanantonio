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
        // Start with an empty string to avoid calling crypto on the server
        uuid: "",
        languages: "",
        resolution: "",
        orientation: "",
        touch: false,
      },
      setUnique: (unique) => set({ unique }),
    }),
    {
      name: "unique-storage",
      // Optional: Ensure it only hydrates on the client
      onRehydrateStorage: () => (state) => {
        if (state && !state.unique.uuid) {
          state.setUnique({
            ...state.unique,
            uuid:
              typeof crypto !== "undefined" && crypto.randomUUID
                ? crypto.randomUUID()
                : Math.random().toString(36).substring(2, 12),
            languages: getLanguages(),
            resolution: getResolution(),
            orientation: getOrientation(),
            touch: hasTouchScreen(),
          });
        }
      },
    },
  ),
);
