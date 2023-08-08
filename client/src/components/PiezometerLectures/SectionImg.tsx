import React from "react";
import FullScreenButton from "./FullScreenButton";
import { fetchPiezometerData } from "../../utils/map";
import { FadeLoader } from "react-spinners";
import { useQuery } from "react-query";
import { usePiezometerLecturesStateStore } from "../../store/PiezometerLecturesStateStore";
import { useSectionImgStore } from "../../store/sectionImgStore";
import { useLocation } from "react-router-dom";
import { useNewPiezoReportStateStore } from "../../store/NewPiezoReportStateStore";
import SkeletonSectionImg from "../Skeletons/PiezometerLectures/SkeletonSectionImg";
import { useMonitoringMapStateStore } from "../../store/MonitoringMapStateStore";
import axios from "../../utils/axios";
import LecturesLocationTable from "./LecturesLocationTable";
//@ts-ignore
import SectionChart from "../Charts/SectionChart";
import SectionLegend from "./SectionLegend";

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

function SectionImg({ fullPage = false }) {
  const location = useLocation().pathname;

  const paddock =
    location === "/operations/piezometer-readings"
      ? usePiezometerLecturesStateStore((s) => s.paddock)
      : useNewPiezoReportStateStore((state) => state.paddock);
  const piezo =
    location === "/operations/piezometer-readings"
      ? usePiezometerLecturesStateStore((s) => s.piezo)
      : useNewPiezoReportStateStore((state) => state.piezo);

  // console.log(paddock, piezo);

  const piezometersData = useMonitoringMapStateStore((s) => s.piezometersData);

  const currentPiezometer = piezometersData.find(
    (p) => p.paddock === paddock && p.id === piezo
  );
  // console.log(currentPiezometer);

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

  if (!currentPiezometer?.section || currentPiezometer.section === "?")
    return (
      <div className="flex flex-col gap-y-4  w-full ">
        <div className="overflow-scroll">
          <div
            className={` ${
              fullPage ? "h-[50vh]" : "h-[30vh] "
            }  w-full text-center  p-4 flex justify-center items-center bg-[#f1f1f1]`}
          >
            <h1
              className={`${fullPage ? "text-xl" : "text-lg"} font-semibold `}
            >
              Piezometer dont belong to any section yet!!
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-y-6 3xl:flex-row-reverse 3xl:justify-between w-full">
          <SectionLegend />
          {!fullPage && <FullScreenButton comp={"section"} />}
        </div>
      </div>
    );

  //   console.log("PIEZOINFO", piezoInfo);

  if (sectionDataIsLoading)
    return (
      <div className="flex flex-col justify-center  gap-y-8  px-2 sm:px-8 md:px-0 ">
        <h1>Loading...</h1>
      </div>
    );

  if (!sectionData || !sectionData.name || !sectionData.data)
    return (
      <div className="flex flex-col gap-y-4  w-full ">
        <div className="overflow-scroll">
          <div
            className={` ${
              fullPage ? "h-[50vh]" : "h-[30vh] "
            }   w-full text-center  p-4 flex justify-center items-center bg-[#f1f1f1]`}
          >
            <h1
              className={`${fullPage ? "text-xl" : "text-lg"} font-semibold `}
            >
              Section representation not available yet!!
            </h1>
          </div>
        </div>

        <div className="flex flex-col gap-y-6 3xl:flex-row-reverse 3xl:justify-between w-full">
          <SectionLegend />
          {!fullPage && <FullScreenButton comp={"section"} />}
        </div>
      </div>
    );

  console.log("DATA", sectionData);
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

export default SectionImg;
