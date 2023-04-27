
import { ReportDetails } from "../types";
//@ts-ignore
import axios from "./axios";

export const fetchSingleReport = async (id: string | undefined) => {
  const result = await axios.get(`/piezometer-reports/${id}`);
  return result.data.report as ReportDetails;
};

export const fetchPiezoReports = async () => {
  const result = await axios.get("/piezometer-reports");
  return result.data.reports;
};

export const fetchPiezometerData = async (obj:{paddock:string, piezo:string}) => {
    try {
      const result = await axios.get(
        `/piezometers-data/${obj.paddock}/${obj.piezo}`
      );

      return result.data.piezos[0];
    } catch (err) {
      console.log("ERROR1", err);
    }
  };

export  const fetchChartLectures = async (obj:{datalogger:string, channel:string, days:string| number}) => {
    try {
      const result = await axios.get(
        `/lectures/node_${obj.datalogger}_${obj.channel}/${obj.days}`
      );

      return result.data.lectures;
    } catch (err) {
      console.log(err);
    }
  };


export const getAuthorfromID = async(id: number | string)=>{
  try{
    const result = await axios.get(
      `/api/v1/user/${id}`
    )

    return result.data;
  }catch (err) {
    console.log(err);
  }
}