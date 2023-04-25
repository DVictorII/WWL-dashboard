import { chartPiezoList } from "./../utils/piezoList";
import { create } from "zustand";

interface ReportInfoTablesDaysSpanStore {

  daysSpan: number;

  changeDaysSpan: (newDays: number) => void;

}

export const useReportInfoTablesDaysSpanStore =
  create<ReportInfoTablesDaysSpanStore>((set) => ({

    daysSpan: 15,
    lectures:[],


    changeDaysSpan: (newDays) => set((state) => ({ ...state, daysSpan: newDays })),
    //@ts-ignore
    changeLectures: (newLectures) => set((state) => ({ ...state, lectures: newLectures })),


  }));