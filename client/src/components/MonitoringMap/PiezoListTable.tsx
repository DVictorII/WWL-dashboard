import React from "react";
import { BsArrowDownUp } from "react-icons/bs";
import { monitoringMapStatusInfo } from "../../utils/monitoringMapStatusInfo";
import { useMonitoringMapStateStore } from "../../store/MonitoringMapStateStore";
import { useQuery } from "react-query";
import { fetchLastReadings, fetchPiezometersData } from "../../utils/map";
import Skeleton from "react-loading-skeleton";
import SkeletonPiezoListTable from "../Skeletons/MonitoringMap/SkeletonPiezoListTable";
import "../../table.css";

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
    <div className="outer-wrapper">
      <div
        style={{
          borderColor: selectedStatus.darkColor,
        }}
        className={`table-wrapper `}
      >
        <table>
          <thead>
            <th>
              <span className="text-[11px] md:text-xs">Piezo. ID</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th>
              <span className="text-[11px] md:text-xs">Paddock</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th>
              <span className="text-[11px] md:text-xs">Section</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th>
              <span className="text-[11px] md:text-xs">Current PWP</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th>
              <span className="text-[11px] md:text-xs">Depth</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th>
              <span className="text-[11px] md:text-xs">Coordinates</span>
              <BsArrowDownUp className="w-2" />
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
                    <td>
                      <span className="text-[9px] md:text-[10px]">
                        {piezometer.id}
                      </span>
                    </td>

                    <td>
                      <span className="text-[9px] md:text-[10px]">
                        {piezometer.paddock}
                      </span>
                    </td>

                    <td>
                      <span className="text-[9px] md:text-[10px]">
                        {piezometer.section}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`${
                          lastReadingExists
                            ? "text-[9px] md:text-[10px]"
                            : "text-2xl"
                        }`}
                      >
                        {lastReadingExists
                          ? `${Number(lastReading.pressure).toFixed(3)} Kpa`
                          : "-"}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`${
                          depthIsZero ? "text-2xl" : "text-[9px] md:text-[10px]"
                        }`}
                      >
                        {depthIsZero
                          ? "-"
                          : `${Number(piezometer.depth).toFixed(2)} m`}{" "}
                      </span>
                    </td>

                    <td>
                      <span className="text-[9px] md:text-[10px]">
                        {piezometer.lat},
                      </span>
                      <span className="text-[9px] md:text-[10px]">
                        {piezometer.lon}
                      </span>
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
