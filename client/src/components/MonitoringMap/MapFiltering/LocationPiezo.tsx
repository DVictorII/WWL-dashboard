import React from "react";
import Select from "react-tailwindcss-select";
import { useMonitoringMapStateStore } from "../../../store/MonitoringMapStateStore";

function LocationPiezo() {
  const paddock = useMonitoringMapStateStore((state) => state.paddock);
  const piezo = useMonitoringMapStateStore((state) => state.piezo);
  const section = useMonitoringMapStateStore((state) => state.section);
  const changePiezo = useMonitoringMapStateStore((state) => state.changePiezo);

  const piezometersData = useMonitoringMapStateStore(
    (state) => state.piezometersData
  );

  const piezoOptions = [
    { value: "All", label: "All" },
    ...piezometersData
      .filter((piezoObj) => {
        if (section === "All") {
          if (paddock === "All") {
            return piezoObj;
          } else return piezoObj.paddock === paddock;
        }

        if (section === "?") {
          if (paddock === "All") {
            return (
              !piezoObj.section ||
              piezoObj.section === "?" ||
              piezoObj.section === "None"
            );
          } else
            return (
              (!piezoObj.section ||
                piezoObj.section === "?" ||
                piezoObj.section === "None") &&
              piezoObj.paddock === paddock
            );
        }

        if (paddock === "All") return piezoObj.section === section;

        return piezoObj.paddock === paddock && piezoObj.section === section;
      })
      .map((piezoObj) => {
        return { value: piezoObj.id, label: piezoObj.id };
      }),
  ];
  return (
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
        //@ts-ignore
        classNames={{
          //@ts-ignore
          menuButton: ({ isDisabled }) =>
            `flex text-xs 2xl:text-sm text-gray-500 border border-[#dfdfdf]  rounded-[4px]  items-center h-9 2xl:h-10  transition-all duration-300 focus:outline-none px-2 ${
              isDisabled
                ? "bg-gray-200"
                : " bg-white text-[#333] font-semibold focus:border-orange-500 focus:border-opacity-50"
            }`,
          menu: "absolute z-20 w-full bg-white shadow-lg border rounded py-1 mt-1.5 text-sm text-gray-700",
        }}
      />
    </div>
  );
}

export default LocationPiezo;
