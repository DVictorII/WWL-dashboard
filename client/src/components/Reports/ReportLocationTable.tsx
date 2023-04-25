import React from "react";
import { useNewPiezoReportStateStore } from "../../store/NewPiezoReportStateStore";
import { chartPiezoList } from "../../utils/piezoList";
import Select from "react-tailwindcss-select";

function ReportLocationTable() {
  const piezoList = useNewPiezoReportStateStore((state) => state.piezoList);
  const paddock = useNewPiezoReportStateStore((state) => state.paddock);
  const piezo = useNewPiezoReportStateStore((state) => state.piezo);

  const changePaddock = useNewPiezoReportStateStore(
    (state) => state.changePaddock
  );
  const changePiezo = useNewPiezoReportStateStore((state) => state.changePiezo);

  const paddockOptions = Object.keys(chartPiezoList).map((paddock) => {
    return { value: paddock, label: paddock };
  });

  const piezoOptions = piezoList.map((piezo) => {
    return { value: piezo, label: piezo };
  });

  return (
    <div className="grid grid-cols-2 gap-x-8 xl:gap-x-10 z-[40] w-full ">
      <div className="flex flex-col gap-y-1">
        <span className=" text-[10px] xl:text-xs 2xl:text-sm font-bold text-[#555]">
          Paddock section
        </span>

        <Select
          primaryColor="orange"
          value={{ value: paddock, label: paddock, disabled: false }}
          //@ts-ignore
          onChange={(e) => changePaddock(e.value)}
          options={paddockOptions}
          classNames={{
            //@ts-ignore
            menuButton: ({ isDisabled }) =>
              `flex text-sm text-gray-500 border border-gray-300 shadow-sm  rounded-xl h-10 2xl:h-12 items-center   transition-all duration-300 focus:outline-none ${
                isDisabled
                  ? "bg-gray-200"
                  : "bg-[#f9f9f9]  focus:border-orange-500 focus:border-opacity-50"
              }`,
          }}
        />
      </div>
      <div className="flex flex-col gap-y-1">
        <span className="text-[10px] xl:text-xs 2xl:text-sm font-bold text-[#555]">
          Piezometer ID
        </span>

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
              `flex text-sm text-gray-500 border border-gray-300 shadow-sm rounded-xl h-10 2xl:h-12 items-center   transition-all duration-300 focus:outline-none ${
                isDisabled
                  ? "bg-gray-200"
                  : "bg-[#f9f9f9]  focus:border-orange-500 focus:border-opacity-50"
              }`,
          }}
        />
      </div>
    </div>
  );
}

export default ReportLocationTable;
