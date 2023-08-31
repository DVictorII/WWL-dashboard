import React from "react";
import ChartTypeTable from "./Filtering/ChartTypeTable";

//@ts-ignore
import BarChart from "./../BarChart";
import { useNewPiezoReportStateStore } from "../../store/NewPiezoReportStateStore";
import { useLocation } from "react-router-dom";
import { usePiezometerLecturesStateStore } from "../../store/PiezometerLecturesStateStore";

//@ts-ignore
import ReadingsChart from "../Charts/ReadingsChart";
import { useMonitoringMapStateStore } from "../../store/MonitoringMapStateStore";
import axios from "../../utils/axios";
import { useQuery } from "react-query";
import SkeletonBarChart from "../Skeletons/PiezometerLectures/SkeletonBarChart";
import moment from "moment";

function LecturesChart() {
  const location = useLocation().pathname;

  const paddock =
    location === "/operations/piezometer-readings"
      ? usePiezometerLecturesStateStore((s) => s.paddock)
      : useNewPiezoReportStateStore((state) => state.paddock);
  const piezo =
    location === "/operations/piezometer-readings"
      ? usePiezometerLecturesStateStore((s) => s.piezo)
      : useNewPiezoReportStateStore((state) => state.piezo);
  const days =
    location === "/operations/piezometer-readings"
      ? usePiezometerLecturesStateStore((s) => s.days)
      : useNewPiezoReportStateStore((state) => state.days);
  const chartType =
    location === "/operations/piezometer-readings"
      ? usePiezometerLecturesStateStore((s) => s.chartType)
      : useNewPiezoReportStateStore((state) => state.chartType);

  const piezoInformation = useMonitoringMapStateStore((s) => s.piezometersData);
  const lastReadings = useMonitoringMapStateStore((s) => s.lastReadings);
  const currentPiezometer = piezoInformation.find((p) => p.id === piezo);

  const fetchChartLectures = async (
    datalogger: number | undefined,
    channel: number | undefined
  ) => {
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
    // <BarChart
    //   information={{
    //     paddock,
    //     piezo,
    //     days,
    //     chartType,
    //   }}
    // />

    <ReadingsChart
      key={JSON.stringify(lecturesData)}
      xData={xTimeArr}
      yData={
        chartType === "pressure"
          ? pressureArray
          : chartType === "wLevel"
          ? wLevelArray
          : wElevationArray
      }
      alarmAlert={alarmAlert}
      limitAlert={limitAlert}
      chartLimits={
        chartType === "pressure"
          ? chartLimits.pressure
          : chartType === "wLevel"
          ? chartLimits.wLevel
          : chartLimits.wElevation
      }
      fullPage={false}
      information={{
        paddock,
        piezo,
        days,
        chartType,
      }}
    />
  );
}

export default LecturesChart;
