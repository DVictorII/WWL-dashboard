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

  const downloadReport = async () => {
    try {
      const res = await toast.promise(
        axios.post("/modify_excel"),
        {
          loading: "Generating report...",
          success: (data) => {
            console.log("DOWNLOAD FILE", data.data.filename);

            const aTag = document.createElement("a");
            //@ts-ignore
            aTag.href = "/pyreport/report3.xlsx";

            aTag.target = "_blank";
            aTag.setAttribute(
              "download",
              `report_${moment(Date.now()).format("YYYY_MM_DD_hh_mm_ss")}.xlsx`
            );

            document.body.appendChild(aTag);
            aTag.click();
            aTag.remove();

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
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  const downloadWord = async () => {
    // const aTag = document.createElement("a");
    // //@ts-ignore
    // aTag.href = "/report_word/word_report.docx";

    // aTag.target = "_blank";
    // aTag.setAttribute(
    //   "download",
    //   `report_${moment(Date.now()).format("YYYY_MM_DD_hh_mm_ss")}.docx`
    // );

    // document.body.appendChild(aTag);
    // aTag.click();
    // aTag.remove();
    // try {
    //   const res = await toast.promise(
    //     axios.post("/paddock-chart", {
    //       date: date,
    //     }),
    //     {
    //       loading: "Generating report...",
    //       success: (data) => {
    //         // console.log("DOWNLOAD FILE", data.data.filename);

    //         const aTag = document.createElement("a");
    //         //@ts-ignore
    //         aTag.href = "/report_word/word_report.docx";

    //         aTag.target = "_blank";
    //         aTag.setAttribute(
    //           "download",
    //           `report_${moment(Date.now()).format("YYYY_MM_DD_hh_mm_ss")}.docx`
    //         );

    //         document.body.appendChild(aTag);
    //         aTag.click();
    //         aTag.remove();

    //         return `Generated! Downloading...`;
    //       },
    //       error: (err) => `There was an error!`,
    //     },
    //     {
    //       style: {
    //         fontWeight: "500",
    //       },
    //       success: {
    //         duration: 3000,

    //         style: {
    //           fontWeight: "500",
    //           border: "2px solid #65a30d",
    //           padding: "8px 16px",
    //           color: "#1c1917",
    //         },
    //       },
    //       error: {
    //         duration: 3000,

    //         style: {
    //           fontWeight: "500",
    //           border: "2px solid #b91c1c",
    //           padding: "8px 16px",
    //           color: "#1c1917",
    //         },
    //       },
    //     }
    //   );
    // } catch (err) {
    //   console.log("ERROR", err);
    // }

    try {
      const res = await toast.promise(
        axios.get("/piezometers-data"),
        {
          loading: "Generating report...",
          success: (data) => {
            // console.log("DOWNLOAD FILE", data.data.filename);

            const aTag = document.createElement("a");
            //@ts-ignore
            aTag.href = "/report_word/word_report.docx";

            aTag.target = "_blank";
            aTag.setAttribute(
              "download",
              `report_${moment(Date.now()).format("YYYY_MM_DD_hh_mm_ss")}.docx`
            );

            document.body.appendChild(aTag);
            aTag.click();
            aTag.remove();

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
          <span className="font-bold xl:text-lg">
            Operations - Monitoring Map
          </span>
          <span className="text-xs xl:text-sm font-semibold text-[#666]">
            ({piezometersData.length} Piezometers)
          </span>
        </h1>

        <div className="flex items-center gap-x-2">
          <button
            onClick={downloadWord}
            className="flex items-center gap-x-1   px-4  py-2 sm:px-4  bg-[#333] text-[#f1f1f1] rounded-full"
          >
            <AiOutlineDownload className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 " />
            <span className="text-xs font-semibold sm:hidden">Word</span>
            <span className="text-xs sm:text-sm   font-medium hidden sm:block">
              Generate Appendix report
            </span>
          </button>
          <button
            onClick={downloadReport}
            className="flex items-center gap-x-1   px-4  py-2 sm:px-4  bg-[#333] text-[#f1f1f1] rounded-full"
          >
            <AiOutlineDownload className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 " />
            <span className="text-xs font-semibold sm:hidden">Excel</span>
            <span className="text-xs sm:text-sm   font-medium hidden sm:block">
              Generate Excel report
            </span>
          </button>
        </div>
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
