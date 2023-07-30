import { useEffect } from "react";

import MenuNavbar from "../MenuNavbar";

import { BsDownload } from "react-icons/bs";

import { Link, useParams } from "react-router-dom";
//@ts-ignore
import axios from "../../utils/axios";

import { useQuery, useQueryClient } from "react-query";

import FadeLoader from "react-spinners/FadeLoader";

import {
  fetchChartLectures,
  fetchPiezometerData,
  fetchSingleReport,
} from "../../utils/reportsFetchFunctions";

import PiezoInfoWithInoperativeDaysTable from "../Reports/PiezoInfoWithInoperativeDaysTable";

import SupervisorsView from "../Reports/SupervisorsView";

import ReportPiezoLecturesComponent from "../Reports/ReportPiezoLecturesComponent";
import { useNewPiezoReportStateStore } from "../../store/NewPiezoReportStateStore";
import FullPageComps from "../FullPageComps";
import { toast } from "react-hot-toast";
import { useReportInfoTablesDaysSpanStore } from "../../store/ReportInfoTablesDaysSpanStore";
import moment from "moment";

//@ts-ignore
import { getInoperativeDates } from "../../utils/getInoperativeDates";
import ReportDetailsPDFDownloadButton from "../Reports/ReportDetailsPDFDownloadButton";
import SkeletonPiezoReportDetailsPage from "../Skeletons/Reports/SkeletonPiezoReportDetailsPage";
import { AiOutlineArrowLeft } from "react-icons/ai";
import ReportPiezoTableWithInoperativeDates from "../Reports/form/ReportPiezoTableWithInoperativeDates";
import DetailsReportPiezoTableWithInoperativeDates from "../Reports/details/DetailsReportPiezoTableWithInoperativeDates";

function PiezoReportDetails() {
  const { id } = useParams();

  const days = useNewPiezoReportStateStore((state) => state.days);
  const chartType = useNewPiezoReportStateStore((state) => state.chartType);

  const daysSpan = useReportInfoTablesDaysSpanStore((state) => state.daysSpan);

  // FETCH REPORT INFO

  const { isLoading, data: report } = useQuery(
    `piezoReport-${id}`,
    () => fetchSingleReport(id),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading || !report) return <SkeletonPiezoReportDetailsPage />;

  console.log("REPORT", report);

  return (
    <>
      <MenuNavbar />

      <div className="mt-12 md:hidden" />

      <div className="flex">
        <Link to="/operations/reports/piezometers">
          <button className="flex items-center gap-x-1 pb-px border-b w-max border-transparent hover:border-[#666] transition-all">
            <AiOutlineArrowLeft />
            <span className="cursor-pointer font-semibold">back</span>
          </button>
        </Link>
      </div>

      <div className="mt-4" />

      <div className="flex items-center justify-between gap-x-8 gap-y-8 flex-wrap bg-white p-4 rounded-xl shadow-sm">
        <h1 className=" font-bold xl:text-lg">Piezo Report Details</h1>

        <ReportDetailsPDFDownloadButton />
      </div>

      <div className="mt-6" />

      <div className=" bg-white p-4 rounded-xl shadow-sm">
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-3 flex-wrap">
            <span className="text-lg 2xl:text-xl font-bold">
              {report.report_title}
            </span>

            <span className="font-semibold text-xs md:text-sm text-[#666]">
              {report.report_date} ({report.report_time_span} report)
            </span>
          </div>

          <div className="gap-x-4 flex items-end">
            <span className="font-semibold text-sm">Report comments:</span>{" "}
            <span className="font-medium text-sm">
              {report.report_description}
            </span>{" "}
          </div>
        </div>
      </div>

      <div className="mt-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 gap-y-8">
        <div className=" bg-white p-4 rounded-xl shadow-sm">
          <div className="flex flex-col gap-y-6">
            <h2 className="font-semibold">Location photo</h2>
            <div className="bg-[#f5f5f5] border border-[#dfdfdf]  shadow-sm w-full  min-h-[10rem] md:min-h-[12rem] 2xl:min-h-[14rem] max-h-[20rem]   rounded-md flex items-center justify-center overflow-hidden cursor-pointer ">
              <img
                src={`/media/piezometer_reports/${
                  report.report_photo === "piezoreport-default"
                    ? "piezoreport-default.png"
                    : report.report_photo
                }`}
                alt={`/media/piezometer_reports/${
                  report.report_photo === "report-default"
                    ? "report-default.png"
                    : report.report_photo
                }`}
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-4  bg-white p-4 rounded-xl shadow-sm">
          <h2 className="font-semibold text-sm 2xl:text-base">
            Piezometer details
          </h2>

          <div className="flex items-center gap-x-2 font-bold">
            <span>{report.report_paddock}</span>
            <span>-</span>
            <span>{report.report_piezo}</span>
          </div>

          <DetailsReportPiezoTableWithInoperativeDates report={report} />
        </div>
      </div>

      <div className="bg-backgroundWhite md:bg-white   md:px-8 md:py-10  rounded-2xl mt-12 flex flex-col gap-y-12 md:shadow-lg ">
        <ReportPiezoLecturesComponent
          paddock={report.report_paddock}
          piezo={report.report_piezo}
        />

        <SupervisorsView report={report} />
      </div>

      <FullPageComps
        information={{
          paddock: report.report_paddock,
          piezo: report.report_piezo,
          days,
          chartType,
        }}
      />
    </>
  );
}

export default PiezoReportDetails;
