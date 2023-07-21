import moment from "moment";
import { LastReadingsI, PiezometerDataI, ReportDetails } from "../types";
//@ts-ignore
import axios from "./axios";
import { Lecture } from "../store/NewPiezoReportStateStore";

//@ts-ignore
import { getInoperativeDates } from "./getInoperativeDates";

export const fetchSingleReport = async (id: string | undefined) => {
  const result = await axios.get(`/piezometer-reports/${id}`);
  return result.data.report as ReportDetails;
};

export const fetchPiezoReports = async () => {
  const result = await axios.get("/piezometer-reports");
  return result.data.reports;
};

export const fetchPiezometerData = async (obj: {
  paddock: string;
  piezo: string;
}) => {
  try {
    const result = await axios.get(
      `/piezometers-data/${obj.paddock}/${obj.piezo}`
    );

    return result.data.piezos[0];
  } catch (err) {
    console.log("ERROR1", err);
  }
};

export const fetchChartLectures = async (obj: {
  datalogger: string;
  channel: string;
  days: string | number;
}) => {
  try {
    const result = await axios.get(
      `/lectures/node_${obj.datalogger}_${obj.channel}/${obj.days}`
    );

    return result.data.lectures;
  } catch (err) {
    console.log(err);
  }
};

export const getAuthorfromID = async (id: number | string) => {
  try {
    const result = await axios.get(`/api/v1/user/${id}`);

    return result.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchReportLectures = async (
  datalogger: number,
  channel: number,
  days: number
) => {
  console.log("DATALOGGER", datalogger);
  console.log("CHANNEL", channel);
  const result = await axios.get(
    `/lectures/node_${datalogger}_${channel}/${days}`
  );

  if (!result) throw new Error();

  return result.data.lectures;
};

export const processLecturesData = (
  lecturesData: Lecture[],
  lastReadings: LastReadingsI[],
  currentPiezometer: PiezometerDataI | undefined
) => {
  const lecturesDates = lecturesData.map((lecture) => {
    return moment(lecture.time).format("YYYY-MM-DD HH:mm:ss");
  });

  //@ts-ignore
  const lecturesPressure = lecturesData.map((lecture) => {
    return lecture.pressure;
  });

  const inoperativeDates = getInoperativeDates(lecturesDates);

  //AÑADIR LAST READING!!
  const lastReading = lastReadings.find(
    (r) =>
      currentPiezometer?.datalogger === r.node &&
      currentPiezometer?.channel === r.channel
  );

  const maxLecture =
    lecturesData.length === 0
      ? 0
      : Number(Math.max(...lecturesPressure.map((l) => Number(l))).toFixed(3));
  const minLecture =
    lecturesData.length === 0
      ? 0
      : Number(Math.min(...lecturesPressure.map((l) => Number(l))).toFixed(3));

  const avgPWP =
    lecturesData.length === 0
      ? 0
      : Number(
          (
            lecturesPressure
              .map((p: string | undefined) => Number(p))
              .reduce((a: number, b: number) => a + b) / lecturesPressure.length
          ).toFixed(3)
        );

  return {
    lectures: lecturesData,
    inoperativeDates,
    lecturesAvg: avgPWP,
    lecturesMax: maxLecture,
    lecturesMin: minLecture,
    lastReading: {
      pressure: lastReading?.pressure,
      time: lastReading?.time,
    },
  };
};
