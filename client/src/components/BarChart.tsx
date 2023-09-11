import { ResponsiveLine } from "@nivo/line";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useQuery } from "react-query";
import moment from "moment";

import FullScreenButton from "./PiezometerLectures/FullScreenButton";
import ChartLegend from "./PiezometerLectures/ChartLegend";

import SkeletonBarChart from "./Skeletons/PiezometerLectures/SkeletonBarChart";
import { chartPiezoListWithElevation } from "../utils/piezoList";
import { FiAlertTriangle } from "react-icons/fi";
import { useMonitoringMapStateStore } from "../store/MonitoringMapStateStore";
import { monitoringMapStatusInfo } from "../utils/monitoringMapStatusInfo";
import { RiAlarmWarningLine } from "react-icons/ri";

//@ts-ignore
const BarChart = ({ information, fullPage = false }) => {
  const [piezoData, setPiezoData] = useState([]);
  const [piezoElevationData, setPiezoElevationData] = useState([]);
  const [readingsWaterLevelData, setReadingsWaterLevelData] = useState([]);
  const [limits, setLimits] = useState({
    pressure: {
      max: 0,
      min: 0,
    },
    wLevel: {
      max: 0,
      min: 0,
    },
    wElevation: {
      max: 0,
      min: 0,
    },
  });

  const [alarmAlert, setAlarmAlert] = useState(false);
  const [limitAlert, setLimitAlert] = useState(false);

  const piezoInformation = useMonitoringMapStateStore((s) => s.piezometersData);
  const lastReadings = useMonitoringMapStateStore((s) => s.lastReadings);

  const paddock = information.paddock.replace("/", "-");
  const piezo = information.piezo;
  const days = information.days;
  const chartType = information.chartType;

  const currentPiezometer = piezoInformation.find((p) => p.id === piezo);

  // const fetchPiezometerData = async () => {
  //   const result = await axios.get(`/piezometers-data/${paddock}/${piezo}`);

  //   return result.data.piezos[0];
  // };

  // const { isLoading: piezometersAreLoading, data: piezometersData } = useQuery(
  //   `Onepiezometer-${paddock}-${piezo}`,
  //   fetchPiezometerData
  // );

  // let datalogger = piezometersData?.datalogger;
  // let channel = piezometersData?.channel;

  //@ts-ignore
  const fetchChartLectures = async (datalogger, channel) => {
    const result = await axios.get(
      `/lectures/node_${datalogger}_${channel}/${days}`
    );

    return result.data.lectures;
  };

  const { isLoading: lecturesAreLoading, data: lecturesData } = useQuery({
    queryKey: [
      `lecturesData-node_${currentPiezometer?.datalogger}_${currentPiezometer?.channel}-${days}`,
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

  useEffect(() => {
    if (!lecturesData) return;
    //@ts-ignore

    const lastReading = lastReadings.find(
      (r) =>
        r.node === currentPiezometer?.datalogger &&
        r.channel === currentPiezometer?.channel
    );

    console.log("LAST READINGS", lastReading);

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

      pressureAlarmFlag ? setAlarmAlert(true) : setAlarmAlert(false);
      pressureLimitFlag ? setLimitAlert(true) : setLimitAlert(false);
    }

    //@ts-ignore
    const pressureArray = lecturesData.map((data) => data.pressure);
    //@ts-ignore
    const wLevelArray = lecturesData.map((data) => data.pressure / 10);

    const wElevationArray = lecturesData.map(
      //@ts-ignore
      (data) => {
        return Number(currentPiezometer?.elevation) + data.pressure / 10;
      }
    );

    const maxPressureLimit = Math.max(...pressureArray);
    const minPressureLimit = Math.min(...pressureArray);

    const maxWLevelLimit = Math.max(...wLevelArray);
    const minWLevelLimit = Math.min(...wLevelArray);

    const maxWElevationLimit = Math.max(...wElevationArray);
    const minWElevationLimit = Math.min(...wElevationArray);

    setLimits({
      pressure: {
        max: maxPressureLimit + 50,
        min: minPressureLimit - 10,
      },
      wLevel: {
        max: maxWLevelLimit + 5,
        min: minWLevelLimit - 1,
      },
      wElevation: {
        max: maxWElevationLimit + 5,
        min: minWElevationLimit - 1,
      },
    });

    //@ts-ignore
    const pressureDataFormat = lecturesData.map((data) => {
      return {
        x: moment(data.time).format("YYYY-MM-DD HH:mm:ss"),
        y: data.pressure,
      };
    });

    //@ts-ignore
    const elevationDataFormat = lecturesData.map((data) => {
      return {
        x: moment(data.time).format("YYYY-MM-DD HH:mm:ss"),
        y: data.pressure / 10,
      };
    });

    //@ts-ignore
    const waterLevelDataFormat = lecturesData.map((data) => {
      // console.log("TIME", moment(data.time).format("YYYY-MM-DD HH:mm:ss"));
      return {
        x: moment(data.time).format("YYYY-MM-DD HH:mm:ss"),
        y: Number(currentPiezometer?.elevation) + data.pressure / 10,
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
  }, [lecturesData, currentPiezometer]);

  if (lecturesAreLoading || !currentPiezometer) return <SkeletonBarChart />;

  if (currentPiezometer.status === 4)
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

  if (!lecturesData || lecturesData.length === 0)
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
          <div className={`${fullPage ? "h-[50vh]" : "h-[40vh]"}  w-full`}>
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
                          useUTC: false,
                        }}
                        xFormat="time:%Y-%m-%d %H:%M"
                        yScale={{
                          type: "linear",
                          min: limitAlert
                            ? limits.pressure.min + 10 <
                              Number(currentPiezometer.tarps_value)
                              ? limits.pressure.min
                              : Number(currentPiezometer.tarps_value) - 10
                            : limits.pressure.min,
                          max: limits.pressure.max,
                          stacked: false,
                          reverse: false,
                        }}
                        yFormat=" >-.2f"
                        curve="natural"
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
                        markers={
                          alarmAlert && currentPiezometer?.status === 1
                            ? [
                                {
                                  axis: "y",
                                  value: Number(currentPiezometer.tarps_value),
                                  legend: "pressure limit",
                                  lineStyle: {
                                    stroke: "red",
                                  },
                                  textStyle: {
                                    fontWeight: 600,
                                    fill: "red",
                                  },
                                },
                              ]
                            : []
                        }
                        colors={
                          //@ts-ignore
                          monitoringMapStatusInfo[currentPiezometer?.status | 0]
                            .normalColor
                        }
                        enablePoints={false}
                        //@ts-ignore
                        lineWidth={lecturesData.length > 500 ? 1 : 2}
                        pointSize={2}
                        pointColor={{ theme: "background" }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: "serieColor" }}
                        pointLabelYOffset={-12}
                        useMesh={true}
                        areaBaselineValue={
                          limitAlert
                            ? limits.pressure.min + 10 <
                              Number(currentPiezometer.tarps_value)
                              ? limits.pressure.min
                              : Number(currentPiezometer.tarps_value) - 10
                            : limits.pressure.min
                        }
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
                        fullPage ? "h-[50vh]" : "h-[40vh]"
                      }  w-full bg-white rounded-xl`}
                    >
                      <ResponsiveLine
                        data={piezoElevationData}
                        margin={{ top: 50, right: 20, bottom: 50, left: 50 }}
                        xScale={{
                          type: "time",
                          format: "%Y-%m-%d %H:%M:%S",
                          precision: "minute",
                          useUTC: false,
                        }}
                        xFormat="time:%Y-%m-%d %H:%M"
                        yScale={{
                          type: "linear",
                          min: limitAlert
                            ? limits.pressure.min + 10 <
                              Number(currentPiezometer.tarps_value)
                              ? limits.wLevel.min
                              : Number(currentPiezometer.tarps_value) / 10 - 1
                            : limits.wLevel.min,
                          max: limits.wLevel.max,
                          stacked: false,
                          reverse: false,
                        }}
                        yFormat=" >-.2f"
                        curve="natural"
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
                        colors={
                          //@ts-ignore
                          monitoringMapStatusInfo[currentPiezometer?.status | 0]
                            .normalColor
                        }
                        markers={
                          alarmAlert && currentPiezometer?.status === 1
                            ? [
                                {
                                  axis: "y",
                                  value: 5,
                                  legend: "Water Level limit",
                                  lineStyle: {
                                    stroke: "red",
                                  },
                                  textStyle: {
                                    fontWeight: 600,
                                    fill: "red",
                                  },
                                },
                              ]
                            : []
                        }
                        enablePoints={false}
                        //@ts-ignore
                        lineWidth={lecturesData.length > 500 ? 1 : 2}
                        pointSize={2}
                        pointColor={{ theme: "background" }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: "serieColor" }}
                        pointLabelYOffset={-12}
                        useMesh={true}
                        areaBaselineValue={
                          limitAlert
                            ? limits.pressure.min + 10 <
                              Number(currentPiezometer.tarps_value)
                              ? limits.wLevel.min
                              : Number(currentPiezometer.tarps_value) / 10 - 1
                            : limits.wLevel.min
                        }
                      />
                    </motion.div>
                  ) : null}
                </>
              )}

              {chartType === "wElevation" && (
                <>
                  {readingsWaterLevelData &&
                  readingsWaterLevelData.length > 0 ? (
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
                        fullPage ? "h-[50vh]" : "h-[40vh]"
                      }  w-full bg-white rounded-xl`}
                    >
                      <ResponsiveLine
                        data={readingsWaterLevelData}
                        margin={{ top: 20, right: 0, bottom: 50, left: 50 }}
                        xScale={{
                          type: "time",
                          format: "%Y-%m-%d %H:%M:%S",
                          precision: "minute",
                          useUTC: false,
                        }}
                        xFormat="time:%Y-%m-%d %H:%M"
                        yScale={{
                          type: "linear",
                          min: limitAlert
                            ? limits.pressure.min + 10 <
                              Number(currentPiezometer.tarps_value)
                              ? limits.wElevation.min
                              : Number(currentPiezometer.elevation) +
                                Number(currentPiezometer.tarps_value) / 10 -
                                1
                            : limits.wElevation.min,
                          max: limits.wElevation.max,
                          stacked: false,
                          reverse: false,
                        }}
                        yFormat=" >-.2f"
                        curve="natural"
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
                        markers={
                          alarmAlert && currentPiezometer?.status === 1
                            ? [
                                {
                                  axis: "y",
                                  value: currentPiezometer
                                    ? Number(currentPiezometer.elevation) + 5
                                    : 605,
                                  legend: "Water Elevation limit",
                                  lineStyle: {
                                    stroke: "red",
                                  },
                                  textStyle: {
                                    fontWeight: 600,
                                    fill: "red",
                                  },
                                },
                              ]
                            : []
                        }
                        colors={
                          //@ts-ignore
                          monitoringMapStatusInfo[currentPiezometer?.status | 0]
                            .normalColor
                        }
                        enablePoints={false}
                        //@ts-ignore
                        lineWidth={lecturesData.length > 500 ? 1 : 2}
                        pointSize={2}
                        pointColor={{ theme: "background" }}
                        pointBorderWidth={2}
                        pointBorderColor={{ from: "serieColor" }}
                        pointLabelYOffset={-12}
                        useMesh={true}
                        areaBaselineValue={
                          limitAlert
                            ? limits.pressure.min + 10 <
                              Number(currentPiezometer.tarps_value)
                              ? limits.wElevation.min
                              : Number(currentPiezometer.elevation) +
                                Number(currentPiezometer.tarps_value) / 10 -
                                1
                            : limits.wElevation.min
                        }
                      />
                    </motion.div>
                  ) : null}
                </>
              )}
            </AnimatePresence>
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
};

export default BarChart;
