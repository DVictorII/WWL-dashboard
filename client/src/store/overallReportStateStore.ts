import moment from "moment";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface OverallReportStateStore {
  reportStatus: string;
  date: string;
  reportID: string | undefined;
  changeReportID: (newID: string | undefined) => void;
  setReportStatus: (newReportStatus: string) => void;
  changeDate: (newDate: string) => void;

  resetReportStatus: () => void;
}

export const useOverallReportStateStore = create<OverallReportStateStore>(
  //@ts-ignore
  persist(
    (set, get) => ({
      reportStatus: "off",
      date: moment(Date.now()).format("YYYY-MM-DD"),
      reportID: undefined,
      setReportStatus: (newReportStatus: string) =>
        set({
          reportStatus: newReportStatus,
        }),

      changeDate: (newDate: string) =>
        set({
          date: newDate,
        }),

      changeReportID: (newID) =>
        set({
          reportID: newID,
        }),

      resetReportStatus: () =>
        set({
          reportID: undefined,
          reportStatus: "off",
        }),
    }),
    {
      name: "report-status",
      storage: createJSONStorage(() => sessionStorage),
    }
  )

  //   (set) => ({
  //     reportStatus: "off",

  //     setReportStatus: (newReportStatus) =>
  //       set((state) => ({
  //         ...state,
  //         reportStatus: newReportStatus,
  //       })),
  //   })
);
