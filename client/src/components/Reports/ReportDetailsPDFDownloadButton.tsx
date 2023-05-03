import React, {useEffect} from "react";
import { useParams } from "react-router-dom";
import { useNewPiezoReportStateStore } from "../../store/NewPiezoReportStateStore";
import { useReportInfoTablesDaysSpanStore } from "../../store/ReportInfoTablesDaysSpanStore";
import { useQuery } from "react-query";
import { fetchChartLectures, fetchPiezometerData, fetchSingleReport } from "../../utils/reportsFetchFunctions";
import moment from "moment";

//@ts-ignore
import { getInoperativeDates } from "../../utils/getInoperativeDates";
//@ts-ignore
import axios from "../../utils/axios"
import { toast } from "react-hot-toast";
import { FadeLoader } from "react-spinners";
import { BsDownload } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";

function ReportDetailsPDFDownloadButton() {
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
  )

  const paddock = report?.report_paddock
  const piezo = report?.report_piezo


  const { isLoading: piezometersAreLoading, data: piezometersData } = useQuery({
    queryKey: [`ReportPiezo-${paddock}-${piezo}`, paddock, piezo],
    queryFn: () => fetchPiezometerData({ paddock, piezo } as {paddock: string, piezo: string}),
    // The query will not execute until the userId exists
    enabled: !!paddock,
    refetchOnWindowFocus: false,
  });

  let datalogger = piezometersData?.datalogger;
  let channel = piezometersData?.channel;

  const { isLoading: lecturesAreLoading, data: lecturesData } = useQuery({
    queryKey: [
      `lecturesReportData-node_${datalogger}_${channel}`,
      datalogger,
      channel,
      daysSpan,
    ],
    queryFn: () => fetchChartLectures({ datalogger, channel, days: daysSpan }),
    // The query will not execute until the userId exists
    enabled: !!datalogger,
    refetchOnWindowFocus: false,
  });

  // useEffect(() => {
  //   console.log("lectures", lecturesData);
  // }, [lecturesData]);

  //@ts-ignore
  const lecturesDates = lecturesData?.map((lecture) => {
    return moment(lecture.time).format("YYYY-MM-DD HH:mm:ss");
  });

  //@ts-ignore
  const lecturesPressure = lecturesData?.map((lecture) => {
    return lecture.pressure;
  });

  const inoperativeDates = lecturesDates
    ? getInoperativeDates(lecturesDates)
    : undefined;

  useEffect(()=>{
    console.log("report", report)
  },[report])


  if (isLoading || !report || piezometersAreLoading || lecturesAreLoading)
    return (
        <button
        className="flex items-center gap-x-2 md:gap-x-3 lg:gap-x-4 px-4 py-2 bg-all-normal hover:bg-orange-800 transition-all text-white rounded-lg shadow-sm disabled:bg-[#555]"
        disabled
      >
        <FaSpinner className="w-4 h-4 " />
        <span className="text-xs md:text-sm">Preparing Download</span>
      </button>
    );

  const downloadReport = async () => {
    try {
      const res = await toast.promise(
        axios.post("/create-pdf", {
          title: report.report_title || "",
          description: report.report_description || "",
          paddock: report.report_paddock || "",
          piezo: report.report_piezo || "",
          date: report.report_date || "",
          days: daysSpan || 200,
          photo:report.report_photo || "piezoreport-default.png",
          supervisors: String(report.report_supervisors) || "[]",
          averagePWP: lecturesPressure
            ? Number(
                lecturesPressure.reduce(
                  //@ts-ignore
                  (acc, val) => acc + Number(val) / lecturesPressure.length,
                  0
                )
              ).toFixed(3)
            : 0,
          inoperativeDates: inoperativeDates || [],
          lecturesDates: lecturesDates || [],
          lecturesPressure: lecturesPressure || [],
          sectionURL: `${piezometersData.section}.png` || "None",
        }),
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

      //@ts-ignore
      const filename = res.data.filename;

      const aTag = document.createElement("a");
      aTag.href = `/report_pdf/${filename}`;
      aTag.target = "_blank";
      aTag.setAttribute(
        "download",
        `report_${filename}`
      );

      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  return (
    <button
      onClick={downloadReport}
      className="flex items-center gap-x-2 md:gap-x-3 lg:gap-x-4 px-4 py-2 bg-all-normal hover:bg-orange-800 transition-all text-white rounded-lg shadow-sm"
    >
      <BsDownload className="w-4 h-4 " />
      <span className="text-xs md:text-sm">Download report on PDF</span>
    </button>
  );
}

export default ReportDetailsPDFDownloadButton;
