import moment from "moment";
import { chartPiezoList } from "./../utils/piezoList";
import { create } from "zustand";

interface NewIncidentReportStateStore {
  photo?: File | string;
  title: string;
  paddock: string;
  date: string;

  latitude: string | number;
  longitude: string | number;
  elevation: string | number;

  description: string;

  supervisors: string[];

  changePaddock: (newPaddock: string) => void;

  uploadPhoto: (newPhoto: File | string) => void;
  deletePhoto: () => void;

  changeTitle: (newTitle: string) => void;
  changeDate: (newDate: string) => void;

  changeLatitude: (newLatitude: string | number) => void;
  changeLongitude: (newLongitude: string | number) => void;

  changeCoordinates: (
    newLatitude: string | number,
    newLongitude: string | number
  ) => void;

  changeElevation: (newElevation: string | number) => void;

  changeDescription: (newDescription: string) => void;

  changeSupervisor: (index: number, newSupervisor: string) => void;
  addSupervisor: () => void;
  deleteSupervisor: (index: number) => void;
  resetState: () => void;
}

export const useNewIncidentReportStateStore =
  create<NewIncidentReportStateStore>((set) => ({
    photo: undefined,
    title: "",
    paddock: "CDIII",
    date: moment(Date.now()).format("YYYY-MM-DD"),

    latitude: -22.454974,
    longitude: 15.027137,
    elevation: 0,

    description: "",
    supervisors: ["rugaz@wwlengineering.com", ""],

    resetState: () =>
      set((state) => ({
        photo: undefined,
        title: "",
        paddock: "CDIII",
        date: moment(Date.now()).format("YYYY-MM-DD"),

        latitude: -22.454974,
        longitude: 15.027137,
        elevation: 0,

        description: "",
        supervisors: ["rugaz@wwlengineering.com", ""],
      })),

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

    changeTitle: (newTitle) => set((state) => ({ ...state, title: newTitle })),
    changeDate: (newDate) => set((state) => ({ ...state, date: newDate })),
    changeDescription: (newDescription) =>
      set((state) => ({ ...state, description: newDescription })),

    changeSupervisor: (index, newSupervisor) =>
      set((state) => ({
        ...state,
        supervisors: state.supervisors.map((sup, i) => {
          if (i === index) return newSupervisor;
          return sup;
        }),
      })),

    addSupervisor: () =>
      set((state) => ({ ...state, supervisors: [...state.supervisors, ""] })),
    deleteSupervisor: (index) =>
      set((state) => ({
        ...state,
        supervisors: state.supervisors.filter((sup, i) => i !== index),
      })),

    changeLatitude: (newLatitude: string | number) =>
      set((state) => ({ ...state, latitude: newLatitude })),
    changeLongitude: (newLongitude: string | number) =>
      set((state) => ({ ...state, longitude: newLongitude })),

    changeCoordinates: (newLatitude, newLongitude) =>
      set((state) => ({
        ...state,
        latitude: newLatitude,
        longitude: newLongitude,
      })),
    changeElevation: (newElevation: string | number) =>
      set((state) => ({ ...state, elevation: newElevation })),
  }));
