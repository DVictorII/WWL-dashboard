import MenuNavbar from "../MenuNavbar";
import { Link } from "react-router-dom";

import { useQuery } from "react-query";

import SliderComp from "../Slider/SliderComp";
import ReportsListTable from "../Reports/ReportsListTable";
import { fetchPiezoReports } from "../../utils/reportsFetchFunctions";
import { useEffect } from "react";
import SkeletonPiezoReportsPage from "../Skeletons/Reports/SkeletonPiezoReportsPage";
import {
  AiOutlineDownload,
  AiOutlineLeft,
  AiOutlinePlus,
} from "react-icons/ai";
import moment from "moment";
import axios from "../../utils/axios";
import { toast } from "react-hot-toast";
import { useMonitoringMapStateStore } from "../../store/MonitoringMapStateStore";
import { useOverallReportStateStore } from "../../store/overallReportStateStore";
import OverviewReportDateSelector from "../Reports/OverviewReportDateSelector";
import { BsDot } from "react-icons/bs";
import { MdDownloading } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import { s3StaticFilesLinks } from "../../utils/globalLinks";

function PiezoReports() {
  const date = useOverallReportStateStore((s) => s.date);

  const reportStatus = useOverallReportStateStore((s) => s.reportStatus);
  const setReportStatus = useOverallReportStateStore((s) => s.setReportStatus);

  const reportID = useOverallReportStateStore((s) => s.reportID);
  const changeReportID = useOverallReportStateStore((s) => s.changeReportID);
  const resetReportStatus = useOverallReportStateStore(
    (s) => s.resetReportStatus
  );

  useEffect(() => {
    if (!reportID) changeReportID(uuidv4());
  }, []);

  useEffect(() => {
    if (!reportID) changeReportID(uuidv4());
  }, [reportID]);

  const triggerReportBuild = async () => {
    try {
      const res = await toast.promise(
        axios.post("/paddock-chart", {
          date,
          reportID,
        }),
        {
          loading: "Sending request to the server",
          success: (data) => {
            console.log(data);
            setReportStatus(data.data.status);

            return `Report requested`;
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
      // setReportStatus("off");
      // changeReportID(undefined);
    }
  };

  const downloadReport = async () => {
    try {
      const res = await toast.promise(
        axios.post("/modify_excel"),
        {
          loading: "Generating report...",
          success: (data) => {
            const filename = data.data.filename;

            const aTag = document.createElement("a");

            aTag.href = `/pyreport/${filename}`;

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

      const filename = res.data.filename;
      console.log("FILENAME", filename);

      await axios.post("/delete_excel", {
        filename,
      });
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
    try {
      const res = await toast.promise(
        axios.post("/download-word-report", {
          reportID,
        }),
        {
          loading: "Downloading report",
          success: (data) => {
            const filename = data.data.filename;
            console.log("FILENAME", filename);
            const aTag = document.createElement("a");
            //@ts-ignore
            aTag.href = `${s3StaticFilesLinks.baseURL}/${s3StaticFilesLinks.overviewReports}/${filename}`;
            aTag.target = "_blank";
            aTag.setAttribute(
              "download",
              `report_${moment(Date.now()).format("YYYY_MM_DD_hh_mm_ss")}.docx`
            );
            document.body.appendChild(aTag);
            aTag.click();
            aTag.remove();

            resetReportStatus();
            return `Report downloaded`;
          },
          error: (err) => {
            resetReportStatus();
            return `There was an error!`;
          },
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

  // useEffect(() => {
  //   if (reportStatus === "ok") {
  //     downloadWord();
  //   }
  // }, [reportStatus]);

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

      <div className="py-4  lg:px-4  border-b border-[#ccc]">
        <div className="flex items-center justify-between flex-wrap gap-y-6">
          <h1 className="flex gap-x-4 items-center ">
            <Link to="/operations/monitoring-map">
              <AiOutlineLeft className="w-4 h-4 cursor-pointer" />
            </Link>
            <span className="font-bold xl:text-lg">
              Operations - Piezometer Reports
            </span>
          </h1>
          <div className="flex items-center gap-x-4">
            <div className="flex items-center gap-x-2">
              <button
                onClick={downloadReport}
                className="flex items-center gap-x-1   px-4  py-2 sm:px-4  bg-[#333] text-[#f1f1f1] rounded-full"
              >
                <AiOutlineDownload className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 " />
                <span className="text-xs font-semibold sm:hidden">
                  Readings
                </span>
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
      </div>

      <div className="mt-6" />

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-6 gap-y-6 lg:px-4 ">
        <div className="flex flex-col  bg-white p-4 2xl:p-6 rounded-xl shadow-sm justify-center gap-y-4 ">
          <h2 className="font-semibold text-[#555] text-sm 2xl:text-base">
            Featured reports
          </h2>

          <div className="w-full ">
            <SliderComp reports={piezoReports} />
          </div>
        </div>

        <div className="flex flex-col  bg-white p-4 2xl:p-6 rounded-xl shadow-sm justify-center gap-y-4 ">
          <h2 className="font-semibold text-[#555] text-sm 2xl:text-base">
            Reports List
          </h2>

          <div className="grid grid-cols-1">
            <ReportsListTable reports={piezoReports} />
          </div>
        </div>
      </div>

      <div className="mt-6" />

      <div className="flex flex-col gap-y-12  bg-white p-4 2xl:p-6 rounded-xl shadow-sm justify-center lg:mx-4   ">
        <div className="flex flex-col gap-y-6">
          <h2 className="font-semibold text-[#555] text-sm 2xl:text-base">
            Overview Report
          </h2>

          <div className="flex items-end gap-x-6">
            {reportStatus === "off" ? (
              <button
                onClick={triggerReportBuild}
                className="flex items-center gap-x-1   px-4  py-2 sm:px-4  bg-[#333] text-[#f1f1f1] rounded-full"
              >
                <AiOutlineDownload className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 " />
                <span className="text-xs font-semibold sm:hidden">Create</span>
                <span className="text-xs sm:text-sm   font-medium hidden sm:block ">
                  Create Report
                </span>
              </button>
            ) : (
              <button
                disabled
                className="flex items-center gap-x-1   px-4  py-2 sm:px-4  bg-[#666] text-[#f1f1f1] rounded-full"
              >
                <AiOutlineDownload className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 " />
                <span className="text-xs font-semibold sm:hidden">
                  In Progress
                </span>
                <span className="text-xs sm:text-sm   font-medium hidden sm:block ">
                  Report in progress
                </span>
              </button>
            )}
            <OverviewReportDateSelector />
          </div>

          <p className="text-sm text-[#666]">
            Once requested, the final report will be available in 3 minutes time
            aproximately.
            <br />
            Check the status of the request below:
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-y-4  justify-between md:items-center ">
          <div className="flex items-center">
            <BsDot />

            <span className="text-sm font-semibold">
              Operations Overview Report
            </span>
          </div>

          <span className="text-sm font-semibold">
            Status:{" "}
            <span
              style={{
                color:
                  reportStatus === "off"
                    ? "#b91c1c"
                    : reportStatus === "pending"
                    ? "#b45309"
                    : reportStatus === "ok"
                    ? "#15803d"
                    : "#333",
              }}
              className="md:text-lg"
            >
              {reportStatus}
            </span>
          </span>

          {reportStatus === "off" ? (
            <button
              disabled
              className="flex items-center gap-x-1   px-4  py-2 sm:px-4  bg-[#666] text-[#f1f1f1] rounded-full w-max"
            >
              <AiOutlineDownload className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 " />
              <span className="text-xs font-semibold sm:hidden">Download</span>
              <span className="text-xs sm:text-sm   font-medium hidden sm:block ">
                Download Report
              </span>
            </button>
          ) : reportStatus === "pending" ? (
            <button
              disabled
              className="flex items-center gap-x-1   px-4  py-2 sm:px-4  bg-[#666] text-[#f1f1f1] rounded-full w-max"
            >
              <MdDownloading className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 " />
              <span className="text-xs font-semibold sm:hidden">Download</span>
              <span className="text-xs sm:text-sm   font-medium hidden sm:block ">
                Download Report
              </span>
            </button>
          ) : reportStatus === "ok" ? (
            <button
              onClick={downloadWord}
              className="flex items-center gap-x-1   px-4  py-2 sm:px-4  bg-[#333] text-[#f1f1f1] rounded-full w-max"
            >
              <AiOutlineDownload className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 " />
              <span className="text-xs font-semibold sm:hidden">Download</span>
              <span className="text-xs sm:text-sm   font-medium hidden sm:block ">
                Download Report
              </span>
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default PiezoReports;
