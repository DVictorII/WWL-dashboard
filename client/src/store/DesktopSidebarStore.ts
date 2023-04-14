import { create } from "zustand";

interface MenuStoreState {
  menuIsOpen: boolean;
  openMenu: () => void;

  closeMenu: () => void;
}

export const useMenuStore = create<MenuStoreState>((set) => ({
  menuIsOpen: false,

  openMenu: () =>
    set((state) => ({ ...state, menuIsOpen: true })),
  closeMenu: () =>
    set((state) => ({ ...state, menuIsOpen: false })),
}));
