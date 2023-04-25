
import MenuNavbar from "../MenuNavbar";

import { BsDownload } from "react-icons/bs";

import { Link, useParams } from "react-router-dom";

import { useQuery, useQueryClient } from "react-query";

import FadeLoader from "react-spinners/FadeLoader";

import {  fetchSingleReport } from "../../utils/reportsFetchFunctions";


import PiezoInfoWithInoperativeDaysTable from "../Reports/PiezoInfoWithInoperativeDaysTable";

import SupervisorsView from "../Reports/SupervisorsView";
import { useSectionImgStore } from "../../store/sectionImgStore";

import { useReportInfoTablesDaysSpanStore } from "../../store/ReportInfoTablesDaysSpanStore";
import ReportPiezoLecturesComponent from "../Reports/ReportPiezoLecturesComponent";
import { useNewPiezoReportStateStore } from "../../store/NewPiezoReportStateStore";
import FullPageComps from "../FullPageComps";

function PiezoReportDetails() {

  const { id } = useParams();


  const days = useNewPiezoReportStateStore((state) => state.days);
  const chartType = useNewPiezoReportStateStore((state) => state.chartType);

  // FETCH INFO OF ONE PIEZOMETER

  const { isLoading, data: report } = useQuery(
    `piezoReport-${id}`,
    ()=>fetchSingleReport(id),
    {
      refetchOnWindowFocus: false,
    }
  );


  const paddock = report?.paddock;
  const piezo = report?.piezo;

 

  if (isLoading || !report)
    return (
      <div className="w-full   h-full relative z-[10] flex justify-center items-center">
        <FadeLoader
          color="#BD9C45"
          loading={isLoading}
          radius={50}
        />
      </div>
    );

  // const downloadReport = async () => {
  //   try {
  //     const res = await toast.promise(
  //       axios.post("/create-pdf", {
  //         title: report.title || "",
  //         description: report.description || "",
  //         paddock: report.paddock || "",
  //         piezo: report.piezo || "",
  //         date: report.date || "",
  //         days: daysSpan || 0,
  //         averagePWP: lecturesPressure
  //           ? Number(
  //               lecturesPressure.reduce(
  //                 //@ts-ignore
  //                 (acc, val) => acc + Number(val) / lecturesPressure.length,
  //                 0
  //               )
  //             ).toFixed(3)
  //           : 0,
  //         inoperativeDates: inoperativeDates || [],
  //         lecturesDates: lecturesDates || [],
  //         lecturesPressure: lecturesPressure || [],
  //         sectionURL: `/img/sections/${piezometersData.section}.png` || "None",
  //       }),
  //       {
  //         loading: "Generating report...",
  //         success: (data) => {
  //           return `Generated! Downloading...`;
  //         },
  //         error: (err) => `There was an error!`,
  //       },
  //       {
  //         success: {
  //           duration: 3000,

  //           style: {
  //             fontWeight: "500",
  //             border: "2px solid #65a30d",
  //             padding: "8px 16px",
  //             color: "#1c1917",
  //           },
  //         },
  //         error: {
  //           duration: 3000,

  //           style: {
  //             fontWeight: "500",
  //             border: "2px solid #b91c1c",
  //             padding: "8px 16px",
  //             color: "#1c1917",
  //           },
  //         },
  //       }
  //     );

  //     // //@ts-ignore
  //     // const filename = res.data.filename;

  //     // const aTag = document.createElement("a");
  //     // aTag.href = filename;
  //     // aTag.target = "_blank";
  //     // // aTag.setAttribute(
  //     // //   "download",
  //     // //   `report_${moment(Date.now()).format("YYYY_MM_DD_hh_mm_ss")}.xlsx`
  //     // // );

  //     // document.body.appendChild(aTag);
  //     // aTag.click();
  //     // aTag.remove();
  //   } catch (err) {
  //     console.log("ERROR", err);
  //   }
  // };

  return (
    <>
      <MenuNavbar />

      <div className="mt-12 md:mt-0 flex flex-col gap-y-12">

        <div className="flex items-center justify-between gap-x-8 gap-y-8 flex-wrap">
          <h1 className="md:text-lg 2xl:text-xl font-bold">{report.title}</h1>

          <div className="flex items-center gap-x-8 flex-wrap gap-y-8">

            <button
              // onClick={downloadReport}
              className="flex items-center gap-x-2 md:gap-x-3 lg:gap-x-4 px-4 py-2 bg-[#333] text-white rounded-xl"
            >
              <BsDownload className="w-4 h-4 " />
              <span className="text-xs md:text-sm">
                Download report on PDF
              </span>
            </button>

            <Link to="/reports/piezometers">
              <span className="cursor-pointer text-bluePrimary pb-1 border-b-2 border-[#777] border-bluePrimary w-max sz450:justify-self-end md:text-lg  font-semibold ">
                &larr; Back
              </span>
            </Link>

          </div>
        </div>
        <div className="text-sm font-medium">{report.description}</div>
      </div>

      <div className="md:bg-[#f5f5f5] bg-white   md:px-8 md:py-10  rounded-2xl mt-12 flex flex-col gap-y-8" >
        <PiezoInfoWithInoperativeDaysTable paddock={paddock} piezo={piezo}/>

        <ReportPiezoLecturesComponent paddock={paddock} piezo={piezo} />

        <SupervisorsView/>
      </div>

      
      <FullPageComps information={{
        paddock, piezo, days, chartType
      }} />
      
    </>
  );
}

export default PiezoReportDetails;
