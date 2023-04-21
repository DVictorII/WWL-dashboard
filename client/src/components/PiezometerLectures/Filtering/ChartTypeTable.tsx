import React from "react";
import Select from "react-tailwindcss-select";
import { usePiezometerLecturesStateStore } from "../../../store/PiezometerLecturesStateStore";
import { useLocation } from "react-router-dom";
import { useNewPiezoReportStateStore } from "../../../store/NewPiezoReportStateStore";

const chartTypeOptions = [
  {
    value: "pressure",
    label: "Pressure (Kpa)",
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

  const location = useLocation().pathname

  const chartType = location === "/piezometer-lectures" ? usePiezometerLecturesStateStore((s) => s.chartType):  useNewPiezoReportStateStore((state) => state.chartType);
  const changeChartType = location === "/piezometer-lectures" ? usePiezometerLecturesStateStore((s) => s.changeChartType):  useNewPiezoReportStateStore((state) => state.changeChartType);



  return (
    <div>
      <Select
        primaryColor="orange"
        value={{
          value: chartType,
          label: chartTypeOptions.find(obj=>obj.value === chartType)?.label as string,
        }}
        //@ts-ignore
        onChange={(e) => changeChartType(e.value)}
        options={chartTypeOptions}
        //@ts-ignore
        classNames={{
          //@ts-ignore
          menuButton: ({ isDisabled }) =>
            `max-w-[15rem] flex text-sm text-gray-500 border-2 border-gray-300 rounded-xl py-1 shadow-sm  transition-all duration-300 focus:outline-none ${
              isDisabled
                ? "bg-gray-200"
                : "bg-white hover:border-gray-400 focus:border-[#F97316] focus:ring focus:ring-[#F97316]/20 transition-all"
            }`,
        }}
      />
    </div>
  );
}

export default ChartTypeTable;
