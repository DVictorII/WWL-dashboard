import { useMonitoringMapStateStore } from '@/store/MonitoringMapStateStore';
import React from 'react'

function StateShowing() {

    const status = useMonitoringMapStateStore((state) => state.status);
    const paddock = useMonitoringMapStateStore((state) => state.paddock);
    const piezo = useMonitoringMapStateStore((state) => state.piezo);
    const date = useMonitoringMapStateStore((state) => state.date);

  return (
    <div>
        <h1>Showing state</h1>

        <div className='flex flex-col gap-y-4 mt-4'>
            <div className='flex items-center gap-x-4'>
                <span>Status:</span>
                <span>{status}</span>
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
                <span>Date:</span>
                <span>{date}</span>
            </div>
        </div>

    </div>
  )
}

export default StateShowing