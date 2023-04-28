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
    <div className="flex flex-col gap-y-8 ">
      <div className="flex flex-col sz500:w-4/5 md:w-5/6 lg:w-full sz500:self-center sz500:grid sz500:grid-cols-4 md:grid-cols-3  gap-y-1 sz500:gap-y-8 gap-x-8">
        <span className="text-[10px] xl:text-xs 2xl:text-sm font-bold text-[#555] justify-self-end">
          Paddock section
        </span>

        <div className="sz500:col-span-3 md:col-span-2">
          <Select
            primaryColor="orange"
            value={{ value: paddock, label: paddock, disabled: false }}
            //@ts-ignore
            onChange={(e) => changePaddock(e.value)}
            options={paddockOptions}
            classNames={{
              //@ts-ignore
              menuButton: ({ isDisabled }) =>
                `flex text-xs sm:text-sm text-gray-500 border border-[#dfdfdf] shadow-sm  rounded-lg h-10 2xl:h-12 items-center   transition-all duration-300 focus:outline-none ${
                  isDisabled
                    ? "bg-gray-200"
                    : "text-sm bg-[#f5f5f5] text-[#333] font-semibold focus:border-orange-500 focus:border-opacity-50"
                }`,
            }}
          />
        </div>
      </div>
      <div className="flex flex-col sz500:w-4/5 md:w-5/6 lg:w-full sz500:self-center sz500:grid sz500:grid-cols-4 md:grid-cols-3  gap-y-1 sz500:gap-y-8 gap-x-8">
        <span className="text-[10px] xl:text-xs 2xl:text-sm font-bold text-[#555] justify-self-end">
          Piezometer ID
        </span>

        <div className="sz500:col-span-3 md:col-span-2">
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
    </div>
  );
}

export default ReportLocationTable;
