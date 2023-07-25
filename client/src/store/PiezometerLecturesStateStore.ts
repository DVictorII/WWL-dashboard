import { LastReadingsI, PiezometerDataI } from "../types";
import { chartPiezoList } from "./../utils/piezoList";
import { create } from "zustand";

interface PiezometerLecturesStateStore {
  paddock: string;
  piezo: string;
  days: number;
  piezoList: string[];
  chartType: string;
  section:string;
  piezometersData: PiezometerDataI[];
  sectionsList: string[];
  lastReadings: LastReadingsI[];

  changePaddock: (newPaddock: string) => void;
  changePiezo: (newPiezo: string) => void;
  changeDays: (newDays: number) => void;
  changeChartType: (newChartType: string) => void;

  changePaddockAndPiezo: (newPaddock: string, newPiezo: string) => void;
  selectSection: (newSection: string) => void;

  setPiezometersDataAndLastReadings: (
    fetchedData: PiezometerDataI[],
    fetchedLastReadings: LastReadingsI[]
  ) => void;
  
}

export const usePiezometerLecturesStateStore =
  create<PiezometerLecturesStateStore>((set) => ({
    paddock: "CDIII",
    piezo: chartPiezoList["CDIII"][0],
    days: 15,
    piezoList: chartPiezoList["CDIII"],
    chartType: "pressure",
    section: "All",

    piezometersData: [],
    sectionsList: [],
    lastReadings: [],

    changePaddock: (newPaddock) =>
      //@ts-ignore
      set((state) => ({
        ...state,
        paddock: newPaddock,
        //@ts-ignore
        piezo: chartPiezoList[newPaddock][0],
        //@ts-ignore
        piezoList: chartPiezoList[newPaddock],

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

        //@ts-ignore
        section: state.piezometersData.find((p)=>p.id === chartPiezoList[newPaddock][0])?.section,
      })),

    changePiezo: (newPiezo) => set((state) => ({
      ...state,
      paddock: state.piezometersData.find((p)=>p.id === newPiezo)?.paddock,
      piezo: newPiezo,
      section:  state.piezometersData.find((p)=>p.id === newPiezo)?.section,
    })),

    changeDays: (newDays) => set((state) => ({ ...state, days: newDays })),
    changeChartType: (newChartType) =>
      set((state) => ({ ...state, chartType: newChartType })),

    changePaddockAndPiezo: (newPaddock, newPiezo) =>
      set((state) => ({
        ...state,
        paddock: newPaddock,
        //@ts-ignore
        piezo: newPiezo,
        section:  state.piezometersData.find((p)=>p.id === newPiezo)?.section,
        //@ts-ignore
        piezoList: chartPiezoList[newPaddock],
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
          //@ts-ignore
          section: fetchedData.find((p)=>p.id === chartPiezoList[state.paddock][0])?.section
        }));
      },

    selectSection: (newSection) =>{

      if(newSection === "All"){

      return set((state) => ({
       ...state,
       section: newSection,
       piezo: state.piezometersData.filter(piezoObj=> piezoObj.paddock === state.paddock )[0].id

     }))
    } else if (newSection === "?"){
      return set((state) => ({
        ...state,
        section: newSection,
       piezo: state.piezometersData.filter(piezoObj=> (!piezoObj.section ||
        piezoObj.section === "?" ||
        piezoObj.section === "None") &&
      piezoObj.paddock === state.paddock )[0].id
      }))
    } else {
      
      return set((state) => ({
        ...state,
        section: newSection,
        piezo: state.piezometersData.filter(piezoObj=> piezoObj.paddock === state.paddock && piezoObj.section === newSection )[0].id
 
      }))
    }
    }
  }));
