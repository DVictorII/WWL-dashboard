import React from "react";
import { useMonitoringMapStateStore } from "../../../store/MonitoringMapStateStore";
import Select from "react-tailwindcss-select";

function LocationSection() {
  const sectionsList = useMonitoringMapStateStore(
    (state) => state.sectionsList
  );
  const section = useMonitoringMapStateStore((state) => state.section);

  const selectSection = useMonitoringMapStateStore(
    (state) => state.selectSection
  );

  const sectionOptions = sectionsList.map((section) => {
    return { value: section, label: section };
  });

  return (
    <div className="flex flex-col gap-y-1">
      <h3 className="text-[10px] xl:text-xs  font-semibold text-[#666]">
        Section
      </h3>

      <Select
        primaryColor="orange"
        //@ts-ignore
        value={{ value: section, label: section }}
        onChange={(e) => {
          //@ts-ignore
          selectSection(e.value);
        }}
        options={sectionOptions}
        //@ts-ignore
        classNames={{
          //@ts-ignore
          menuButton: ({ isDisabled }) =>
            `flex text-xs sm:text-sm text-gray-500 border border-[#dfdfdf] shadow-sm  rounded-full  items-center   transition-all duration-300 focus:outline-none px-2 ${
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

export default LocationSection;
