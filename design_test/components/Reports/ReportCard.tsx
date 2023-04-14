import React from 'react'
import {AiOutlineUser, AiOutlineCalendar} from "react-icons/ai"

function ReportCard() {
  return (
    <div className='w-64 mx-auto rounded-[8px] overflow-hidden shadow-sm'>
        <div className='h-28 '>
            <img src="/Rossing_mine.jpg" alt="mine" className='w-full h-full object-cover' />
        </div>

        <div className='bg-white p-4'>
       
                <span className='text-sm font-semibold'>First report test</span>
                


            <p className='text-xs text-[#555] mt-3'>Use these reports to keep track of any evaluation on a piezometer...</p>


            <div className='flex items-center justify-between mt-8'>
                <div className='flex flex-col gap-y-1'>
                    <div className='text-[10px] font-semibold'>
                        <span className='text-[10px] font-semibold'>CDIII</span> / <span className='text-[10px] font-semibold'>VW-CD3-02</span>
                    </div>
                    <div className='flex items-center gap-x-1'>
                        <AiOutlineCalendar className='w-3 h-3'/>
                        <span className='text-[10px] font-semibold'>
                            Jan 23, 2023
                        </span>
                    </div>
                </div>

                <div className='flex items-center gap-x-1'>
                    <div className='h-6 w-6 rounded-full bg-[#333] flex items-center justify-center'>
                        <AiOutlineUser className='w-3 h-3 text-white'/>
                    </div>

                    <span className='text-[10px] font-medium'>Aaron Smith</span>
                </div>


            </div>
        </div>
    </div>
  )
}

export default ReportCard