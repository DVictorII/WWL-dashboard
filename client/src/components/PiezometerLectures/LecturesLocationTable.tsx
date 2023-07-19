import React from "react";
import Select from "react-tailwindcss-select";

import { usePiezometerLecturesStateStore } from "../../store/PiezometerLecturesStateStore";
import { chartPiezoList } from "../../utils/piezoList";

function LecturesLocationTable() {
  const piezoList = usePiezometerLecturesStateStore((state) => state.piezoList);
  const paddock = usePiezometerLecturesStateStore((state) => state.paddock);
  const piezo = usePiezometerLecturesStateStore((state) => state.piezo);

  const changePaddock = usePiezometerLecturesStateStore(
    (state) => state.changePaddock
  );
  const changePiezo = usePiezometerLecturesStateStore(
    (state) => state.changePiezo
  );

  const paddockOptions = Object.keys(chartPiezoList).map((paddock) => {
    return { value: paddock, label: paddock };
  });

  const piezoOptions = piezoList.map((piezo) => {
    return { value: piezo, label: piezo };
  });

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6 xl:gap-x-10 z-[40] lg:col-span-2">
      <div className="flex flex-col gap-y-1">
        <h3 className=" text-[10px] xl:text-xs  font-semibold text-[#666]">
          Paddock section
        </h3>

        <Select
          primaryColor="orange"
          value={{ value: paddock, label: paddock, disabled: false }}
          //@ts-ignore
          onChange={(e) => changePaddock(e.value)}
          options={paddockOptions}
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
      <div className="flex flex-col gap-y-1">
        <h3 className="text-[10px] xl:text-xs  font-semibold text-[#666]">
          Piezometer ID
        </h3>

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
              `flex text-xs sm:text-sm text-gray-500 border border-[#dfdfdf] shadow-sm  rounded-full  items-center   transition-all duration-300 focus:outline-none ${
                isDisabled
                  ? "bg-gray-200"
                  : "bg-white text-[#333] font-semibold focus:border-orange-500 focus:border-opacity-50"
              }`,
          }}
        />
      </div>
    </div>
  );
}

export default LecturesLocationTable;
