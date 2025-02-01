import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

type RSVP = {
  NameFirst: string;
  NameLast: string;
  ContactPhone: string;
  ContactEmail: string;
  Comment: string;
  Total: string;
  Interests: string[];
  InterestsOther: string;
  Network: string;
  NetworkOther: string;
  Whoami: string;
};
export type StoreSentState = {
  uuid: string;
  rsvp: RSVP;
};

export type StoreState = {
  rsvp: RSVP;
  sent: StoreSentState[];
};

export type StoreActions = {
  setRsvp: (nextRsvp: RSVP) => void;
  resetRsvp: () => void;
  addReservation: (savedReservation: RSVP) => void;
};

const initialState: RSVP = {
  NameFirst: "",
  NameLast: "",
  ContactPhone: "",
  ContactEmail: "",
  Comment: "",
  Total: "",
  Interests: [],
  InterestsOther: "",
  Network: "",
  NetworkOther: "",
  Whoami: "",
};

export type Store = StoreState & StoreActions;
export const rsvpStore = createStore<Store>()(
  persist(
    (set) => ({
      rsvp: { ...initialState },
      sent: [],
      setRsvp: (rsvp) => set({ rsvp }),
      resetRsvp: () => set({ rsvp: { ...initialState } }),
      addReservation: (rsvp: RSVP) =>
        set((state) => ({ sent: [...state.sent, { uuid: "", rsvp }] })),
    }),
    { name: "rsvp-storage" },
  ),
);
