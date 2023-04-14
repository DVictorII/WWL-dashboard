import { chartPiezoList } from './../utils/piezoList';
import { create } from "zustand";


interface PiezometerLecturesStateStore {
  
  paddock: string
  piezo: string
days:number
 piezoList: string[]

  changePaddock: (newPaddock:string) => void;
  changePiezo: (newPiezo:string) => void;
  changeDays: (newDays:number) => void;

}

export const usePiezometerLecturesStateStore = create<PiezometerLecturesStateStore>((set) => ({
  paddock:"CDIII",
  piezo:chartPiezoList["CDIII"][0],
  days:15,
  piezoList: chartPiezoList["CDIII"],


  changePaddock: (newPaddock) =>
  //@ts-ignore
    set((state) => ({ ...state, paddock: newPaddock, piezo:chartPiezoList[newPaddock][0], piezoList: chartPiezoList[newPaddock]})),

    changePiezo: (newPiezo) =>
      set((state) => ({ ...state, piezo:newPiezo})),

    changeDays: (newDays) =>
      set((state) => ({ ...state, days: newDays})),
}));