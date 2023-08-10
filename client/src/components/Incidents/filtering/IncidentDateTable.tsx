import { useNewIncidentReportStateStore } from "../../../store/NewIncidentReportStateStore";
import Datepicker from "react-tailwindcss-datepicker";
import moment from "moment";

function IncidentDateTable() {
  const date = useNewIncidentReportStateStore((state) => state.date);
  const changeDate = useNewIncidentReportStateStore(
    (state) => state.changeDate
  );

  const value = {
    startDate: date,
    endDate: date,
  };

  return (
    <div className="flex flex-col sz500:w-4/5 md:w-5/6 lg:w-full sz500:self-center sz500:grid sz500:grid-cols-4 md:grid-cols-3  gap-y-1 sz500:gap-y-8 gap-x-8 z-[50] relative">
      <span className="text-[10px] xl:text-xs 2xl:text-sm font-bold text-[#555] justify-self-end">
        Report date
      </span>

      <div className="sz500:col-span-3 md:col-span-2">
        <Datepicker
          inputClassName="text-xs sm:text-sm py-4 rounded-xl bg-all-normal dark:bg-all-normal"
          useRange={false}
          asSingle={true}
          // showShortcuts={true}
          // showFooter={true}
          primaryColor={"orange"}
          value={value}
          onChange={(value) => {
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

export default IncidentDateTable;
