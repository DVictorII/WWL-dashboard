import React from 'react'
import { useNewPiezoReportStateStore } from '../../store/NewPiezoReportStateStore';

function ReportState() {
    const title = useNewPiezoReportStateStore((state) => state.title);
  const photo = useNewPiezoReportStateStore((state) => state.photo);
  const description = useNewPiezoReportStateStore((state) => state.description);
  const date = useNewPiezoReportStateStore((state) => state.date);
  const supervisors = useNewPiezoReportStateStore((state) => state.supervisors);
  const paddock = useNewPiezoReportStateStore((state) => state.paddock);
  const piezo = useNewPiezoReportStateStore((state) => state.piezo);
  const days = useNewPiezoReportStateStore((state) => state.days);
  const chartType = useNewPiezoReportStateStore((state) => state.chartType);
  return (
    <div>
        <div className='flex items-center gap-x-8'>
            <span>title</span>
            <span>{title}</span>
        </div>

        <div className='flex items-center gap-x-8'>
            <span>photo</span>
            {/* @ts-ignore */}
            <span>{photo?.name}</span>
        </div>

        <div className='flex items-center gap-x-8'>
            <span>description</span>
            <span>{description}</span>
        </div>

        <div className='flex items-center gap-x-8'>
            <span>date</span>
            <span>{date}</span>
        </div>

        <div className='flex items-center gap-x-8'>
            <span>paddock</span>
            <span>{paddock}</span>
        </div>

        <div className='flex items-center gap-x-8'>
            <span>piezo</span>
            <span>{piezo}</span>
        </div>

        <div className='flex items-center gap-x-8'>
            <span>days</span>
            <span>{days}</span>
        </div>

        <div className='flex items-center gap-x-8'>
            <span>chartType</span>
            <span>{chartType}</span>
        </div>

        <div className='flex items-center gap-x-8'>
            <span>supervisors</span>
            <div className='flex flex-col gap-y-4'>

            {
                supervisors.map((sup,i)=>(
                    <div key={i}>Supervisor {i+1}: {sup}</div>
                ))
            }
            </div>
        </div>
    </div>
  )
}

export default ReportState