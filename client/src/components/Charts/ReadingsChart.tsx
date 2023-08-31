import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BubbleController,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  // ChartType
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useMediaQuery } from "react-responsive";
import { useMonitoringMapStateStore } from "../../store/MonitoringMapStateStore";
import axios from "../../utils/axios";
import { useQuery } from "react-query";
import SkeletonBarChart from "../Skeletons/PiezometerLectures/SkeletonBarChart";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import FullScreenButton from "../PiezometerLectures/FullScreenButton";
import ChartLegend from "../PiezometerLectures/ChartLegend";
import { FiAlertTriangle } from "react-icons/fi";
import { RiAlarmWarningLine } from "react-icons/ri";
import { ResponsiveLine } from "@nivo/line";
import { monitoringMapStatusInfo } from "../../utils/monitoringMapStatusInfo";

//@ts-ignore
import { piezoLine } from "./SectionChart";

export const readingsTARPLine = {
  id: "readingsTARPLine",
  //@ts-ignore
  beforeDatasetsDraw(chart, args, options) {
    if (options.display) {
      const tarpsValue = options.tarpsValue;
      const {
        ctx,
        chartArea: { top, right, bottom, left, width, height },
        scales: { x, y },
      } = chart;

      ctx.save();

      ctx.strokeStyle = monitoringMapStatusInfo[2].normalColor;

      ctx.strokeRect(
        left,

        y.getPixelForValue(tarpsValue),
        right,
        0
      );

      ctx.restore();

      //Text
      ctx.font = "12px Arial";
      ctx.fillStyle = monitoringMapStatusInfo[2].normalColor;
      ctx.fillText(
        "Pressure limit exceeded",
        width - 80,
        y.getPixelForValue(tarpsValue) - 5
      );
    }
  },
};

ChartJS.register(
  CategoryScale,
  BubbleController,

  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  piezoLine,
  readingsTARPLine
  // readingsShapes
);

interface InformationI {
  paddock: string;
  piezo: string;
  days: number;
  chartType: string;
}
interface ChartLimits {
  max: number;
  min: number;
}

