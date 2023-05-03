import moment from "moment";
import MenuNavbar from "../MenuNavbar";

import MapWrapper from "../MapWrapper";

import { toast } from "react-hot-toast";

import IncidentMapMultiple from "../Incidents/IncidentMapMultiple";
//@ts-ignore: Unreachable code error
import axios from "../../utils/axios";

import { AiOutlineDownload } from "react-icons/ai";
import PiezoListTable from "../MonitoringMap/PiezoListTable";
import PiezoFilterComp from "../MonitoringMap/MapFiltering/PiezoFilterComp";

import { useMonitoringMapStateStore } from "../../store/MonitoringMapStateStore";

import {
  capitalizeName,
  monitoringMapStatusInfo,
} from "../../utils/monitoringMapStatusInfo";

import path from "path"
import { useEffect } from "react";

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

  useEffect(()=>{
    console.log()
  },[])

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

      console.log(res)
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

      <div className="flex items-center justify-between gap-x-8 gap-y-8 flex-wrap mt-12 md:mt-0">
        <h1 className="md:text-lg 2xl:text-xl font-bold">
          Monitoring Map (92 Piezometers)
        </h1>
        <button
          onClick={downloadReport}
          className="flex items-center gap-x-2 md:gap-x-3 lg:gap-x-4 px-4 py-2 bg-[#1E293B] text-white rounded-xl"
        >
          <AiOutlineDownload className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 " />
          <span className="text-sm md:text-base lg:text-lg">
            Generate report
          </span>
        </button>
      </div>


      <div className=" bg-backgroundWhite md:bg-white   md:px-8 md:py-10  rounded-2xl mt-12 flex flex-col gap-y-8 md:shadow-lg ">
        <h2 className="font-semibold flex gap-x-8 items-end">
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
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 xl:gap-x-10 gap-y-8 xl:gap-y-10">
          <PiezoListTable />

          <PiezoFilterComp />
        </div>

        {/* <StateShowing/> */}

        <div
          className="flex flex-col gap-y-4 mt-8"
          key={`${piezo}${paddock}${status}${date}`}
        >
          <h2 className="font-semibold text-sm 2xl:text-base">
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
