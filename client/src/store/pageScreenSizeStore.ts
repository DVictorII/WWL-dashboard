import { create } from "zustand";

interface PageScreenSizeStore {
  screenSize: string;
  changeScreenSize: (newSize:string) => void;

}

export const usePageScreenSizeStore = create<PageScreenSizeStore>((set) => ({
  screenSize: "mobile",


  changeScreenSize: (newSize:string) => {
    return set((state) => ({ ...state, screenSize:newSize}))},
}));