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
    <div className="flex justify-between items-end gap-x-16 gap-y-8 flex-wrap">
      <div className="grid grid-cols-2 gap-x-8 xl:gap-x-10 z-[40] w-full sm:w-3/4 lg:w-1/2">
        <div className="flex flex-col gap-y-1">
          <h3 className=" text-[10px] xl:text-xs  font-bold text-[#555]">
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
                `flex text-xs sm:text-sm text-gray-500 border border-[#dfdfdf] shadow-sm  rounded-lg h-10 2xl:h-12 items-center   transition-all duration-300 focus:outline-none ${
                  isDisabled
                    ? "bg-gray-200"
                    : "text-xs sm:text-sm bg-[#f5f5f5] text-[#333] font-semibold focus:border-orange-500 focus:border-opacity-50"
                }`,
            }}
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <h3 className="text-[10px] xl:text-xs  font-bold text-[#555]">
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
                `flex text-xs sm:text-sm text-gray-500 border border-[#dfdfdf] shadow-sm  rounded-lg h-10 2xl:h-12 items-center   transition-all duration-300 focus:outline-none ${
                  isDisabled
                    ? "bg-gray-200"
                    : "text-xs sm:text-sm bg-[#f5f5f5] text-[#333] font-semibold focus:border-orange-500 focus:border-opacity-50"
                }`,
            }}
          />
        </div>
      </div>
      {/* <div className="relative">
        <AiOutlineSearch className="absolute top-1/2 -translate-y-1/2 right-4 text-gray-500" />
        <input
          type="text"
          className="text-sm px-3 h-12 rounded-[10px] border-2 border-[#ccc] focus:outline-none focus:border-[#F97316] focus:ring focus:ring-[#F97316]/20 transition-all"
          placeholder="Search..."
        />
      </div> */}
    </div>
  );
}

export default LecturesLocationTable;
