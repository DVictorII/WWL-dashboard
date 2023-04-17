import React from 'react'
import DateTable from './DateTable'
import LocationTable from './LocationTable'
import StatusTable from './StatusTable'

function PiezoFilterComp() {
  return (
    <div className='flex flex-col gap-y-8'>
      <StatusTable/>

      <DateTable/>
      <LocationTable/>

    </div>
  )
}

export default PiezoFilterComp