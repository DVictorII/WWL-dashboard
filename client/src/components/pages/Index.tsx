import MenuNavbar from "../MenuNavbar";

import MapWrapper from "../MapWrapper";

import IncidentMapMultiple from "../Incidents/IncidentMapMultiple";

import PiezoListTable from "../MonitoringMap/PiezoListTable";
import PiezoFilterComp from "../MonitoringMap/MapFiltering/PiezoFilterComp";

import { useMonitoringMapStateStore } from "../../store/MonitoringMapStateStore";

import { monitoringMapStatusInfo } from "../../utils/monitoringMapStatusInfo";

import MonMapPiezoInformationTable from "../MonitoringMap/MonMapPiezoInformationTable";
import { PiezometerDataI } from "../../types";
import SkeletonPiezoListTable from "../Skeletons/MonitoringMap/SkeletonPiezoListTable";

interface GlobalMapState {
  status: string | number;
  paddock: string;
  piezo: string;
  date: string;
}

const Index = () => {
  const status = useMonitoringMapStateStore((s) => s.status);
  const paddock = useMonitoringMapStateStore((s) => s.paddock);
  const piezo = useMonitoringMapStateStore((s) => s.piezo);
  const date = useMonitoringMapStateStore((s) => s.date);

  const section = useMonitoringMapStateStore((s) => s.section);

  const piezometersData = useMonitoringMapStateStore((s) => s.piezometersData);
  //@ts-ignore
  const filterPiezometers = (fullPiezoList) => {
    //@ts-ignore
    let filtered = [];

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

  //@ts-ignore
  const selectedStatus = monitoringMapStatusInfo[status];

  return (
    <>
      <MenuNavbar />

      <div className="mt-12 md:hidden" />

      <div className="flex items-center justify-between gap-x-8 gap-y-8 flex-wrap bg-white p-4 rounded-xl shadow-sm">
        <h1 className="flex flex-col gap-y-1 ">
          <span className="font-bold xl:text-lg">
            Operations - Monitoring Map
          </span>
          <span className="text-xs xl:text-sm font-semibold text-[#666]">
            ({piezometersData.length} Piezometers)
          </span>
        </h1>
      </div>

      <div className="mt-12" />

      <div className="  flex flex-col gap-y-8  ">
        <PiezoFilterComp />

        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 gap-y-8">
          <div className="flex flex-col  bg-white p-4 2xl:p-6 rounded-xl shadow-sm">
            <h2 className="font-semibold text-[#555] ">Piezometers Overview</h2>

            {paddock !== "All" && piezo !== "All" ? (
              <MonMapPiezoInformationTable />
            ) : (
              <>
                {filteredPiezoList ? (
                  <div
                    key={`${paddock}${piezo}${section}${status}${JSON.stringify(
                      filteredPiezoList
                    )}`}
                  >
                    <PiezoListTable filteredPiezoList={filteredPiezoList} />
                  </div>
                ) : (
                  <SkeletonPiezoListTable />
                )}
              </>
            )}
          </div>

          {/* <StateShowing /> */}

          <div
            className="flex flex-col gap-y-4 bg-white p-4 2xl:p-6 rounded-xl shadow-sm"
            key={`${piezo}${paddock}${status}${date}${section}`}
          >
            <h2 className="font-semibold text-[#555] ">
              {status !== 6
                ? "Piezometers location map"
                : "Incidents location map"}
            </h2>
            {status !== 6 ? <MapWrapper /> : <IncidentMapMultiple />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
