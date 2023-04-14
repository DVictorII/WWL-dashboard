import moment from "moment";
import { create } from "zustand";
import { mapPiezoList } from "../utils/piezoList";

interface IndexMapStoreState {
  status: string;
  paddock:string;
  piezo: string;
  date: string;
  piezoList:any
  changeStatus:(newStatus:string) => void;
  changePaddock: (newPaddock: string) => void;
  changePiezo: (newPiezo: string) => void;
  changeDate: (newDate: string) => void;
}

export const useIndexMapStore = create<IndexMapStoreState>((set) => ({
    status:"All",
  paddock: "All",
  piezo:"All",
  date:moment(Date.now()).format("YYYY-MM-DD"),

  //@ts-ignore
  piezoList:mapPiezoList["All"],

changeStatus:(newStatus:string) => set((state)=>({...state, status:newStatus})),
  changePaddock: (newPaddock: string) =>
  //@ts-ignore
    set((state) => ({ ...state, paddock: newPaddock, piezo:"All", piezoList:mapPiezoList[newPaddock] })),

    changePiezo: (newPiezo: string) =>
    set((state) => ({ ...state, piezo: newPiezo })),

    changeDate: (newDate: string) =>
    set((state) => ({ ...state, date: newDate })),

  
}));