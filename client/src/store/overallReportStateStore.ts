import moment from "moment";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface OverallReportStateStore {
  reportStatus: string;
  date: string;
  setReportStatus: (newReportStatus: string) => void;
  changeDate: (newDate: string) => void;
}

export const useOverallReportStateStore = create<OverallReportStateStore>(
  //@ts-ignore
  persist(
    (set, get) => ({
      reportStatus: "off",
      date: moment(Date.now()).format("YYYY-MM-DD"),
      setReportStatus: (newReportStatus: string) =>
        set({
          reportStatus: newReportStatus,
        }),

      changeDate: (newDate: string) =>
        set({
          date: newDate,
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
