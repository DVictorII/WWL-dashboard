import Datepicker from "react-tailwindcss-datepicker";

import moment from "moment";
import { useMonitoringMapStateStore } from "../../../store/MonitoringMapStateStore";

function DateTable() {
  const date = useMonitoringMapStateStore((state) => state.date);
  const changeDate = useMonitoringMapStateStore((state) => state.changeDate);

  const value = {
    startDate: date,
    endDate: date,
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
      <div className="flex flex-col gap-y-1 z-[50] relative justify-center w-full ">
        <h3 className=" text-[10px] xl:text-xs  font-bold text-[#666] ">
          Date
        </h3>

        <Datepicker
          containerClassName="shrink-0"
          inputClassName="text-xs py-1 w-full  sm:text-sm  rounded-full dark:bg-[#333] shadow-sm"
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
          displayFormat={"MMM DD, YYYY"}
          readOnly={true}
        />
      </div>
    </div>
  );
}

export default DateTable;
