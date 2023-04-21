import React,{useEffect} from 'react'
import { useNewPiezoReportStateStore } from '../../store/NewPiezoReportStateStore';
import Datepicker from 'react-tailwindcss-datepicker';
import moment from 'moment';

function ReportDateTable() {
    const date = useNewPiezoReportStateStore((state) => state.date);
    const changeDate = useNewPiezoReportStateStore((state) => state.changeDate);

    useEffect(()=>{
        console.log(date)
    },[date])
  
    const value = {
      startDate: date,
      endDate: date,
    };
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 xl:gap-x-10 z-[50] relative">
        <div className="flex flex-col gap-y-1">
          <h3 className="text-[10px] xl:text-xs 2xl:text-sm font-bold text-[#555] shadow-sm">Report date</h3>
  
          <Datepicker
            inputClassName="h-10 2xl:h-12 rounded-xl dark:bg-[#222222] shadow-sm"
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

export default ReportDateTable