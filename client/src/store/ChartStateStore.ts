import { chartPiezoList } from "../utils/piezoList";
import { create } from "zustand";

interface ChartStoreState {
  paddock: string;
  piezo: string;
  days: number;
  piezoList: any;
  changePaddock: (newPaddock: string) => void;
  changePiezo: (newPiezo: string) => void;
  changeDays: (newDays: number) => void;
  changeTable: (newPaddock: string) => void;
}

export const useChartStore = create<ChartStoreState>((set) => ({
  paddock: "CDIII",
  piezo: "VW-CD3-01",
  days: 15,

  //@ts-ignore
  piezoList: chartPiezoList["CDIII"],

  changePaddock: (newPaddock: string) =>
    set((state) => ({ ...state, paddock: newPaddock })),

  changePiezo: (newPiezo: string) =>
    set((state) => ({ ...state, piezo: newPiezo })),

  changeDays: (newDays: number) =>
    set((state) => ({ ...state, days: newDays })),

  changePiezoList: (newPaddock: string) => {
    return set((state) => ({
      ...state,
      //@ts-ignore
      piezoList: chartPiezoList[newPaddock],
    }));
  },

  changeTable: (newPaddock: string) =>
    set((state) => ({
      ...state,
      paddock: newPaddock,
      //@ts-ignore
      piezoList: chartPiezoList[newPaddock],
      //@ts-ignore
      piezo: chartPiezoList[newPaddock][0],
    })),
}));
