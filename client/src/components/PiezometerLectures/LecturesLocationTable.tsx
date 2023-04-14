import React from "react";
import Select from "react-tailwindcss-select";
import { AiOutlineSearch } from "react-icons/ai";
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
      <div className="flex items-center gap-x-8 xl:gap-x-10 flex-wrap gap-y-6 md:gap-y-8 xl:gap-y-10">
        <div className="flex flex-col gap-y-1 min-w-[15rem]">
          <h3 className=" text-[10px] xl:text-xs 2xl:text-sm font-semibold">
            Paddock section
          </h3>

          <Select
            primaryColor="orange"
            value={{ value: paddock, label: paddock, disabled: false }}
            //@ts-ignore
            onChange={(e) => changePaddock(e.value)}
            options={paddockOptions}
            //@ts-ignore
            classNames={{
              //@ts-ignore
              menuButton: ({ isDisabled }) =>
                `flex  text-sm  text-gray-500 border border-gray-300 rounded-xl  shadow-sm  transition-all duration-300 focus:outline-none ${
                  isDisabled
                    ? "bg-gray-200"
                    : "bg-white hover:border-gray-400 focus:border-[#F97316] focus:ring focus:ring-[#F97316]/20 transition-all"
                }`,
            }}
          />
        </div>
        <div className="flex flex-col gap-y-1 min-w-[15rem]">
          <h3 className="text-[10px] xl:text-xs 2xl:text-sm font-semibold">
            Piezometer ID
          </h3>

          <Select
            primaryColor="orange"
            //@ts-ignore
            value={{ value: piezo, label: piezo }}
            //@ts-ignore
            onChange={(e) => changePiezo(e.value)}
            options={piezoOptions}
            //@ts-ignore
            classNames={{
              //@ts-ignore
              menuButton: ({ isDisabled }) =>
                `flex text-sm text-gray-500 border border-gray-300 rounded-xl shadow-sm  transition-all duration-300 focus:outline-none ${
                  isDisabled
                    ? "bg-gray-200"
                    : "bg-white hover:border-gray-400 focus:border-[#F97316] focus:ring focus:ring-[#F97316]/20 transition-all"
                }`,
            }}
          />
        </div>
      </div>
      <div className="relative">
        <AiOutlineSearch className="absolute top-3 right-4 text-gray-500" />
        <input
          type="text"
          className="text-sm px-3 py-2 rounded-[10px] border-2 border-[#ccc] focus:outline-none focus:border-[#F97316] focus:ring focus:ring-[#F97316]/20 transition-all"
          placeholder="Search..."
        />
      </div>
    </div>
  );
}

export default LecturesLocationTable;
