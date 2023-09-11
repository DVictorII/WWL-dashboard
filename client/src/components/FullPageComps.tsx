import React from "react";
import { useSectionImgStore } from "../store/sectionImgStore";

import { AnimatePresence, motion } from "framer-motion";
import BarChart from "./BarChart";
import SectionImg from "./PiezometerLectures/SectionImg";
import { useMonitoringMapStateStore } from "../store/MonitoringMapStateStore";
import moment from "moment";
import SkeletonBarChart from "./Skeletons/PiezometerLectures/SkeletonBarChart";
import axios from "../utils/axios";
import { useLocation } from "react-router-dom";
import { usePiezometerLecturesStateStore } from "../store/PiezometerLecturesStateStore";
import { useNewPiezoReportStateStore } from "../store/NewPiezoReportStateStore";
import { useQuery } from "react-query";
import ReadingsChart from "./Charts/ReadingsChart";

interface Information {
  paddock: string;
  piezo: string;
  days: string | number;
  chartType: string;
}

function FullPageComps({ information }: { information: Information }) {
  const location = useLocation().pathname;
  const sectionImgIsOpen = useSectionImgStore((s) => s.sectionImgIsOpen);
  const closeSectionImg = useSectionImgStore((s) => s.closeSectionImg);

  const piezometersData = useMonitoringMapStateStore((s) => s.piezometersData);

  const currentPiezometer = piezometersData.find(
    (p) => p.paddock === information.paddock && p.id === information.piezo
  );
  const lastReadings = useMonitoringMapStateStore((s) => s.lastReadings);

  const fullPageBarChartIsOpen = useSectionImgStore(
    (s) => s.fullPageBarChartIsOpen
  );
  const closeFullPageBarChart = useSectionImgStore(
    (s) => s.closeFullPageBarChart
  );

  const imgURL = useSectionImgStore((s) => s.imgURL);

  const fetchChartLectures = async (
    datalogger: number | undefined,
    channel: number | undefined
  ) => {
    const result = await axios.get(
      `/lectures/node_${datalogger}_${channel}/${information.days}`
    );

    return result.data.lectures;
  };

  const { isLoading: lecturesAreLoading, data: lecturesData } = useQuery({
    queryKey: [
      `lecturesData-node_${currentPiezometer?.datalogger}_${currentPiezometer?.channel}-${information.days}`,
      currentPiezometer?.datalogger,
      currentPiezometer?.channel,
    ],
    queryFn: () =>
      fetchChartLectures(
        currentPiezometer?.datalogger,
        currentPiezometer?.channel
      ),
    // The query will not execute until the userId exists
    enabled: !!currentPiezometer?.datalogger || !!currentPiezometer?.channel,
    refetchOnWindowFocus: false,
  });

  if (lecturesAreLoading || !currentPiezometer || !lecturesData)
    return <SkeletonBarChart />;

  const lastReading = lastReadings.find(
    (r) =>
      r.node === currentPiezometer?.datalogger &&
      r.channel === currentPiezometer?.channel
  );

  let alarmAlert = false;
  let limitAlert = false;

  if (lastReading && currentPiezometer?.status === 1) {
    const pressureAlarmFlag =
      lastReading.pressure && lastReading.pressure != "NaN"
        ? Number(lastReading.pressure) >
          Number(currentPiezometer.tarps_value) * 0.8
        : false;

    const pressureLimitFlag =
      lastReading.pressure && lastReading.pressure != "NaN"
        ? Number(lastReading.pressure) > Number(currentPiezometer.tarps_value)
        : false;

    alarmAlert = pressureAlarmFlag ? true : false;
    limitAlert = pressureLimitFlag ? true : false;
  }

  //@ts-ignore
  const pressureArray = lecturesData.map((data) => Number(data.pressure));
  //@ts-ignore
  const wLevelArray = lecturesData.map((data) => data.pressure / 10);

  const wElevationArray = lecturesData.map(
    //@ts-ignore
    (data) => {
      return Number(currentPiezometer?.elevation) + data.pressure / 10;
    }
  );

  const xTimeArr = lecturesData.map((data: { time: string }) =>
    moment(data.time).format("YYYY-MM-DD HH:mm")
  );

  const maxPressureLimit = Math.max(...pressureArray);
  const minPressureLimit = Math.min(...pressureArray);

  const maxWLevelLimit = Math.max(...wLevelArray);
  const minWLevelLimit = Math.min(...wLevelArray);

  const maxWElevationLimit = Math.max(...wElevationArray);
  const minWElevationLimit = Math.min(...wElevationArray);

  const chartLimits = {
    pressure: {
      max: Math.round(maxPressureLimit + 50),
      min: limitAlert
        ? minPressureLimit + 10 < Number(currentPiezometer.tarps_value)
          ? Math.round(minPressureLimit - 10)
          : Number(currentPiezometer.tarps_value) - 10
        : Math.round(minPressureLimit - 10),
    },
    wLevel: {
      max: maxWLevelLimit + 5,
      min: limitAlert
        ? minPressureLimit + 10 < Number(currentPiezometer.tarps_value)
          ? Math.round(minWLevelLimit - 1)
          : Number(currentPiezometer.tarps_value) / 10 - 1
        : Math.round(minWLevelLimit - 1),
    },
    wElevation: {
      max: maxWElevationLimit + 5,
      min: minWElevationLimit - 1,
    },
  };

  return (
    <>
      <AnimatePresence key="fullpage-img">
        {sectionImgIsOpen ? (
          <div className="fixed top-0 left-0 h-screen w-screen  z-[1000] flex items-center justify-center">
            <div
              onClick={closeSectionImg}
              className="absolute top-0 left-0 w-full h-full bg-[#222222] bg-opacity-50 backdrop-blur-sm cursor-pointer "
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              exit={{
                opacity: 0,
                transition: { duration: 0.2, ease: "easeInOut" },
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[700px] md:w-4/5    rotate-90 origin-center lg:rotate-0"
            >
              <div className="p-5 bg-white rounded-xl shadow-sm ">
                <div className="flex flex-col gap-y-4">
                  <div className="text-2xl font-semibold">
                    {currentPiezometer?.section}
                  </div>

                  <SectionImg fullPage />
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence key="fullpage-barchart">
        {fullPageBarChartIsOpen ? (
          <div className="fixed top-0 left-0 h-screen w-screen z-[1000] flex items-center justify-center">
            <div
              onClick={closeFullPageBarChart}
              className="absolute top-0 left-0 w-full h-full bg-[#222222] bg-opacity-50 backdrop-blur-sm blur-md cursor-pointer "
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[700px] md:w-4/5 ] h-1/2 rotate-90 origin-center lg:rotate-0 ">
              <div className="p-5 bg-white rounded-xl shadow-sm">
                <ReadingsChart
                  key={JSON.stringify(lecturesData)}
                  xData={xTimeArr}
                  yData={
                    information.chartType === "pressure"
                      ? pressureArray
                      : information.chartType === "wLevel"
                      ? wLevelArray
                      : wElevationArray
                  }
                  alarmAlert={alarmAlert}
                  limitAlert={limitAlert}
                  chartLimits={
                    information.chartType === "pressure"
                      ? chartLimits.pressure
                      : information.chartType === "wLevel"
                      ? chartLimits.wLevel
                      : chartLimits.wElevation
                  }
                  fullPage={false}
                  information={{
                    paddock: information.paddock,
                    piezo: information.piezo,
                    days: Number(information.days),
                    chartType: information.chartType,
                  }}
                />
              </div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default FullPageComps;
