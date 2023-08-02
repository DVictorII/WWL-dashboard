import React from "react";
import { useNewIncidentReportStateStore } from "../../../store/NewIncidentReportStateStore";
import { chartPiezoList } from "../../../utils/piezoList";
import Select from "react-tailwindcss-select";

function IncidentPaddock() {
  const paddock = useNewIncidentReportStateStore((state) => state.paddock);
  const changePaddock = useNewIncidentReportStateStore(
    (state) => state.changePaddock
  );

  const paddockOptions = Object.keys(chartPiezoList).map((paddock) => {
    return { value: paddock, label: paddock };
  });

  return (
    <div className=" flex flex-col gap-y-1  xl:grid xl:grid-cols-3 gap-x-4">
      <span className="text-[10px] xl:text-xs  font-semibold text-[#666] justify-self-end">
        Site Paddock
      </span>

      <div className="xl:col-span-2">
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
    </div>
  );
}

export default IncidentPaddock;