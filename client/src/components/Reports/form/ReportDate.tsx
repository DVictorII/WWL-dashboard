import React, { useEffect } from "react";
import { useNewPiezoReportStateStore } from "../../../store/NewPiezoReportStateStore";
import Datepicker from "react-tailwindcss-datepicker";
import moment from "moment";

function ReportDate() {
  const date = useNewPiezoReportStateStore((state) => state.date);
  const changeDate = useNewPiezoReportStateStore((state) => state.changeDate);

  useEffect(() => {
    console.log(date);
  }, [date]);

  const value = {
    startDate: date,
    endDate: date,
  };

  return (
    <div className=" flex flex-col gap-y-1  xl:grid xl:grid-cols-3 gap-x-4">
      <span className="text-[10px] xl:text-xs  font-semibold text-[#666] justify-self-end">
        Report date
      </span>

      <div className="xl:col-span-2">
        <Datepicker
          inputClassName=" text-xs sm:text-sm py-3 rounded-[500px] dark:bg-all-normal"
          useRange={false}
          asSingle={true}
          // showShortcuts={true}
          // showFooter={true}
          primaryColor={"orange"}
          value={value}
          onChange={(value) => {
            console.log(value);

            if (!value || value.startDate === null)
              return changeDate(moment(Date.now()).format("YYYY-MM-DD"));
            //@ts-ignore
            changeDate(value.startDate);
          }}
          displayFormat={"MMM DD YYYY"}
          readOnly={true}
        />
      </div>
    </div>
  );
}

export default ReportDate;
