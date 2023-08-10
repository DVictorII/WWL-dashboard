import MenuNavbar from "../MenuNavbar";
import { useState } from "react";

import { Link, useParams } from "react-router-dom";

import { useQuery } from "react-query";

import { fetchSingleReport } from "../../utils/reportsFetchFunctions";

import SupervisorsView from "../Reports/details/SupervisorsView";

import { useNewPiezoReportStateStore } from "../../store/NewPiezoReportStateStore";
import FullPageComps from "../FullPageComps";

import { useReportInfoTablesDaysSpanStore } from "../../store/ReportInfoTablesDaysSpanStore";

import Switch from "react-switch";

import ReportDetailsPDFDownloadButton from "../Reports/ReportDetailsPDFDownloadButton";
import SkeletonPiezoReportDetailsPage from "../Skeletons/Reports/SkeletonPiezoReportDetailsPage";
import { AiOutlineArrowLeft } from "react-icons/ai";
import DetailsReportPiezoTableWithInoperativeDates from "../Reports/details/DetailsReportPiezoTableWithInoperativeDates";
import DetailsReportPiezoLecturesComponent from "../Reports/details/DetailsReportPiezoLecturesComponent";
import { BsFillGearFill } from "react-icons/bs";
import { FiAlertTriangle } from "react-icons/fi";

function PiezoReportDetails() {
  const { id } = useParams();

  const [displaying, setDisplaying] = useState("piezoInfo");
  const handleToggleTable = () => {
    if (displaying === "piezoInfo") setDisplaying("inoperativeDates");
    if (displaying === "inoperativeDates") setDisplaying("piezoInfo");
  };

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
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-4">
              <h2 className="font-semibold text-sm 2xl:text-base">
                Piezometer details
              </h2>

              <div className="flex items-center gap-x-2 font-bold">
                <span>{report.report_paddock}</span>
                <span>-</span>
                <span>{report.report_piezo}</span>
              </div>
            </div>

            <Switch
              onChange={handleToggleTable}
              checked={displaying === "piezoInfo"}
              offColor="#8D2525"
              onColor="#1C394A"
              uncheckedIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 20,
                    color: "#fff",
                  }}
                >
                  <FiAlertTriangle className="w-4 h-4" />
                </div>
              }
              checkedIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 20,
                    color: "#fff",
                  }}
                >
                  <BsFillGearFill className="w-4 h-4" />
                </div>
              }
            />
          </div>

          <DetailsReportPiezoTableWithInoperativeDates
            report={report}
            displaying={displaying}
            handleToggleTable={handleToggleTable}
          />
        </div>
      </div>

      <div className="mt-6" />

      <DetailsReportPiezoLecturesComponent report={report} />

      <div className="mt-6" />

      <div className="bg-white p-4 2xl:p-6 rounded-xl shadow-sm">
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
