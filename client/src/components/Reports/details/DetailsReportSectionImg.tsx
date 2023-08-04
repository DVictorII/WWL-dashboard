import React from "react";
import axios from "../../../utils/axios";
import { ReportDetails } from "../../../types";
import { useLocation } from "react-router-dom";
import { useMonitoringMapStateStore } from "../../../store/MonitoringMapStateStore";
import { useQuery } from "react-query";
import SectionLegend from "../../PiezometerLectures/SectionLegend";
import FullScreenButton from "../../PiezometerLectures/FullScreenButton";

//@ts-ignore
import SectionChart from "../../Charts/SectionChart";

const fetchSectionByPiezometer = async ({
  node,
  channel,
}: {
  node: number;
  channel: number;
}) => {
  try {
    const res = await axios.get(`/get_graphics_${node}-${channel}`);

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

function DetailsReportSectionImg({
  report,
  fullPage = false,
}: {
  report: ReportDetails;
  fullPage?: boolean;
}) {
  const location = useLocation().pathname;

  const {
    report_paddock: paddock,
    report_piezo: piezo,
    report_time_span: timeSpan,
  } = report;

  // console.log(paddock, piezo);

  const piezometersData = useMonitoringMapStateStore((s) => s.piezometersData);

  const currentPiezometer = piezometersData.find(
    (p) => p.paddock === paddock && p.id === piezo
  );
  // console.log(currentPiezometer);

  //   console.log("PIEZOINFO", piezoInfo);

  const { isLoading: sectionDataIsLoading, data: sectionData } = useQuery({
    queryKey: [`Section-data-${paddock}-${piezo}`],
    queryFn: () =>
      fetchSectionByPiezometer({
        //@ts-ignore
        node: currentPiezometer.datalogger,
        //@ts-ignore
        channel: currentPiezometer.channel,
      }),
    enabled:
      !!currentPiezometer &&
      !!currentPiezometer.datalogger &&
      !!currentPiezometer.channel &&
      !!currentPiezometer.section &&
      currentPiezometer.section !== "?",
    refetchOnWindowFocus: false,
  });

  if (sectionDataIsLoading)
    return (
      <div className="flex flex-col justify-center  gap-y-8  px-2 sm:px-8 md:px-0 ">
        <h1>Loading...</h1>
      </div>
    );

  if (!sectionData)
    return (
      <div className="flex flex-col gap-y-4  w-full ">
        <div className="overflow-scroll">
          <div
            className={` ${
              fullPage ? "h-[50vh]" : "h-[30vh] "
            }     min-w-[36rem] max-w-full  p-4 flex justify-center items-center bg-[#f1f1f1]`}
          >
            <h1>Piezometer dont belong to any section!!</h1>
          </div>
        </div>

        <div className="flex flex-col gap-y-6 3xl:flex-row-reverse 3xl:justify-between w-full">
          <SectionLegend />
          <FullScreenButton comp={"section"} />
        </div>
      </div>
    );

  //@ts-ignore
  const chartPiezometers = sectionData.data.map((arr) => {
    const fixedXCoordinate = Math.round(arr[2] / 5) * 5;

    // console.log(fixedXCoordinate);

    return [arr[0], arr[1], fixedXCoordinate, arr[3], arr[4]];
  });

  const chartCoordinates = sectionData.name;

  return (
    <div className="flex flex-col gap-y-4  w-full ">
      <div className="overflow-scroll lg:overflow-auto">
        <div
          className={`${
            fullPage ? "h-[50vh]" : "h-[30vh] "
          }    min-w-[36rem] max-w-full  p-4`}
        >
          <SectionChart
            chartCoordinates={chartCoordinates}
            chartPiezometers={chartPiezometers}
          />
        </div>
      </div>

      <div className="flex flex-col gap-y-6 3xl:flex-row-reverse 3xl:justify-between w-full">
        <SectionLegend />
        {!fullPage && <FullScreenButton comp={"section"} />}
      </div>
    </div>
  );
}

export default DetailsReportSectionImg;
