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
    <div className="flex flex-col gap-y-1 z-[50] relative justify-center w-full ">
      <h3 className=" text-[10px] xl:text-xs  font-semibold text-[#666] ">
        Date
      </h3>

      <Datepicker
        readOnly={true}
        toggleClassName="hidden"
        containerClassName="shrink-0 "
        inputClassName="text-xs border-2 dark:border-[#333] w-full text-white px-4 py-2  sm:text-sm  rounded-full bg-[#333]  dark:bg-[#333] shadow-sm"
        useRange={false}
        asSingle={true}
        // showShortcuts={true}
        // showFooter={true}
        primaryColor={"orange"}
        value={value}
        onChange={(value) => {
          console.log("VALUE", value);

          if (!value || value.startDate === null || value.startDate === null)
            return;
          //@ts-ignore
          changeDate(value.startDate);
        }}
        displayFormat={"MMM DD, YYYY"}
      />
    </div>
  );
}

export default DateTable;
