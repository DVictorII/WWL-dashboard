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

function PiezoReportDetails() {
  const { id } = useParams();

  const days = useNewPiezoReportStateStore((state) => state.days);
  const chartType = useNewPiezoReportStateStore((state) => state.chartType);

  const daysSpan = useReportInfoTablesDaysSpanStore((state) => state.daysSpan);

  // FETCH INFO OF ONE PIEZOMETER

  const { isLoading, data: report } = useQuery(
    `piezoReport-${id}`,
    () => fetchSingleReport(id),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading || !report) return <SkeletonPiezoReportDetailsPage />;

  return (
    <>
      <MenuNavbar />

      <div className="mt-12 md:mt-0 flex flex-col gap-y-12">
        <div className="flex items-center justify-between gap-x-8 gap-y-8 flex-wrap">
          <h1 className="md:text-lg 2xl:text-xl font-bold">
            {report.report_title}
          </h1>

          <div className="flex items-center gap-x-8 flex-wrap gap-y-8">
            <ReportDetailsPDFDownloadButton />

            <Link to="/operations/reports/piezometers">
              <span className="cursor-pointer text-all-normal pb-1 border-b-2  border-all-normal hover:text-orange-800 hover:border-orange-800 transition-all w-max sz450:justify-self-end md:text-lg  font-semibold ">
                &larr; Back
              </span>
            </Link>
          </div>
        </div>
        <div className="text-sm font-medium">{report.report_description}</div>
      </div>

      <div className="bg-backgroundWhite md:bg-white   md:px-8 md:py-10  rounded-2xl mt-12 flex flex-col gap-y-12 md:shadow-lg ">
        <div className="bg-[#f5f5f5] border border-[#dfdfdf]  shadow-sm w-full sm:w-3/4 lg:w-1/2 min-h-[10rem] md:min-h-[12rem] 2xl:min-h-[14rem] max-h-[20rem]   rounded-lg flex items-center justify-center overflow-hidden cursor-pointer self-center">
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

        <PiezoInfoWithInoperativeDaysTable
          paddock={report.report_paddock}
          piezo={report.report_piezo}
        />

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
