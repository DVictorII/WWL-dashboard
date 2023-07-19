import React from "react";
import { useNewPiezoReportStateStore } from "../../../store/NewPiezoReportStateStore";
import { chartPiezoList } from "../../../utils/piezoList";
import Select from "react-tailwindcss-select";

function ReportPiezo() {
  const piezoList = useNewPiezoReportStateStore((state) => state.piezoList);

  const piezo = useNewPiezoReportStateStore((state) => state.piezo);

  const changePiezo = useNewPiezoReportStateStore((state) => state.changePiezo);

  const piezoOptions = piezoList.map((piezo) => {
    return { value: piezo, label: piezo };
  });

  return (
    <div className=" flex flex-col gap-y-1  xl:grid xl:grid-cols-3 gap-x-4">
      <span className="text-[10px] xl:text-xs 2xl:text-sm font-bold text-[#555] justify-self-end">
        Piezometer ID
      </span>

      <div className="xl:col-span-2">
        <Select
          primaryColor="orange"
          //@ts-ignore
          value={{ value: piezo, label: piezo }}
          //@ts-ignore
          onChange={(e) => changePiezo(e.value)}
          options={piezoOptions}
          classNames={{
            //@ts-ignore
            menuButton: ({ isDisabled }) =>
              `flex text-xs sm:text-sm text-gray-500 border border-[#dfdfdf] shadow-sm rounded-lg h-10 2xl:h-12 items-center   transition-all duration-300 focus:outline-none ${
                isDisabled
                  ? "bg-gray-200"
                  : "text-sm bg-[#f5f5f5] text-[#333] font-semibold focus:border-orange-500 focus:border-opacity-50"
              }`,
          }}
        />
      </div>
    </div>
  );
}

export default ReportPiezo;
