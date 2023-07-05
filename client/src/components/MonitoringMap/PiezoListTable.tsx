import React from "react";
import { BsArrowDownUp } from "react-icons/bs";
import { monitoringMapStatusInfo } from "../../utils/monitoringMapStatusInfo";
import { useMonitoringMapStateStore } from "../../store/MonitoringMapStateStore";
import { useQuery } from "react-query";
import { fetchLastReadings, fetchPiezometersData } from "../../utils/map";
import Skeleton from "react-loading-skeleton";
import SkeletonPiezoListTable from "../Skeletons/MonitoringMap/SkeletonPiezoListTable";

function PiezoListTable() {
  const status = useMonitoringMapStateStore((s) => s.status);
  //@ts-ignore
  const selectedStatus = monitoringMapStatusInfo[status];

  const paddock = useMonitoringMapStateStore((s) => s.paddock);
  const piezo = useMonitoringMapStateStore((s) => s.piezo);

  const { isLoading: piezometersAreLoading, data: piezometersData } = useQuery(
    "piezometers",
    fetchPiezometersData,
    {
      refetchOnWindowFocus: false,
    }
  );

  const { isLoading: lastReadingsAreLoading, data: lastReadings } = useQuery(
    "last_readings",
    fetchLastReadings,
    {
      refetchOnWindowFocus: false,
    }
  );

  //@ts-ignore
  const filterPiezometers = (fullPiezoList) => {
    let filtered = [];

    if (status === 0 || status === 6) {
      if (paddock === "All") {
        filtered = fullPiezoList;
      } else {
        if (piezo === "All") {
          //@ts-ignore
          filtered = fullPiezoList.filter((p) => p.paddock === paddock);
        } else {
          filtered = fullPiezoList.filter(
            //@ts-ignore
            (p) => p.paddock === paddock && p.id === piezo
          );
        }
      }
    } else {
      if (paddock === "All") {
        //@ts-ignore
        filtered = fullPiezoList.filter((p) => p.status == status);
      } else {
        filtered = fullPiezoList.filter(
          //@ts-ignore
          (p) => p.status == status && p.paddock === paddock
        );
      }
    }

    return filtered;
  };

  const filteredPiezoList = filterPiezometers(piezometersData);

  if (piezometersAreLoading || !filteredPiezoList || lastReadingsAreLoading)
    return <SkeletonPiezoListTable />;

  return (
    <div className=" max-w-full max-h-fit ">
      <div
        style={{
          borderColor: selectedStatus.darkColor,
        }}
        className={` overflow-y-scroll overflow-x-scroll h-fit max-h-96 mt-5 mb-4 mx-4 md:mx-0  pb-5  `}
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

                const lastReadingExists = lastReading && lastReading.pressure;

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
                      <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center">
                        {piezometer.id}
                      </span>
                    </td>

                    <td className="px-4 py-2 lg:px-8 lg:py-3">
                      <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center">
                        {piezometer.paddock}
                      </span>
                    </td>

                    <td className="px-4 py-2 lg:px-8 lg:py-3">
                      <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center">
                        {piezometer.section}
                      </span>
                    </td>

                    <td className="px-4 py-2 lg:px-8 lg:py-3">
                      <span
                        className={`${
                          lastReadingExists
                            ? "text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center"
                            : "text-2xl flex justify-center items-center"
                        }`}
                      >
                        {lastReadingExists
                          ? `${Number(lastReading.pressure).toFixed(3)} Kpa`
                          : "-"}
                      </span>
                    </td>

                    <td className="px-4 py-2 lg:px-8 lg:py-3">
                      <span
                        className={`${
                          depthIsZero
                            ? "text-2xl flex justify-center items-center"
                            : "text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center"
                        }`}
                      >
                        {depthIsZero
                          ? "-"
                          : `${Number(piezometer.depth).toFixed(2)} m`}{" "}
                      </span>
                    </td>

                    <td className="px-4 py-2 lg:px-8 lg:py-3">
                      <div className="flex flex-col gap-y-1">
                        <span className="text-[9px] md:text-[10px] lg:text-[11px]">
                          {piezometer.lat},
                        </span>
                        <span className="text-[9px] md:text-[10px] lg:text-[11px]">
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
  );
}

export default PiezoListTable;
