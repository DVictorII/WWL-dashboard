// const values = [
//   "2020-06-05 13:20:01",
//   "2020-06-05 17:00:00",
//   "2020-06-08 13:00:00",
//   "2020-06-15 13:00:00",
// ];

import moment from "moment";

export const getInoperativeDates = (values) => {
  const inoperativeDates = [];

  [...values, moment(Date.now()).format("YYYY-MM-DD")].map((date, i) => {
    if (i === 0) return date;

    const intervalInDays = Math.round(
      (new Date(values[i]) - new Date(values[i - 1])) / (1000 * 60 * 60 * 24)
    );

    if (intervalInDays > 1) {
      inoperativeDates.push({
        currentDate: values[i - 1],
        nextDate: values[i],
        inoperativeDays: String(intervalInDays).padStart(2, "0"),
      });
    }
  });

  return inoperativeDates;
};
