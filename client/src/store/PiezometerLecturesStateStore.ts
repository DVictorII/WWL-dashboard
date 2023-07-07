import { PiezometerDataI } from "../types";
import { chartPiezoList } from "./../utils/piezoList";
import { create } from "zustand";

interface PiezometerLecturesStateStore {
  paddock: string;
  piezo: string;
  days: number;
  piezoList: string[];
  chartType: string;

  changePaddock: (newPaddock: string) => void;
  changePiezo: (newPiezo: string) => void;
  changeDays: (newDays: number) => void;
  changeChartType: (newChartType: string) => void;

  changePaddockAndPiezo: (newPaddock: string, newPiezo: string) => void;
}

export const usePiezometerLecturesStateStore =
  create<PiezometerLecturesStateStore>((set) => ({
    paddock: "CDIII",
    piezo: chartPiezoList["CDIII"][0],
    days: 15,
    piezoList: chartPiezoList["CDIII"],
    chartType: "pressure",

    changePaddock: (newPaddock) =>
      //@ts-ignore
      set((state) => ({
        ...state,
        paddock: newPaddock,
        //@ts-ignore
        piezo: chartPiezoList[newPaddock][0],
        //@ts-ignore
        piezoList: chartPiezoList[newPaddock],
      })),

    changePiezo: (newPiezo) => set((state) => ({ ...state, piezo: newPiezo })),

    changeDays: (newDays) => set((state) => ({ ...state, days: newDays })),
    changeChartType: (newChartType) =>
      set((state) => ({ ...state, chartType: newChartType })),

    changePaddockAndPiezo: (newPaddock, newPiezo) =>
      set((state) => ({
        ...state,
        paddock: newPaddock,
        //@ts-ignore
        piezo: newPiezo,
        //@ts-ignore
        piezoList: chartPiezoList[newPaddock],
      })),
  }));
