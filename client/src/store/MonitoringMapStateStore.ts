import { mapPiezoList } from "./../utils/piezoList";
import { create } from "zustand";
import moment from "moment";
import { LastReadingsI, PiezometerDataI } from "../types";

interface MonitoringMapStateStore {
  status: string | number;
  paddock: string;
  piezo: string;
  date: string;
  piezoList: string[];

  piezometersData: PiezometerDataI[];
  sectionsList: string[];
  lastReadings: LastReadingsI[];

  changeStatus: (newStatus: number) => void;
  changePaddock: (newPaddock: string) => void;
  changePiezo: (newPiezo: string) => void;
  changeDate: (newDate: string) => void;

  changePaddockAndPiezo: (newPaddock: string, newPiezo: string) => void;
  setPiezometersDataAndLastReadings: (
    fetchedData: PiezometerDataI[],
    fetchedLastReadings: LastReadingsI[]
  ) => void;
}

export const useMonitoringMapStateStore = create<MonitoringMapStateStore>(
  (set) => ({
    status: 0,
    paddock: "All",
    piezo: "All",
    date: moment(Date.now()).format("YYYY-MM-DD"),
    piezoList: mapPiezoList["All"],

    piezometersData: [],
    sectionsList: [],
    lastReadings: [],

    changeStatus: (newStatus) =>
      set((state) => ({ ...state, status: newStatus, piezo: "All" })),

    changePaddock: (newPaddock) =>
      //@ts-ignore
      set((state) => ({
        ...state,
        paddock: newPaddock,
        piezo: "All",
        piezoList: mapPiezoList[`${newPaddock}`],
      })),

    changePiezo: (newPiezo) =>
      set((state) => ({ ...state, piezo: newPiezo, status: 0 })),

    changeDate: (newDate) => set((state) => ({ ...state, date: newDate })),

    //@ts-ignore
    selectPiezoFromTableRow: (obj) =>
      //@ts-ignore
      set((state) => ({
        ...state,
        paddock: obj.paddock,
        piezo: obj.piezo,
        status: obj.status,
        piezoList: mapPiezoList[obj.paddock],
      })),

    changePaddockAndPiezo: (newPaddock, newPiezo) =>
      set((state) => ({
        ...state,
        paddock: newPaddock,
        piezo: newPiezo,
        status: 0,
        piezoList: mapPiezoList[`${newPaddock}`],
      })),

    setPiezometersDataAndLastReadings: (fetchedData, fetchedLastReadings) => {
      set((state) => ({
        ...state,
        piezometersData: fetchedData,
        sectionsList: [
          ...new Set(fetchedData.map((piezometer) => piezometer.section)),
        ],
        lastReadings: fetchedLastReadings,
      }));
    },
  })
);
