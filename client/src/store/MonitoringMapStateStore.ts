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
  section: string;

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

  selectSection: (newSection: string) => void;
}

export const useMonitoringMapStateStore = create<MonitoringMapStateStore>(
  (set) => ({
    status: 0,
    paddock: "All",
    piezo: "All",
    date: moment(Date.now()).format("YYYY-MM-DD"),
    piezoList: mapPiezoList["All"],

    section: "All",

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
        //@ts-ignore
        piezoList: mapPiezoList[`${newPaddock}`],

        sectionsList: [
          "All",
          ...new Set(
            state.piezometersData
              .filter((piezometer) =>
                newPaddock === "All" ? true : piezometer.paddock === newPaddock
              )
              .map((piezometer) => String(piezometer.section))
          ),
        ],

        section: "All",
      })),

    changePiezo: (newPiezo) =>
      set((state) => ({
        ...state,
        piezo: newPiezo,
        status: 0,
        section: "All",
      })),

    changeDate: (newDate) => set((state) => ({ ...state, date: newDate })),

    //@ts-ignore
    selectPiezoFromTableRow: (obj) =>
      set((state) => ({
        ...state,
        paddock: obj.paddock,
        piezo: obj.piezo,
        status: obj.status,
        //@ts-ignore
        piezoList: mapPiezoList[obj.paddock],
      })),

    changePaddockAndPiezo: (newPaddock, newPiezo) =>
      set((state) => ({
        ...state,
        paddock: newPaddock,
        piezo: newPiezo,
        status: 0,
        //@ts-ignore
        piezoList: mapPiezoList[`${newPaddock}`],
      })),

    setPiezometersDataAndLastReadings: (fetchedData, fetchedLastReadings) => {
      set((state) => ({
        ...state,
        piezometersData: fetchedData.map((data) =>
          data.section == null ? { ...data, section: "?" } : data
        ),
        sectionsList: [
          "All",
          ...new Set(
            fetchedData
              .map((data) =>
                data.section == null ? { ...data, section: "?" } : data
              )
              .map((piezometer) => String(piezometer.section))
          ),
        ],
        lastReadings: fetchedLastReadings,
      }));
    },

    selectSection: (newSection) =>
      set((state) => ({
        ...state,
        section: newSection,
        piezo: "All",
      })),
  })
);
