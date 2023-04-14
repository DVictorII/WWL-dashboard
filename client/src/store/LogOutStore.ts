import { create } from "zustand";

interface LogOutStoreState {
  logOutModalIsOpen: boolean;
  openLogOutModal: () => void;

  closeLogOutModal: () => void;
}

export const useLogOutStore = create<LogOutStoreState>((set) => ({
  logOutModalIsOpen: false,

  openLogOutModal: () =>
    set((state) => ({ ...state, logOutModalIsOpen: true })),
  closeLogOutModal: () =>
    set((state) => ({ ...state, logOutModalIsOpen: false })),
}));
