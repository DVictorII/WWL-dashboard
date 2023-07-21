import React, { useEffect } from "react";
import { useQuery } from "react-query";

import { FadeLoader } from "react-spinners";
import { fetchLastReadings, fetchPiezometerData } from "../../../utils/map";
import {
  capitalizeName,
  monitoringMapStatusInfo,
} from "../../../utils/monitoringMapStatusInfo";
import SkeletonPiezoInformationTable from "../../Skeletons/PiezometerLectures/SkeletonPiezoInformationTable";
import { useLocation } from "react-router-dom";
import {
  Lecture,
  useNewPiezoReportStateStore,
} from "../../../store/NewPiezoReportStateStore";
import { useMonitoringMapStateStore } from "../../../store/MonitoringMapStateStore";
import axios from "../../../utils/axios";
import moment from "moment";

//@ts-ignore
import { getInoperativeDates } from "../../../utils/getInoperativeDates";
import {
  fetchReportLectures,
  processLecturesData,
} from "../../../utils/reportsFetchFunctions";

function ReportPiezoInformationTable() {
  const location = useLocation().pathname;

  const paddock = useNewPiezoReportStateStore(
    (state) => state.paddock
  ).replaceAll("/", "-");
  const piezo = useNewPiezoReportStateStore((state) => state.piezo);
  const timeSpan = useNewPiezoReportStateStore((state) => state.timeSpan);

  const DAYS_SPAN =
    timeSpan === "weekly" ? 7 : timeSpan === "monthly" ? 31 : 92;

  const piezometersData = useMonitoringMapStateStore((s) => s.piezometersData);
  const lastReadings = useMonitoringMapStateStore((s) => s.lastReadings);

  const setLecturesInformation = useNewPiezoReportStateStore(
    (state) => state.setLecturesInformation
  );

  const lecturesInformation = useNewPiezoReportStateStore(
    (state) => state.lecturesInformation
  );

  const currentPiezometer = piezometersData.find(
    (p) => p.paddock === paddock && p.id === piezo
  );

  // const lastReading = lastReadings?.find(
  //   //@ts-ignore
  //   (reading) =>
  //     reading.node === piezometersData[0].datalogger &&
  //     reading.channel === piezometersData[0].channel
  // );

  // const lastReadingExists =
  //   lastReading && lastReading.pressure && Number(lastReading.pressure);

  // const depthIsZero = Number(piezometersData[0].depth) == 0;

  // //@ts-ignore
  // const statusStateObj = monitoringMapStatusInfo[piezometersData[0].status];

  return (
    <div
      style={
        {
          // borderColor: statusStateObj.darkColor,
        }
      }
      className="max-w-[1000vh] h-[19rem] overflow-x-auto rounded-lg border-2  relative bg-white"
    >
      {/* <table className="   select-none w-full border-collapse  bg-white">
        <tbody>
          <tr
            style={{
              backgroundColor: statusStateObj.lightColor,
            }}
            className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12   "
          >
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold text-[11px]">
              <span>Location coordinates:</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <span>
                {Number(piezometersData[0].lat).toFixed(8)}° /{" "}
                {Number(piezometersData[0].lon).toFixed(8)}°
              </span>
            </th>
          </tr>

          <tr className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12 bg-white ">
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold text-[11px]">
              <span>Section:</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <span
                className={`${
                  piezometersData[0].section &&
                  piezometersData[0].section !== "?" &&
                  piezometersData[0].section !== "None"
                    ? ""
                    : "text-xl"
                }`}
              >
                {piezometersData[0].section &&
                piezometersData[0].section !== "?" &&
                piezometersData[0].section !== "None"
                  ? piezometersData[0].section
                  : "-"}
              </span>
            </th>
          </tr>

          <tr
            style={{
              backgroundColor: statusStateObj.lightColor,
            }}
            className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12  "
          >
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold text-[11px]">
              <span>Depth:</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <span className={`${depthIsZero ? "text-xl" : ""}`}>
                {depthIsZero
                  ? "-"
                  : `${Number(piezometersData[0].depth).toFixed(2)} m`}
              </span>
            </th>
          </tr>

          <tr className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12 bg-white ">
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold text-[11px]">
              <span>Status:</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              
              <span>{capitalizeName(statusStateObj.name)}</span>
            </th>
          </tr>

          <tr
            style={{
              backgroundColor: statusStateObj.lightColor,
            }}
            className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12  "
          >
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold text-[11px]">
              <span>Current PWP</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <span className={`${lastReadingExists ? "" : "text-xl"}`}>
                {" "}
                {lastReadingExists
                  ? `${Number(lastReading.pressure).toFixed(3)} Kpa`
                  : "-"}
              </span>
            </th>
          </tr>

          <tr className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12 bg-white ">
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold  text-[11px]">
              <span>Last reading at:</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <span className={`${lastReadingExists ? "" : "text-xl"}`}>
                {lastReadingExists ? lastReading.time : "-"}
              </span>
            </th>
          </tr>
        </tbody>
      </table>
      <div
        style={{
          backgroundColor: statusStateObj.lightColor,
        }}
        className="absolute top-0 left-1/2 w-[2px] h-[19rem] "
      /> */}
    </div>
  );
}

export default ReportPiezoInformationTable;
