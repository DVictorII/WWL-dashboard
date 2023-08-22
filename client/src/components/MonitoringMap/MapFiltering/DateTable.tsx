import { useMemo } from "react";
import Datepicker from "react-tailwindcss-datepicker";

import { useMonitoringMapStateStore } from "../../../store/MonitoringMapStateStore";
import { monitoringMapStatusInfo } from "../../../utils/monitoringMapStatusInfo";

function DateTable() {
  const date = useMonitoringMapStateStore((state) => state.date);
  const changeDate = useMonitoringMapStateStore((state) => state.changeDate);

  const status = useMonitoringMapStateStore((s) => s.status);

  const statusInfoObj = monitoringMapStatusInfo[Number(status)];
  console.log(statusInfoObj);
  const value = {
    startDate: date,
    endDate: date,
  };

  return (
    <div className="flex flex-col gap-y-1 z-[50] relative justify-center w-full ">
      <h3 className=" text-[10px] xl:text-xs  font-semibold text-[#666] z-[1] ">
        Date
      </h3>

      <Datepicker
        readOnly={true}
        toggleClassName="hidden"
        containerClassName="shrink-0 "
        inputClassName={`font-semibold text-xs border-2 border-[${statusInfoObj.darkColor}] dark:border-[${statusInfoObj.darkColor}] w-full  px-4 py-2  sm:text-sm  rounded-full   text-[${statusInfoObj.darkColor}]   `}
        useRange={false}
        asSingle={true}
        // showShortcuts={true}
        // showFooter={true}
        primaryColor={"orange"}
        value={value}
        onChange={(value) => {
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
