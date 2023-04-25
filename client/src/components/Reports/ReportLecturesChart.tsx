import React from 'react'
import { useLocation } from 'react-router-dom';
import { useNewPiezoReportStateStore } from '../../store/NewPiezoReportStateStore';
import ChartTypeTable from '../PiezometerLectures/Filtering/ChartTypeTable';

//@ts-ignore
import BarChart from "../BarChart"
import FullScreenButton from '../PiezometerLectures/FullScreenButton';
import ChartLegend from '../PiezometerLectures/ChartLegend';

function ReportLecturesChart({paddock, piezo}:{paddock:string, piezo:string}) {
    const location = useLocation().pathname

    const days =    useNewPiezoReportStateStore((state) => state.days);
    const chartType =  useNewPiezoReportStateStore((state) => state.chartType);
  
  
    return (
      <div className="flex flex-col gap-y-4">
        <ChartTypeTable />
        
        <div className="h-[50vh] w-full">
          <BarChart information={{
            paddock,piezo,days,chartType
          }}/>
        </div>
        
        <div className="w-full flex justify-between gap-x-16 flex-wrap gap-y-8 ">
          <FullScreenButton />
          <ChartLegend />
        </div>
      </div>
    );
}

export default ReportLecturesChart