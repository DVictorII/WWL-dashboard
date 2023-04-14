import { create } from "zustand";

interface MapMenuStoreState {
  basemap: string;
  changeBasemap: (newBasemap: string) => void;
}

export const useMapStore = create<MapMenuStoreState>((set) => ({
  basemap: "satellite",

  changeBasemap: (newBasemap: string) =>
    set((state) => ({ ...state, basemap: newBasemap })),
}));
