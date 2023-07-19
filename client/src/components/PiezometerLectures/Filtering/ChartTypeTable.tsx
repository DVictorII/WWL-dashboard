import React from "react";
import Select from "react-tailwindcss-select";
import { usePiezometerLecturesStateStore } from "../../../store/PiezometerLecturesStateStore";
import { useLocation } from "react-router-dom";
import { useNewPiezoReportStateStore } from "../../../store/NewPiezoReportStateStore";

const chartTypeOptions = [
  {
    value: "pressure",
    label: "Pressure (KPa)",
  },
  {
    value: "wLevel",
    label: "Water level (m)",
  },
  {
    value: "wElevation",
    label: "Water elevation (RLm)",
  },
];

function ChartTypeTable() {
  const location = useLocation().pathname;

  const chartType =
    location === "/piezometer-readings"
      ? usePiezometerLecturesStateStore((s) => s.chartType)
      : useNewPiezoReportStateStore((state) => state.chartType);
  const changeChartType =
    location === "/piezometer-readings"
      ? usePiezometerLecturesStateStore((s) => s.changeChartType)
      : useNewPiezoReportStateStore((state) => state.changeChartType);

  return (
    <div>
      <Select
        primaryColor="orange"
        value={{
          value: chartType,
          label: chartTypeOptions.find((obj) => obj.value === chartType)
            ?.label as string,
        }}
        //@ts-ignore
        onChange={(e) => changeChartType(e.value)}
        options={chartTypeOptions}
        //@ts-ignore
        classNames={{
          //@ts-ignore
          menuButton: ({ isDisabled }) =>
            `flex text-xs sm:text-sm text-gray-500 border border-[#dfdfdf] shadow-sm  rounded-full  items-center   transition-all duration-300 focus:outline-none ${
              isDisabled
                ? "bg-gray-200"
                : "bg-white text-[#333] font-semibold focus:border-orange-500 focus:border-opacity-50"
            }`,
        }}
      />
    </div>
  );
}

export default ChartTypeTable;
