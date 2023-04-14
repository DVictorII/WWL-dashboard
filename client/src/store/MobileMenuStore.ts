import { create } from "zustand";

interface MobileMenuStoreState {
  mobileMenuIsOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
}

export const useMobileMenuStore = create<MobileMenuStoreState>((set) => ({
  mobileMenuIsOpen: false,

  openMobileMenu: () => set((state) => ({ ...state, mobileMenuIsOpen: true })),
  closeMobileMenu: () =>
    set((state) => ({ ...state, mobileMenuIsOpen: false })),
}));
