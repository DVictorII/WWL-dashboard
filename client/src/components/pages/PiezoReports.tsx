import MenuNavbar from "../MenuNavbar";
import { Link } from "react-router-dom";

import { useQuery } from "react-query";

import SliderComp from "../Slider/SliderComp";
import ReportsListTable from "../Reports/ReportsListTable";
import { fetchPiezoReports } from "../../utils/reportsFetchFunctions";
import { useEffect } from "react";
import SkeletonPiezoReportsPage from "../Skeletons/Reports/SkeletonPiezoReportsPage";
import { AiOutlineDownload, AiOutlinePlus } from "react-icons/ai";
import moment from "moment";
import axios from "../../utils/axios";
import { toast } from "react-hot-toast";
import { useMonitoringMapStateStore } from "../../store/MonitoringMapStateStore";

function PiezoReports() {
  const date = useMonitoringMapStateStore((s) => s.date);
  const downloadReport = async () => {
    try {
      const res = await toast.promise(
        axios.post("/modify_excel"),
        {
          loading: "Generating report...",
          success: (data) => {
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
          //@ts-ignore
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
    // try {
    //   const res = await toast.promise(
    //     axios.post("/paddock-chart", {
    //       date: date,
    //     }),
    //     {
    //       loading: "Generating report...",
    //       success: (data) => {
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
  };

  const { isLoading, data: piezoReports } = useQuery(
    "piezoReports",
    fetchPiezoReports,
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading || !piezoReports) return <SkeletonPiezoReportsPage />;

  return (
    <>
      <MenuNavbar />

      <div className="mt-12 md:hidden" />

      <div className="items-center flex flex-wrap justify-between  gap-x-8 gap-y-4 bg-white p-4 rounded-xl shadow-sm">
        <h1 className="  font-bold xl:text-lg">
          Operations - Piezometer Reports
        </h1>

        <div className="flex items-center gap-x-4">
          <div className="flex items-center gap-x-2">
            <button
              onClick={downloadWord}
              className="flex items-center gap-x-1   px-4  py-2 sm:px-4  bg-[#333] text-[#f1f1f1] rounded-full"
            >
              <AiOutlineDownload className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 " />
              <span className="text-xs font-semibold sm:hidden">Overview</span>
              <span className="text-xs sm:text-sm   font-medium hidden sm:block">
                Overview Report
              </span>
            </button>
            <button
              onClick={downloadReport}
              className="flex items-center gap-x-1   px-4  py-2 sm:px-4  bg-[#333] text-[#f1f1f1] rounded-full"
            >
              <AiOutlineDownload className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 " />
              <span className="text-xs font-semibold sm:hidden">Readings</span>
              <span className="text-xs sm:text-sm   font-medium hidden sm:block">
                Readings report
              </span>
            </button>
          </div>

          <Link to="/operations/reports/piezometers/new-report">
            <button className="flex items-center gap-x-2 p-2 sm:px-4 rounded-full bg-orange-700 text-white  hover:bg-orange-800 transition-all">
              <AiOutlinePlus className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 " />
              <span className="text-xs sm:text-sm   font-medium hidden sm:block">
                New Piezo. Report
              </span>
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-6" />

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-6 gap-y-6 ">
        <div className="flex flex-col  bg-white p-4 2xl:p-6 rounded-xl shadow-sm justify-center gap-y-4 ">
          <h2 className="font-bold text-sm 2xl:text-base">Featured reports</h2>

          <div className="w-full ">
            <SliderComp reports={piezoReports} />
          </div>
        </div>

        <div className="flex flex-col  bg-white p-4 2xl:p-6 rounded-xl shadow-sm justify-center gap-y-4 ">
          <h2 className="font-bold text-sm 2xl:text-base">Reports List</h2>

          <div className="grid grid-cols-1">
            <ReportsListTable reports={piezoReports} />
          </div>
        </div>
      </div>
    </>
  );
}

export default PiezoReports;