function ReadingsChart({
  information,
  xData,
  yData,
  alarmAlert,
  limitAlert,
  chartLimits,
  fullPage = false,
}: {
  information: InformationI;
  xData: string[];
  yData: string[] | number[];
  fullPage: boolean;
  alarmAlert: boolean;
  limitAlert: boolean;
  chartLimits: ChartLimits;
}) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const piezoInformation = useMonitoringMapStateStore((s) => s.piezometersData);
  const lastReadings = useMonitoringMapStateStore((s) => s.lastReadings);

  const paddock = information.paddock.replace("/", "-");
  const piezo = information.piezo;
  const days = information.days;
  const chartType = information.chartType;

  const currentPiezometer = piezoInformation.find((p) => p.id === piezo);

  // console.log("XDATA", xData);
  console.log("YDATA", yData);

  console.log(chartLimits);
  const data = {
    labels: xData,

    datasets: [
      {
        label:
          information.chartType === "pressure"
            ? "Pressure (KPa)"
            : information.chartType === "wLevel"
            ? "Water Level (m)"
            : information.chartType === "wElevation"
            ? "Water Elevation (RLM)"
            : "Original ground (RLm)",
        data: yData,
        borderColor: currentPiezometer
          ? monitoringMapStatusInfo[currentPiezometer.status].normalColor
          : "rgba(123,136,49, 0.1)",
        backgroundColor: currentPiezometer
          ? monitoringMapStatusInfo[currentPiezometer.status].readingsBgColor
          : "rgba(123,136,49, 0.3)",
        pointRadius: 0,
        pointHitRadius: 4,
        order: 1,
        fill: { value: chartLimits.min },
      },
    ],
  };

  const options = {
    responsive: true,

    elements: {
      line: {
        tension: 0.1,
      },
    },

    animation: {
      duration: 0,
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `${currentPiezometer?.id} - ${currentPiezometer?.section} - ${currentPiezometer?.paddock} - Last ${days} days`,
      },
      // tooltip: {
      //   callbacks: {
      //     title: (ctx: any) => {
      //       return;
      //     },

      //     label: (ctx: any) => {
      //       return ` ${ctx.raw.name} ${
      //         ctx.raw.status == 1
      //           ? `${
      //               ctx.raw.reading - ctx.raw.y >= 0
      //                 ? `( ${ctx.raw.reading.toFixed(2)} RLm )`
      //                 : "( Negative reading )"
      //             }`
      //           : ""
      //       }`;
      //     },
      //   },
      // },

      readingsTARPLine: {
        display: limitAlert,
        tarpsValue: currentPiezometer?.tarps_value,
      },
      // piezoLine: {
      //   piezometersData: chartPiezometers,
      //   piezoInformation: piezometersData,
      //   XValues: labels,
      //   YTopValues: Y2SurveyLvl,
      // },
      // readingsShapes
    },

    scales: {
      x: {
        ticks: {
          font: {
            size: isMobile ? 8 : 10,
          },
          // maxTicksLimit: 20
          stepSize: 50,
        },

        grid: {
          display: true,
          order: 1,
          // drawTicks: true,
          color: "#f1f1f1",
        },
      },
      y: {
        ticks: {
          font: {
            size: isMobile ? 8 : 10,
          },
        },

        grid: {
          display: true,
          order: 1,

          // drawTicks: true,
          color: "#f1f1f1",
        },
        min: chartLimits.min,
        max: chartLimits.max,
      },
    },
  };

  if (!currentPiezometer || currentPiezometer.status === 4)
    return (
      <div className="flex flex-col gap-y-4">
        <div className={`${fullPage ? "h-[50vh]" : "h-[40vh]"}  w-full`}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            exit={{
              opacity: 0,
              transition: { duration: 0.2, ease: "easeInOut" },
            }}
            key="pressure-chart-no-data"
            className="h-full w-full flex justify-center items-center bg-white md:bg-[#f5f5f5] rounded-[12px] px-4"
          >
            <span className="font-semibold">
              Proposed piezometer. No readings yet!
            </span>
          </motion.div>
        </div>

        <div className="w-full flex justify-between gap-x-16 flex-wrap gap-y-8 ">
          <FullScreenButton comp={"chart"} />
          <ChartLegend chartType={chartType} />
        </div>
      </div>
    );

  if (!xData || xData.length === 0)
    return (
      <div className="flex flex-col gap-y-4">
        <div className={`${fullPage ? "h-[50vh]" : "h-[40vh]"}  w-full`}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            exit={{
              opacity: 0,
              transition: { duration: 0.2, ease: "easeInOut" },
            }}
            key="pressure-chart-no-data"
            className="h-full w-full flex justify-center items-center bg-white md:bg-[#f5f5f5] rounded-[12px] px-4"
          >
            <span className="font-semibold">
              No lectures recently. Please, increment the days span
            </span>
          </motion.div>
        </div>

        <div className="w-full flex justify-between gap-x-16 flex-wrap gap-y-8 ">
          <FullScreenButton comp={"chart"} />
          <ChartLegend chartType={chartType} />
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-y-4">
      {limitAlert ? (
        <div className="mt-6 text-red-700 flex items-center gap-x-2 2xl:gap-x-3 ">
          <FiAlertTriangle className="2xl:w-5 2xl:h-5" />

          <div className="flex gap-x-1 ">
            <span className="font-medium text-sm 2xl:text-base">Alert:</span>
            <span className="font-semibold text-sm 2xl:text-base ">
              TARPS limit exceeded
            </span>
          </div>
        </div>
      ) : alarmAlert ? (
        <div className="mt-6 text-amber-700 flex items-center gap-x-2 2xl:gap-x-3 ">
          <RiAlarmWarningLine className="2xl:w-5 2xl:h-5" />

          <div className="flex gap-x-1 ">
            <span className="font-medium text-sm 2xl:text-base">Warning:</span>
            <span className="font-semibold text-sm 2xl:text-base ">
              TARPS limit nearly reached
            </span>
          </div>
        </div>
      ) : null}

      <div className=" overflow-scroll  2xl:overflow-visible">
        <div className="min-w-[36rem] max-w-full">
          <div className={`${fullPage ? "h-[50vh]" : "h-[44vh]"}  w-full`}>
            <Line options={options} data={data} />
          </div>
        </div>
      </div>
      {fullPage ? (
        <>
          <div className="mt-4" />

          <div className="w-full flex justify-end gap-x-16 flex-wrap gap-y-8 ">
            <ChartLegend chartType={chartType} />
          </div>
        </>
      ) : (
        <div className="w-full flex justify-between gap-x-16 flex-wrap gap-y-8 ">
          {/* <FullScreenButton comp={"chart"} /> */}
          <ChartLegend chartType={chartType} />
        </div>
      )}
    </div>
  );
}

export default ReadingsChart;
