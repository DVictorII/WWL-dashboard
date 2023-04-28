import { create } from "zustand";


interface BiannualVisitStateStore {
  visitID: number;
  mediaID: number

  updateVisitID: (id:number | string) => void
  updateMediaID: (id:number | string) => void
}

export const useBiannualVisitStateStore = create<BiannualVisitStateStore>((set) => ({
  visitID: 1,
  mediaID: 73,

  updateVisitID: (id:number | string) => set((state) => ({ ...state, visitID: Number(id) })),
  updateMediaID: (id:number | string) => set((state) => ({ ...state, mediaID: Number(id) })),
}));