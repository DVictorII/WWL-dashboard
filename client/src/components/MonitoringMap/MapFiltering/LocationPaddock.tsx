import React from "react";
import { mapPiezoList } from "../../../utils/piezoList";
import Select from "react-tailwindcss-select";
import { useMonitoringMapStateStore } from "../../../store/MonitoringMapStateStore";

function LocationPaddock() {
  const paddock = useMonitoringMapStateStore((state) => state.paddock);
  const paddockOptions = Object.keys(mapPiezoList).map((paddock) => {
    return { value: paddock, label: paddock };
  });

  const changePaddock = useMonitoringMapStateStore(
    (state) => state.changePaddock
  );

  return (
    <div className="flex flex-col gap-y-1 ">
      <h3 className="text-[10px] xl:text-xs  font-semibold text-[#666]">
        Paddock
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
            `flex text-xs 2xl:text-sm  text-gray-500 border border-[#dfdfdf]   rounded-[4px] h-9 2xl:h-10  items-center   transition-all duration-300 focus:outline-none px-2 relative  ${
              isDisabled
                ? "bg-gray-200"
                : "bg-white text-[#333] font-semibold focus:border-orange-500 focus:border-opacity-50"
            }`,
          menu: "absolute z-20 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
        }}
      />
    </div>
  );
}

export default LocationPaddock;
