import React from "react";
import { BsArrowDownUp } from "react-icons/bs";
import { usePiezometerLecturesStateStore } from "../../store/PiezometerLecturesStateStore";
import { useQuery } from "react-query";
import { fetchLastReadings, fetchPiezometerData } from "../../utils/map";
import { FadeLoader } from "react-spinners";
import { monitoringMapStatusInfo } from "../../utils/monitoringMapStatusInfo";
import { capitalizeName } from "../../utils/monitoringMapStatusInfo";
import { useLocation } from "react-router-dom";
import { useNewPiezoReportStateStore } from "../../store/NewPiezoReportStateStore";

function PiezoInformationTable() {
  const location = useLocation().pathname

  const paddock = location === "/piezometer-lectures" ? usePiezometerLecturesStateStore((s) => s.paddock):  useNewPiezoReportStateStore((state) => state.paddock);
  const piezo =  location === "/piezometer-lectures" ? usePiezometerLecturesStateStore((s) => s.piezo):  useNewPiezoReportStateStore((state) => state.piezo);

  const { isLoading: piezometersAreLoading, data: piezometersData } = useQuery({
    queryKey: [`Onepiezometer_${paddock}_${piezo}`],
    queryFn: () =>
      fetchPiezometerData({
        paddock: paddock,
        piezo: piezo,
      }),
    refetchOnWindowFocus: false,
  });

  const { isLoading: lastReadingsAreLoading, data: lastReadings } = useQuery(
    "last_readings",
    fetchLastReadings,
    {
      refetchOnWindowFocus: false,
    }
  );

  if(piezometersAreLoading|| lastReadingsAreLoading) return (
    <div className="w-full h-full flex items-center justify-center">
              <FadeLoader
                color="#BD9C45"
                loading={piezometersAreLoading || lastReadingsAreLoading}
                radius={50}
              />
    </div>
  )

  const lastReading = lastReadings?.find(
    //@ts-ignore
    (reading) =>
      reading.node === piezometersData[0].datalogger &&
      reading.channel === piezometersData[0].channel
  );

  const lastReadingExists = lastReading && lastReading.pressure;

  const depthIsZero = Number(piezometersData[0].depth) == 0;

  //@ts-ignore
  const statusStateObj = monitoringMapStatusInfo[piezometersData[0].status]

  return (
    <div style={{
      borderColor: statusStateObj.darkColor
    }} className="max-w-[1000vh] h-[19rem] overflow-x-auto rounded-lg border-2  relative bg-white">
      <table className="   select-none w-full border-collapse  bg-white">
        <tbody>
          <tr style={{
            backgroundColor: statusStateObj.lightColor
          }} className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12   ">
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold text-[11px]">
              <span >Location coordinates:</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <span>{Number(piezometersData[0].lat).toFixed(8)}° / {Number(piezometersData[0].lon).toFixed(8)}°</span>
            </th>
          </tr>

          <tr className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12 bg-white ">
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold text-[11px]">
              <span>Section:</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <span>{piezometersData[0].section}</span>
            </th>
          </tr>

          <tr style={{
            backgroundColor: statusStateObj.lightColor
          }} className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12  ">
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold text-[11px]">
              <span>Depth:</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <span className={`${depthIsZero ? "text-2xl" : ""}`}>{depthIsZero
                        ? "-"
                        : `${Number(piezometersData[0].depth).toFixed(2)} m`}</span>
            </th>
          </tr>

          <tr className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12 bg-white ">
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold text-[11px]">
              <span>Status:</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              {/* @ts-ignore */}
              <span>{capitalizeName(statusStateObj.name)}</span>
            </th>
          </tr>

          <tr style={{
            backgroundColor: statusStateObj.lightColor
          }} className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12  ">
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold text-[11px]">
              <span>Current PWP</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <span className={`${lastReadingExists ? "" : "text-2xl"}`}> {lastReadingExists
                        ? `${Number(lastReading.pressure).toFixed(3)} Kpa`
                        : "-"}</span>
            </th>
          </tr>

          <tr className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12 bg-white ">
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold  text-[11px]">
              <span>Last reading at:</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <span className={`${lastReadingExists ? "" : "text-2xl"}`}> 
              {lastReadingExists
                        ? lastReading.time
                        : "-"}
              </span>
            </th>
          </tr>
        </tbody>
      </table>
      <div  style={{
            backgroundColor: statusStateObj.lightColor
          }} className="absolute top-0 left-1/2 w-[2px] h-[19rem] " />
    </div>
  );
}

export default PiezoInformationTable;
