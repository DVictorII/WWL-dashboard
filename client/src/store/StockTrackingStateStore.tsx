import { create } from "zustand";

interface StockTrackingStateStore {
  daysSpan: number;
  changeDaysSpan: (newDaysSpan: number) => void;
}

export const useStockTrackingStateStore = create<StockTrackingStateStore>(
  (set) => ({
    daysSpan: 5,

    changeDaysSpan: (newDaysSpan) => {
      return set((state) => ({ ...state, daysSpan: newDaysSpan }));
    },
  })
);
