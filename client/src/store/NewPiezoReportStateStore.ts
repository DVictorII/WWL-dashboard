import moment from "moment";
import { chartPiezoList } from "./../utils/piezoList";
import { create } from "zustand";

interface NewPiezoReportStateStore {
  photo?: File | string;
  title: string;
  paddock: string;
  piezo: string;
  days: number;
  piezoList: string[];
  chartType: string;
  date: string;
  description: string;

  supervisors: string[];

  changePaddock: (newPaddock: string) => void;
  changePiezo: (newPiezo: string) => void;
  changeDays: (newDays: number) => void;
  changeChartType: (newChartType: string) => void;

  uploadPhoto: (newPhoto: File | string) => void;
  deletePhoto: () => void;

  changeTitle: (newTitle: string) => void;
  changeDate: (newDate: string) => void;
  changeDescription: (newDescription: string) => void;
  changeSupervisor: (index:number, newSupervisor: string) => void;
  addSupervisor: ()=>void
  deleteSupervisor: (index:number)=>void
}

export const useNewPiezoReportStateStore = create<NewPiezoReportStateStore>(
  (set) => ({
    photo: undefined,
    title: "",
    paddock: "CDIII",
    piezo: chartPiezoList["CDIII"][0],
    days: 15,
    piezoList: chartPiezoList["CDIII"],
    chartType: "pressure",
    date: moment(Date.now()).format("YYYY-MM-DD"),
    description: "",
    supervisors: ["",""],

    uploadPhoto: (newPhoto) => set((state) => ({ ...state, photo: newPhoto })),
    deletePhoto: () => set((state) => ({ ...state, photo: undefined })),

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

    changeTitle: (newTitle) => set((state) => ({ ...state, title: newTitle })),
    changeDate: (newDate) => set((state) => ({ ...state, date: newDate })),
    changeDescription: (newDescription) =>
      set((state) => ({ ...state, description: newDescription })),

    changeSupervisor: (index, newSupervisor) => set((state) => ({ ...state, supervisors: state.supervisors.map((sup,i)=>{
      if(i===index) return newSupervisor
      return sup
    }) })),

    addSupervisor: ()=>set((state) => ({ ...state, supervisors: [...state.supervisors,""]})),
    deleteSupervisor: (index)=>set((state) =>({ ...state, supervisors: state.supervisors.filter((sup,i)=>i!==index) }))

  })
);
