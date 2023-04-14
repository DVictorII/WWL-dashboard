import React from 'react'
import { usePiezometerLecturesStateStore } from '../../store/PiezometerLecturesStateStore';

function LecturesStateShowing() {

  const paddock = usePiezometerLecturesStateStore((s) => s.paddock);
  const piezo = usePiezometerLecturesStateStore((s) => s.piezo);
  const days = usePiezometerLecturesStateStore((s) => s.days);
  const chartType = usePiezometerLecturesStateStore((s) => s.chartType);

  return (
    <div>
        <h1>Showing state</h1>

        <div className='flex flex-col gap-y-4 mt-4'>
            <div className='flex items-center gap-x-4'>
                <span>ChartType:</span>
                <span>{chartType}</span>
            </div>

            <div className='flex items-center gap-x-4'>
                <span>Paddock:</span>
                <span>{paddock}</span>
            </div>

            <div className='flex items-center gap-x-4'>
                <span>Piezo:</span>
                <span>{piezo}</span>
            </div>

            <div className='flex items-center gap-x-4'>
                <span>Days:</span>
                <span>{days}</span>
            </div>
        </div>

    </div>
  )
}

export default LecturesStateShowing