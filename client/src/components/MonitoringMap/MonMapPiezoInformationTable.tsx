import React from "react";
import { useMonitoringMapStateStore } from "../../store/MonitoringMapStateStore";
import { useQuery } from "react-query";
import { fetchPiezometerData } from "../../utils/map";
import SkeletonPiezoInformationTable from "../Skeletons/PiezometerLectures/SkeletonPiezoInformationTable";
import {
  capitalizeName,
  monitoringMapStatusInfo,
} from "../../utils/monitoringMapStatusInfo";
import { AiOutlineLineChart } from "react-icons/ai";
import { usePiezometerLecturesStateStore } from "../../store/PiezometerLecturesStateStore";
import { useNavigate } from "react-router-dom";

function MonMapPiezoInformationTable() {
  const paddock = useMonitoringMapStateStore((s) => s.paddock);
  const piezo = useMonitoringMapStateStore((s) => s.piezo);
  const status = useMonitoringMapStateStore((s) => s.status);

  const lastReadings = useMonitoringMapStateStore((s) => s.lastReadings);

  const changeChartPaddockAndPiezo = usePiezometerLecturesStateStore(
    (state) => state.changePaddockAndPiezo
  );

  const navigate = useNavigate();

  //@ts-ignore
  const goToLectures = (paddock, piezo) => {
    changeChartPaddockAndPiezo(paddock, piezo);

    navigate("/operations/piezometer-readings");
  };

  const { isLoading: piezometersAreLoading, data: piezometersData } = useQuery({
    queryKey: [`Onepiezometer_${paddock}_${piezo}`],
    queryFn: () =>
      fetchPiezometerData({
        paddock: paddock.replaceAll("/", "-"),
        piezo: piezo,
      }),
    refetchOnWindowFocus: false,
  });

  if (piezometersAreLoading)
    return <SkeletonPiezoInformationTable monitoringMap />;

  const lastReading = lastReadings?.find(
    //@ts-ignore
    (reading) =>
      reading.node === piezometersData[0].datalogger &&
      reading.channel === piezometersData[0].channel
  );

  const lastReadingExists =
    lastReading && lastReading.pressure && Number(lastReading.pressure);

  const depthIsZero = Number(piezometersData[0].depth) == 0;

  //@ts-ignore
  const statusStateObj = monitoringMapStatusInfo[piezometersData[0].status];

  return (
    <>
      {status !== 6 && <div className="mt-8" />}
      <div className="flex flex-col gap-y-6">
        <div className=" flex items-center gap-x-3">
          {/* @ts-ignore */}
          <span className="font-semibold  lg:text-lg">{paddock}</span>
          <span className="font-semibold  lg:text-lg">/</span>
          <span
            style={{
              //@ts-ignore
              color: statusStateObj.normalColor,
            }}
            className="font-semibold  lg:text-lg"
          >
            {piezo}
          </span>
        </div>

        <div
          style={{
            borderColor: statusStateObj.darkColor,
          }}
          className="max-w-[1000vh] h-[19rem] overflow-x-auto rounded-lg border-2  relative bg-white"
        >
          <table className="   select-none w-full border-collapse  bg-white">
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
                    {Number(piezometersData[0].lat).toFixed(6)}° /{" "}
                    {Number(piezometersData[0].lon).toFixed(6)}°
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
                  {/* @ts-ignore */}
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
          />
        </div>
      </div>

      {status !== 6 && piezometersData[0].status !== 4 && (
        <>
          <div className="mt-6" />

          <button
            style={{
              color: statusStateObj.normalColor,
            }}
            onClick={() => goToLectures(paddock, piezo)}
            className="flex w-max items-center gap-x-2"
          >
            <AiOutlineLineChart className="w-5 h-5" />

            <span className="text-sm font-semibold">Check piezo. readings</span>
          </button>
        </>
      )}
    </>
  );
}

export default MonMapPiezoInformationTable;
