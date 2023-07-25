import React, { useEffect } from "react";
import { BsArrowDownUp } from "react-icons/bs";
import { monitoringMapStatusInfo } from "../../utils/monitoringMapStatusInfo";
import { useMonitoringMapStateStore } from "../../store/MonitoringMapStateStore";
import { useQuery } from "react-query";
import { fetchLastReadings, fetchPiezometersData } from "../../utils/map";
import Skeleton from "react-loading-skeleton";
import SkeletonPiezoListTable from "../Skeletons/MonitoringMap/SkeletonPiezoListTable";
import { PiezometerDataI } from "../../types";
import moment from "moment";

const options = {
  0: "All piezometers",
  1: "Active piezometers",
  2: "Damaged piezometers",
  3: "Disconnected piezometers",
  4: "Proposed piezometers",
  5: "TARPS",
};

function PiezoListTable() {
  const status = useMonitoringMapStateStore((s) => s.status);
  const lastReadings = useMonitoringMapStateStore((s) => s.lastReadings);
  const piezometersData = useMonitoringMapStateStore((s) => s.piezometersData);
  const section = useMonitoringMapStateStore((s) => s.section);

  //@ts-ignore
  const selectedStatus = monitoringMapStatusInfo[status];

  const paddock = useMonitoringMapStateStore((s) => s.paddock);
  const piezo = useMonitoringMapStateStore((s) => s.piezo);

  const changePaddockAndPiezo = useMonitoringMapStateStore(
    (s) => s.changePaddockAndPiezo
  );

  //@ts-ignore
  const filterPiezometers = (fullPiezoList) => {
    //@ts-ignore
    let filtered = [];

    console.log("PIEZO DATA", fullPiezoList);

    //@ts-ignore
    if (!fullPiezoList) return filtered;

    if (status === 5) {
      if (paddock === "All") {
        if (section === "All") {
          filtered = fullPiezoList.filter(
            (p: PiezometerDataI) => p.time_threshold_wrong != null
          );
        } else {
          filtered = fullPiezoList.filter(
            (p: PiezometerDataI) =>
              p.section == section && p.time_threshold_wrong != null
          );
        }
      } else {
        if (section === "All") {
          filtered = fullPiezoList.filter(
            (p: PiezometerDataI) =>
              p.time_threshold_wrong != null && p.paddock === paddock
          );
        } else {
          filtered = fullPiezoList.filter(
            (p: PiezometerDataI) =>
              p.section == section &&
              p.time_threshold_wrong != null &&
              p.paddock === paddock
          );
        }
      }
    } else if (status === 0 || status === 6) {
      if (paddock === "All") {
        if (section === "All") {
          filtered = fullPiezoList;
        } else {
          filtered = fullPiezoList.filter(
            (p: PiezometerDataI) => p.section == section
          );
        }
      } else {
        if (piezo === "All") {
          if (section === "All") {
            filtered = fullPiezoList.filter(
              (p: PiezometerDataI) => p.paddock === paddock
            );
          } else {
            filtered = fullPiezoList.filter(
              (p: PiezometerDataI) =>
                p.section == section && p.paddock === paddock
            );
          }
        } else {
          filtered = fullPiezoList.filter(
            (p: PiezometerDataI) => p.paddock === paddock && p.id === piezo
          );
        }
      }
    } else {
      if (paddock === "All") {
        if (section === "All") {
          filtered = fullPiezoList.filter(
            (p: PiezometerDataI) => p.status == status
          );
        } else {
          filtered = fullPiezoList.filter(
            (p: PiezometerDataI) => p.section == section && p.status == status
          );
        }
      } else {
        if (section === "All") {
          filtered = fullPiezoList.filter(
            (p: PiezometerDataI) => p.status == status && p.paddock === paddock
          );
        } else {
          filtered = fullPiezoList.filter(
            (p: PiezometerDataI) =>
              p.section == section &&
              p.status == status &&
              p.paddock === paddock
          );
        }
      }
    }

    return filtered;
  };

  const filteredPiezoList = filterPiezometers(piezometersData);

  if (!filteredPiezoList) return <SkeletonPiezoListTable />;

  return (
    <>
      <div className={`${status !== 6 ? "mt-8" : "mt-4"}`} />

      <div className="flex flex-col gap-y-1 2xl:gap-y-3">
        {status !== 6 && (
          <div className=" flex items-end md:items-center gap-x-8 md:gap-x-16 lg:gap-x-8">
            <div className="flex gap-x-3 md:flex-col lg:flex-row md:gap-y-2">
              {paddock !== "All" && (
                <div className="flex gap-x-3">
                  <span className="font-semibold text-sm sm:text-base  2xl:text-lg">
                    {paddock}
                  </span>
                  <span className="font-semibold text-sm sm:text-base  2xl:text-lg">
                    /
                  </span>
                </div>
              )}

              {section !== "All" && (
                <div className="flex gap-x-3">
                  <span className="font-semibold text-sm sm:text-base  2xl:text-lg">
                    {section}
                  </span>
                  <span className="font-semibold text-sm sm:text-base  2xl:text-lg">
                    /
                  </span>
                </div>
              )}

              <span className="font-semibold text-sm sm:text-base  2xl:text-lg">
                {/* @ts-ignore */}
                {options[status]}
              </span>
            </div>
            <span
              style={{
                //@ts-ignore
                color: monitoringMapStatusInfo[status].normalColor,
              }}
              className="text-xl sm:text-2xl lg:text-3xl font-semibold"
            >
              {filteredPiezoList.length}
            </span>
          </div>
        )}

        <div className=" max-w-full max-h-fit ">
          <div
            style={{
              borderColor: selectedStatus.darkColor,
            }}
            className={` overflow-y-scroll overflow-x-scroll h-fit max-h-96 mt-5 mb-4    pb-5  `}
          >
            <table className="min-w-max border-separate border-spacing-0">
              <thead className="">
                <th className="sticky top-0 text-center px-4 py-2 lg:px-8 lg:py-3 bg-white border-b border-[#999] ">
                  <div className="flex gap-x-2 justify-center items-center">
                    <span className="text-[11px] md:text-xs lg:text-sm ">
                      Piezo. ID
                    </span>
                    <BsArrowDownUp className="w-2 h-2 lg:w-3 lg:h-3" />
                  </div>
                </th>

                <th className="sticky top-0 text-center px-4 py-2 lg:px-8 lg:py-3 bg-white border-b border-[#999] ">
                  <div className="flex gap-x-2 justify-center items-center">
                    <span className="text-[11px] md:text-xs lg:text-sm ">
                      Paddock
                    </span>
                    <BsArrowDownUp className="w-2 h-2 lg:w-3 lg:h-3" />
                  </div>
                </th>

                <th className="sticky top-0 text-center px-4 py-2 lg:px-8 lg:py-3 bg-white border-b border-[#999] ">
                  <div className="flex gap-x-2 justify-center items-center">
                    <span className="text-[11px] md:text-xs lg:text-sm ">
                      Section
                    </span>
                    <BsArrowDownUp className="w-2 h-2 lg:w-3 lg:h-3" />
                  </div>
                </th>

                <th className="sticky top-0 text-center px-4 py-2 lg:px-8 lg:py-3 bg-white border-b border-[#999] ">
                  <div className="flex gap-x-2 justify-center items-center">
                    <span className="text-[11px] md:text-xs lg:text-sm ">
                      Current PWP
                    </span>
                    <BsArrowDownUp className="w-2 h-2 lg:w-3 lg:h-3" />
                  </div>
                </th>

                {status === 5 && (
                  <th className="sticky top-0 text-center px-4 py-2 lg:px-8 lg:py-3 bg-white border-b border-[#999] ">
                    <div className="flex gap-x-2 justify-center items-center">
                      <span className="text-[11px] md:text-xs lg:text-sm ">
                        Initial flood date
                      </span>
                      <BsArrowDownUp className="w-2 h-2 lg:w-3 lg:h-3" />
                    </div>
                  </th>
                )}

                <th className="sticky top-0 text-center px-4 py-2 lg:px-8 lg:py-3 bg-white border-b border-[#999] ">
                  <div className="flex gap-x-2 justify-center items-center">
                    <span className="text-[11px] md:text-xs lg:text-sm ">
                      Depth
                    </span>
                    <BsArrowDownUp className="w-2 h-2 lg:w-3 lg:h-3" />
                  </div>
                </th>

                <th className="sticky top-0 text-center px-4 py-2 lg:px-8 lg:py-3 bg-white border-b border-[#999] ">
                  <div className="flex gap-x-2 justify-center items-center">
                    <span className="text-[11px] md:text-xs lg:text-sm ">
                      Status
                    </span>
                    <BsArrowDownUp className="w-2 h-2 lg:w-3 lg:h-3" />
                  </div>
                </th>

                <th className="sticky top-0 text-center px-4 py-2 lg:px-8 lg:py-3 bg-white border-b border-[#999] ">
                  <div className="flex gap-x-2 justify-center items-center">
                    <span className="text-[11px] md:text-xs lg:text-sm ">
                      Coordinates
                    </span>
                    <BsArrowDownUp className="w-2 h-2 lg:w-3 lg:h-3" />
                  </div>
                </th>
              </thead>

              <tbody className="bg-white text-[#444]">
                {
                  //@ts-ignore
                  filteredPiezoList.map((piezometer, i) => {
                    const lastReading = lastReadings.find(
                      //@ts-ignore
                      (reading) =>
                        reading.node === piezometer.datalogger &&
                        reading.channel === piezometer.channel
                    );

                    const lastReadingExists =
                      lastReading &&
                      lastReading.pressure &&
                      Number(lastReading.pressure);

                    const depthIsZero = Number(piezometer.depth) == 0;

                    return (
                      <tr
                        style={{
                          backgroundColor:
                            i % 2 === 0 ? selectedStatus.lightColor : "#fff",
                        }}
                        key={piezometer.id}
                      >
                        <td className="px-4 py-2 lg:px-8 lg:py-3">
                          <button
                            style={{
                              color:
                                //@ts-ignore
                                monitoringMapStatusInfo[piezometer.status]
                                  .normalColor,
                            }}
                            onClick={() => {
                              changePaddockAndPiezo(
                                piezometer.paddock,
                                piezometer.id
                              );
                            }}
                            className={`text-[9px] md:text-[10px] lg:text-[11px] flex justify-center w-full items-center font-bold  hover:scale-105 transition-all`}
                          >
                            {piezometer.id}
                          </button>
                        </td>

                        <td className="px-4 py-2 lg:px-8 lg:py-3">
                          <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-semibold">
                            {piezometer.paddock}
                          </span>
                        </td>

                        <td className="px-4 py-2 lg:px-8 lg:py-3">
                          <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-semibold">
                            {piezometer.section}
                          </span>
                        </td>

                        <td className="px-4 py-2 lg:px-8 lg:py-3">
                          <span
                            className={`${
                              lastReadingExists
                                ? "text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-semibold"
                                : "text-2xl flex justify-center items-center font-semibold"
                            }`}
                          >
                            {lastReadingExists
                              ? `${Number(lastReading.pressure).toFixed(3)} Kpa`
                              : "-"}
                          </span>
                        </td>

                        {status === 5 && (
                          <td className="px-4 py-2 lg:px-8 lg:py-3">
                            <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-semibold">
                              {moment(piezometer.time_threshold_wrong).format(
                                "YYYY-MM-DD HH:mm:ss"
                              )}
                            </span>
                          </td>
                        )}

                        <td className="px-4 py-2 lg:px-8 lg:py-3">
                          <span
                            className={`${
                              depthIsZero
                                ? "text-2xl flex justify-center items-center font-semibold"
                                : "text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-semibold"
                            }`}
                          >
                            {depthIsZero
                              ? "-"
                              : `${Number(piezometer.depth).toFixed(2)} m`}{" "}
                          </span>
                        </td>

                        <td className="px-4 py-2 lg:px-8 lg:py-3">
                          <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-semibold">
                            {/* @ts-ignore */}
                            {monitoringMapStatusInfo[piezometer.status].name}
                          </span>
                        </td>

                        <td className="px-4 py-2 lg:px-8 lg:py-3">
                          <div className="flex flex-col gap-y-1">
                            <span className="text-[9px] md:text-[10px] lg:text-[11px] font-semibold">
                              {piezometer.lat},
                            </span>
                            <span className="text-[9px] md:text-[10px] lg:text-[11px] font-semibold">
                              {piezometer.lon}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default PiezoListTable;
