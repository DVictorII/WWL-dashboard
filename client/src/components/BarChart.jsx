import { ResponsiveLine } from "@nivo/line";

import { AnimatePresence, motion } from "framer-motion";
import Legend from "./Legend";
import { useEffect, useState } from "react";
import axios from "../utils/axios";
import { useQuery } from "react-query";
import moment from "moment";
import FadeLoader from "react-spinners/FadeLoader";

import {usePiezometerLecturesStateStore} from "./../store/PiezometerLecturesStateStore"

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const BarChart = ({information}) => {
  const [piezoData, setPiezoData] = useState([]);
  const [piezoElevationData, setPiezoElevationData] = useState([]);

  const paddock = information.paddock;
  const piezo = information.piezo;
  const days = information.days;
  const chartType = information.chartType;


  const fetchPiezometerData = async () => {
    const result = await axios.get(
      `/piezometers-data/${paddock}/${piezo}`
    );

    return result.data.piezos[0];
  };

  const { isLoading: piezometersAreLoading, data: piezometersData } = useQuery(
    `Onepiezometer-${paddock}-${piezo}`,
    fetchPiezometerData
  );

  let datalogger = piezometersData?.datalogger;
  let channel = piezometersData?.channel;

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
      const pressureDataFormat = lecturesData.map((data) => {
        return {
          x: moment(data.time).format("YYYY-MM-DD HH:MM:SS"),
          y: data.pressure,
        };
      });

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

      setPiezoElevationData(elevationChartData);
      setPiezoData(pressureChartData);
    }
  }, [lecturesData]);

  if (piezometersAreLoading || lecturesAreLoading)
    return (
      <div className="w-full h-[50vh] md:h-[60vh]  overflow-visible flex justify-center items-center">
        <FadeLoader
          color="#BD9C45"
          loading={piezometersAreLoading}
          radius={50}
        />
      </div>
    );

  if (!lecturesData || lecturesData.length === 0)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        exit={{
          opacity: 0,
          transition: { duration: 0.2, ease: "easeInOut" },
        }}
        key="pressure-chart-no-data"
        className="h-full w-full flex justify-center items-center bg-[#f5f5f5] md:bg-white rounded-[12px] px-4"
      >
        
          <span className="font-semibold">No lectures recently. Please, increment the days span</span>
        
      </motion.div>
    );

  return (
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
  );
};

export default BarChart;
