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
import { useMediaQuery } from "react-responsive";
import GlobalSectionSubtitle from "../global/GlobalSectionSubtitle";
import PiezoInformationTable from "../PiezometerLectures/PiezoInformationTable";

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
    } else if (status === 0) {
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

  const selectedStatus = monitoringMapStatusInfo[Number(status)];
  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });

  return (
    <div className="flex flex-col gap-y-12 md:gap-y-0">
      <MenuNavbar />

      <div
        style={{
          borderColor: selectedStatus.lightColor,
        }}
        className="py-4  lg:px-4  border-b border-[#ccc]"
      >
        <div className="flex justify-between">
          <h1 className="flex gap-x-4 items-center ">
            <span className="font-bold xl:text-lg">
              Operations - Monitoring Map
            </span>
            <span className="text-xs xl:text-sm font-semibold text-[#666]">
              ({piezometersData.length} Piezometers)
            </span>
          </h1>
        </div>
      </div>

      <PiezoFilterComp />

      {isBigScreen ? (
        <div className="grid grid-cols-2 ">
          <div
            style={{
              borderColor: selectedStatus.lightColor,
            }}
            className="flex flex-col p-4 gap-y-4 border-r "
          >
            <GlobalSectionSubtitle subtitle="Piezometers overview" />

            {paddock !== "All" && piezo !== "All" ? (
              <PiezoInformationTable
                information={{
                  paddock,
                  piezo,
                }}
              />
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

          <div
            className="flex flex-col p-4 gap-y-4"
            key={`${piezo}${paddock}${status}${date}${section}`}
          >
            <GlobalSectionSubtitle
              subtitle={
                status !== 6
                  ? "Piezometers location map"
                  : "Incidents location map"
              }
            />

            {status !== 6 ? <MapWrapper /> : <IncidentMapMultiple />}
          </div>
        </div>
      ) : (
        <div className="  flex flex-col gap-y-8  ">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 gap-y-8">
            <div className="flex flex-col  bg-white p-4 2xl:p-6 rounded-xl shadow-sm">
              <h2 className="font-semibold text-[#555] ">
                Piezometers Overview
              </h2>

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
      )}
    </div>
  );
};

export default Index;
