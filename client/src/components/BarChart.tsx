import { ResponsiveLine } from "@nivo/line";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useQuery } from "react-query";
import moment from "moment";
import FadeLoader from "react-spinners/FadeLoader";
import FullScreenButton from "./PiezometerLectures/FullScreenButton";
import ChartLegend from "./PiezometerLectures/ChartLegend";

import { usePiezometerLecturesStateStore } from "../store/PiezometerLecturesStateStore";
import SkeletonBarChart from "./Skeletons/PiezometerLectures/SkeletonBarChart";
import { chartPiezoListWithElevation } from "../utils/piezoList";
import { FiAlertTriangle } from "react-icons/fi";

const CHART_PRESSURE_LIMIT = 80;

//@ts-ignore
const BarChart = ({ information, fullPage = false }) => {
  const [piezoData, setPiezoData] = useState([]);
  const [piezoElevationData, setPiezoElevationData] = useState([]);
  const [readingsWaterLevelData, setReadingsWaterLevelData] = useState([]);
  const [limits, setLimits] = useState({
    max: 0,
    min: 0,
  });

  const [limitAlert, setLimitAlert] = useState(false);

  const paddock = information.paddock.replace("/", "-");
  const piezo = information.piezo;
  const days = information.days;
  const chartType = information.chartType;

  const fetchPiezometerData = async () => {
    const result = await axios.get(`/piezometers-data/${paddock}/${piezo}`);

    return result.data.piezos[0];
  };

  const { isLoading: piezometersAreLoading, data: piezometersData } = useQuery(
    `Onepiezometer-${paddock}-${piezo}`,
    fetchPiezometerData
  );

  let datalogger = piezometersData?.datalogger;
  let channel = piezometersData?.channel;

  //@ts-ignore
  const fetchChartLectures = async (datalogger, channel) => {
    const result = await axios.get(
      `/lectures/node_${datalogger}_${channel}/${days}`
    );

    return result.data.lectures;
  };

  const { isLoading: lecturesAreLoading, data: lecturesData } = useQuery({
    queryKey: [
      `lecturesData-node_${datalogger}_${channel}-${days}`,
      datalogger,
      channel,
    ],
    queryFn: () => fetchChartLectures(datalogger, channel),
    // The query will not execute until the userId exists
    enabled: !!datalogger,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!lecturesData) return;
    //@ts-ignore
    const pressureDataFormat = lecturesData.map((data) => {
      return {
        x: moment(data.time).format("YYYY-MM-DD HH:MM:SS"),
        y: data.pressure,
      };
    });

    const pressureLimitFlag =
      //@ts-ignore
      lecturesData.filter((data) => data.pressure > CHART_PRESSURE_LIMIT)
        .length > 0;

    pressureLimitFlag ? setLimitAlert(true) : setLimitAlert(false);

    //@ts-ignore
    const pressureArray = lecturesData.map((data) => data.pressure);

    const maxLimit = Math.max(...pressureArray);
    const minLimit = Math.min(...pressureArray);

    const chartMargin = (maxLimit - minLimit) / 5;

    setLimits({
      max: maxLimit + chartMargin,
      min: minLimit - chartMargin,
    });

    //@ts-ignore
    const fullPiezoInfoObj = chartPiezoListWithElevation[paddock].find(
      //@ts-ignore
      (obj) => obj.id === piezo
    );

    //@ts-ignore
    const elevationDataFormat = lecturesData.map((data) => {
      return {
        x: moment(data.time).format("YYYY-MM-DD HH:MM:SS"),
        y: data.pressure / 10,
      };
    });

    //@ts-ignore
    const waterLevelDataFormat = lecturesData.map((data) => {
      return {
        x: moment(data.time).format("YYYY-MM-DD HH:MM:SS"),
        y: fullPiezoInfoObj.piezoElevation + data.pressure / 10,
      };
    });

    const pressureChartData = [
      {
        id: "pressureData",
        data: pressureDataFormat,
      },
    ];

    const elevationChartData = [
      {
        id: "elevationData",
        data: elevationDataFormat,
      },
    ];

    const waterElevationChartData = [
      {
        id: "waterElevationData",
        data: waterLevelDataFormat,
      },
    ];

    //@ts-ignore
    setPiezoElevationData(elevationChartData);
    //@ts-ignore
    setPiezoData(pressureChartData);
    //@ts-ignore
    setReadingsWaterLevelData(waterElevationChartData);
  }, [lecturesData]);

  if (piezometersAreLoading || lecturesAreLoading) return <SkeletonBarChart />;

  if (piezometersData.status === 4)
    return (
      <div className="flex flex-col gap-y-4">
        <div className={`${fullPage ? "h-[50vh]" : "h-[30vh]"}  w-full`}>
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

  if (!lecturesData || lecturesData.length === 0)
    return (
      <div className="flex flex-col gap-y-4">
        <div className={`${fullPage ? "h-[50vh]" : "h-[30vh]"}  w-full`}>
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
              Pressure limit exceeded
            </span>
          </div>
        </div>
      ) : null}
      <div className={`${fullPage ? "h-[50vh]" : "h-[30vh]"}  w-full`}>
        <AnimatePresence>
          {chartType === "pressure" && (
            <>
              {piezoData && piezoData.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.2, ease: "easeInOut" },
                  }}
                  key="pressure-chart"
                  className="w-full h-full bg-white rounded-[12px] "
                >
                  <ResponsiveLine
                    data={piezoData}
                    margin={{ top: 50, right: 20, bottom: 50, left: 50 }}
                    xScale={{
                      type: "time",
                      format: "%Y-%m-%d %H:%M:%S",
                      precision: "minute",
                    }}
                    xFormat="time:%Y-%m-%d %H:%M"
                    yScale={{
                      type: "linear",
                      min: limits.min,
                      max: limits.max,
                      stacked: false,
                      reverse: false,
                    }}
                    yFormat=" >-.2f"
                    curve="catmullRom"
                    enableArea={true}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                      format: "%d-%m-%y",
                      tickValues: `every ${Math.ceil(days / 20)} days`,
                      legend: "time scale",
                      legendOffset: -12,
                      tickRotation: -50,
                    }}
                    axisLeft={{
                      //@ts-ignore

                      orient: "left",
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      // legend: "Pressure (KPa)",
                      legendOffset: -45,
                      legendPosition: "middle",
                    }}
                    markers={[
                      {
                        axis: "y",
                        value: CHART_PRESSURE_LIMIT,
                        legend: "pressure limit",
                        lineStyle: {
                          stroke: "red",
                        },
                        textStyle: {
                          fontWeight: 600,
                          fill: "red",
                        },
                      },
                    ]}
                    colors="#477C9A"
                    enablePoints={false}
                    //@ts-ignore
                    lineWidth={piezoData > 500 ? 1 : 2}
                    pointSize={2}
                    pointColor={{ theme: "background" }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: "serieColor" }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                  />
                </motion.div>
              ) : null}
            </>
          )}

          {chartType === "wLevel" && (
            <>
              {piezoElevationData && piezoElevationData.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.2, ease: "easeInOut" },
                  }}
                  key="elevation-chart"
                  className={`${
                    fullPage ? "h-[50vh]" : "h-[30vh]"
                  }  w-full bg-white rounded-xl`}
                >
                  <ResponsiveLine
                    data={piezoElevationData}
                    margin={{ top: 50, right: 20, bottom: 50, left: 50 }}
                    xScale={{
                      type: "time",
                      format: "%Y-%m-%d %H:%M:%S",
                      precision: "minute",
                    }}
                    xFormat="time:%Y-%m-%d %H:%M"
                    yScale={{
                      type: "linear",
                      min: "auto",
                      max: "auto",
                      stacked: false,
                      reverse: false,
                    }}
                    yFormat=" >-.2f"
                    curve="catmullRom"
                    enableArea={true}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                      format: "%d-%m-%y",
                      tickValues: `every ${Math.ceil(days / 20)} days`,
                      legend: "time scale",
                      legendOffset: -12,
                      tickRotation: -50,
                    }}
                    axisLeft={{
                      //@ts-ignore
                      orient: "left",
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      // legend: "Elevation (m)",
                      legendOffset: -45,
                      legendPosition: "middle",
                    }}
                    colors="#BD6A1C"
                    enablePoints={false}
                    //@ts-ignore
                    lineWidth={piezoElevationData > 500 ? 1 : 2}
                    pointSize={2}
                    pointColor={{ theme: "background" }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: "serieColor" }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                  />
                </motion.div>
              ) : null}
            </>
          )}

          {chartType === "wElevation" && (
            <>
              {readingsWaterLevelData && readingsWaterLevelData.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.2, ease: "easeInOut" },
                  }}
                  key="waterElevation-chart"
                  className={`${
                    fullPage ? "h-[50vh]" : "h-[30vh]"
                  }  w-full bg-white rounded-xl`}
                >
                  <ResponsiveLine
                    data={readingsWaterLevelData}
                    margin={{ top: 20, right: 0, bottom: 50, left: 50 }}
                    xScale={{
                      type: "time",
                      format: "%Y-%m-%d %H:%M:%S",
                      precision: "minute",
                    }}
                    xFormat="time:%Y-%m-%d %H:%M"
                    yScale={{
                      type: "linear",
                      min: "auto",
                      max: "auto",
                      stacked: false,
                      reverse: false,
                    }}
                    yFormat=" >-.2f"
                    curve="catmullRom"
                    enableArea={true}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                      format: "%d-%m-%y",
                      tickValues: `every ${Math.ceil(days / 20)} days`,
                      legend: "time scale",
                      legendOffset: -12,
                      tickRotation: -50,
                    }}
                    axisLeft={{
                      //@ts-ignore
                      orient: "left",
                      tickSize: 5,
                      tickPadding: 5,
                      tickRotation: 0,
                      // legend: "Water Elevation (RLm)",
                      legendOffset: -45,
                      legendPosition: "middle",
                    }}
                    colors="#7B8831"
                    enablePoints={false}
                    //@ts-ignore
                    lineWidth={piezoElevationData > 500 ? 1 : 2}
                    pointSize={2}
                    pointColor={{ theme: "background" }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: "serieColor" }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                  />
                </motion.div>
              ) : null}
            </>
          )}
        </AnimatePresence>
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
          <FullScreenButton comp={"chart"} />
          <ChartLegend chartType={chartType} />
        </div>
      )}
    </div>
  );
};

export default BarChart;
