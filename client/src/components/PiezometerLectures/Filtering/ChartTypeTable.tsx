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
            `max-w-[15rem] flex text-sm text-gray-500 border border-gray-300 shadow-sm  rounded-xl h-10 2xl:h-12 items-center   transition-all duration-300 focus:outline-none ${
              isDisabled
                ? "bg-gray-200"
                : "bg-[#f9f9f9]  focus:border-orange-500 focus:border-opacity-50"
            }`,
        }}
      />
    </div>
  );
}

export default ChartTypeTable;
