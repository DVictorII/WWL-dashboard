import moment from "moment";
import React from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { useNewIncidentReportStateStore } from "../../../store/NewIncidentReportStateStore";

function IncidentDate() {
  const date = useNewIncidentReportStateStore((state) => state.date);
  const changeDate = useNewIncidentReportStateStore(
    (state) => state.changeDate
  );

  const value = {
    startDate: date,
    endDate: date,
  };

  return (
    <div className=" flex flex-col gap-y-1  xl:grid xl:grid-cols-3 gap-x-4">
      <span className="text-[10px] xl:text-xs  font-semibold text-[#666] justify-self-end">
        Report date
      </span>

      <div className="sz500:col-span-3 md:col-span-2">
        <Datepicker
          toggleClassName="hidden"
          containerClassName="shrink-0 "
          inputClassName="text-xs border-2 dark:border-[#333] w-full text-white px-4 py-2  sm:text-sm  rounded-full bg-[#333]  dark:bg-[#333] shadow-sm"
          useRange={false}
          asSingle={true}
          // showShortcuts={true}
          // showFooter={true}
          primaryColor={"orange"}
          value={value}
          //@ts-ignore
          onChange={(value) => {
            if (!value || value.startDate === null)
              return changeDate(moment(Date.now()).format("YYYY-MM-DD"));
            //@ts-ignore
            changeDate(value.startDate);
          }}
          displayFormat={"MMM DD, YYYY"}
          readOnly={true}
        />
      </div>
    </div>
  );
}

export default IncidentDate;
