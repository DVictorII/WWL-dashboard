import Datepicker from "react-tailwindcss-datepicker";
import moment from "moment";
import { usePiezometerLecturesStateStore } from "../../store/PiezometerLecturesStateStore";

function PiezoReadingsDateTable() {
  const date = usePiezometerLecturesStateStore((state) => state.date);
  const changeDate = usePiezometerLecturesStateStore(
    (state) => state.changeDate
  );

  const value = {
    startDate: date,
    endDate: date,
  };

  return (
    <div className="flex flex-col gap-y-1 z-[50] relative justify-center  ">
      {/* <h3 className=" text-[10px] xl:text-xs  font-semibold text-[#666] ">
        Date
      </h3> */}

      <Datepicker
        containerClassName="shrink-0 "
        inputClassName="text-xs  w-full  sm:text-sm  rounded-full bg-[#333] border-2 dark:border-[#333]  dark:bg-[#333] shadow-sm"
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
  );
}

export default PiezoReadingsDateTable;