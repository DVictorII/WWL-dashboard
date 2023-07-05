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

  const downloadReport = async () => {
    try {
      const res = await toast.promise(
        axios.post("/modify_excel"),
        {
          loading: "Generating report...",
          success: (data) => {
            return `Generated! Downloading...`;
          },
          error: (err) => `There was an error!`,
        },
        {
          style: {
            fontWeight: "500",
          },
          success: {
            duration: 3000,

            style: {
              fontWeight: "500",
              border: "2px solid #65a30d",
              padding: "8px 16px",
              color: "#1c1917",
            },
          },
          error: {
            duration: 3000,

            style: {
              fontWeight: "500",
              border: "2px solid #b91c1c",
              padding: "8px 16px",
              color: "#1c1917",
            },
          },
        }
      );

      const aTag = document.createElement("a");
      //@ts-ignore
      aTag.href = "/pyreport/report2.xlsx";
      aTag.target = "_blank";
      aTag.setAttribute(
        "download",
        `report_${moment(Date.now()).format("YYYY_MM_DD_hh_mm_ss")}.xlsx`
      );

      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  //@ts-ignore
  const selectedStatus = monitoringMapStatusInfo[status];

  return (
    <>
      <MenuNavbar />

      <div className="mt-12 md:hidden" />

      <div className="flex items-center justify-between gap-x-8 gap-y-8 flex-wrap bg-white p-4 rounded-xl shadow-sm">
        <h1 className="flex flex-col gap-y-1 ">
          <span className="font-bold">Monitoring Map</span>
          <span className="text-xs font-semibold text-[#666]">
            (92 Piezometers - 49 active)
          </span>
        </h1>
        <button
          onClick={downloadReport}
          className="flex items-center gap-x-1   px-2  py-2 sm:px-4  bg-[#333] text-[#f1f1f1] rounded-full"
        >
          <AiOutlineDownload className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 " />
          <span className="text-xs sm:text-sm   font-medium hidden sm:block">
            Generate report
          </span>
        </button>
      </div>

      <div className="mt-12" />

      <div className="  flex flex-col gap-y-8  ">
        {/* <h2 className="font-semibold flex gap-x-8 items-end">
          <span className="font-semibold text-sm 2xl:text-base">
            {selectedStatus.name === "incident"
              ? "Incidents"
              : selectedStatus.name === "tarp"
              ? "TARPS"
              : `${capitalizeName(selectedStatus.name)} piezometers`}
          </span>
          <span
            style={{
              color: selectedStatus.normalColor,
            }}
            className={`text-2xl lg:text-3xl 2xl:text-4xl `}
          >
            {selectedStatus.number}
          </span>
        </h2> */}

        <PiezoFilterComp />

        <div className="flex flex-col gap-y-4 bg-white p-4 rounded-xl shadow-sm">
          <h2 className="font-semibold text-[#444] text-sm 2xl:text-base">
            Piezometer list
          </h2>
          <PiezoListTable />
        </div>

        {/* <StateShowing/> */}

        <div
          className="flex flex-col gap-y-4 bg-white p-4 rounded-xl shadow-sm"
          key={`${piezo}${paddock}${status}${date}`}
        >
          <h2 className="font-semibold text-[#444] text-sm 2xl:text-base">
            {status !== 6
              ? "Piezometers interactive map"
              : "Incidents interactive map"}
          </h2>
          {status !== 6 ? <MapWrapper /> : <IncidentMapMultiple />}
        </div>
      </div>
    </>
  );
};

export default Index;
