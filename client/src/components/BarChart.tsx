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

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
//@ts-ignore
const BarChart = ({ information }) => {
  const [piezoData, setPiezoData] = useState([]);
  const [piezoElevationData, setPiezoElevationData] = useState([]);

  const paddock = information.paddock;
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
    if (lecturesData) {
      //@ts-ignore
      const pressureDataFormat = lecturesData.map((data) => {
        return {
          x: moment(data.time).format("YYYY-MM-DD HH:MM:SS"),
          y: data.pressure,
        };
      });

      //@ts-ignore
      const elevationDataFormat = lecturesData.map((data) => {
        return {
          x: moment(data.time).format("YYYY-MM-DD HH:MM:SS"),
          y: data.pressure / 10,
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

      //@ts-ignore
      setPiezoElevationData(elevationChartData);
      //@ts-ignore
      setPiezoData(pressureChartData);
    }
  }, [lecturesData]);

  if (piezometersAreLoading || lecturesAreLoading) return <SkeletonBarChart />;

  if (piezometersData.status === 4)
    return (
      <div className="flex flex-col gap-y-4">
        <div className="h-[50vh] w-full">
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
              Proposed piezometer. No lectures yet!
            </span>
          </motion.div>
        </div>

        <div className="w-full flex justify-between gap-x-16 flex-wrap gap-y-8 ">
          <FullScreenButton comp={"chart"} />
          <ChartLegend />
        </div>
      </div>
    );

  if (!lecturesData || lecturesData.length === 0)
    return (
      <div className="flex flex-col gap-y-4">
        <div className="h-[50vh] w-full">
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
          <ChartLegend />
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-y-4">
      <div className="h-[50vh] w-full">
        <AnimatePresence>
          {chartType === "pressure" ? (
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
                    margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
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
                      legend: "Pressure (KPa)",
                      legendOffset: -45,
                      legendPosition: "middle",
                    }}
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
          ) : (
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
                  className="w-full h-[50vh] bg-white rounded-[12px]"
                >
                  <ResponsiveLine
                    data={piezoElevationData}
                    margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
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
                      legend: "Elevation (m)",
                      legendOffset: -45,
                      legendPosition: "middle",
                    }}
                    colors="#831B1B"
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
      <div className="w-full flex justify-between gap-x-16 flex-wrap gap-y-8 ">
        <FullScreenButton comp={"chart"} />
        <ChartLegend />
      </div>
    </div>
  );
};

export default BarChart;
