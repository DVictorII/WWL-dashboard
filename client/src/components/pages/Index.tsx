import { useEffect } from "react";
import moment from "moment";
import MenuNavbar from "../MenuNavbar";

import MapWrapper from "../MapWrapper";

import { toast } from "react-hot-toast";

import IncidentMapMultiple from "../Incidents/IncidentMapMultiple";
//@ts-ignore: Unreachable code error
import axios from "../../utils/axios";
import axios2 from "axios";

import { AiOutlineDownload } from "react-icons/ai";
import PiezoListTable from "../MonitoringMap/PiezoListTable";
import PiezoFilterComp from "../MonitoringMap/MapFiltering/PiezoFilterComp";

import { useMonitoringMapStateStore } from "../../store/MonitoringMapStateStore";

import {
  capitalizeName,
  monitoringMapStatusInfo,
} from "../../utils/monitoringMapStatusInfo";

import path from "path";
import PiezoInformationTable from "../PiezometerLectures/PiezoInformationTable";
import MonMapPiezoInformationTable from "../MonitoringMap/MonMapPiezoInformationTable";
import { fetchLastReadings, fetchPiezometersData } from "../../utils/map";
import { useQuery } from "react-query";

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
            <h2 className="font-semibold text-[#555] text-sm 2xl:text-base">
              Piezometers Overview
            </h2>

            {paddock !== "All" && piezo !== "All" ? (
              <MonMapPiezoInformationTable />
            ) : (
              <PiezoListTable />
            )}
          </div>

          {/* <StateShowing /> */}

          <div
            className="flex flex-col gap-y-4 bg-white p-4 2xl:p-6 rounded-xl shadow-sm"
            key={`${piezo}${paddock}${status}${date}${section}`}
          >
            <h2 className="font-semibold text-[#555] text-sm 2xl:text-base">
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
