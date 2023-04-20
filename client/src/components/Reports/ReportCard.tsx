import React,{useEffect} from 'react'
import {AiOutlineUser, AiOutlineCalendar} from "react-icons/ai"
import { BsBookmarkHeart } from 'react-icons/bs'


function ReportCard() {

  return (
    <div className={`w-48 md:w-56 mx-auto rounded-[6px] md:rounded-[8px] overflow-hidden shadow-sm`}>
        <div className='h-24 md:h-28  '>
            <img src="/media/img/photos/Rossing_mine.jpg" alt="mine" className='w-full h-full object-cover' />
        </div>

        <div className='bg-white p-2 md:p-3'>
       
            <div className='flex justify-between gap-x-4 items-center'>
                <span className='text-xs md:text-base font-semibold'>First report test</span>

                <div className='w-5 h-5 border border-[#333] rounded-full flex justify-center items-center'>
                    <BsBookmarkHeart className='w-3 h-3'/>
                </div>


            </div>
                


            <p className='text-[8px] md:text-[10px] text-[#555] mt-1 md:mt-2'>Use these reports to keep track of any evaluation on a piezometer...</p>

            <div className='w-full h-[2px] bg-[#333] bg-opacity-10 mt-4'/>


            <div className='flex items-center justify-between mt-4'>
                <div className='flex flex-col gap-y-1 md:gap-y-2'>
                    <div className=' text-[8px] md:text-[10px] font-semibold'>
                        <span className=' font-semibold'>CDIII</span> / <span className=' font-semibold'>VW-CD3-02</span>
                    </div>
                    <div className='flex items-center gap-x-1'>
                        <AiOutlineCalendar className='w-2 h-2 md:w-3 md:h-3'/>
                        <span className='text-[8px] md:text-[10px] font-semibold'>
                            Jan 23, 2023
                        </span>
                    </div>
                </div>

                <div className='flex items-center gap-x-1'>
                    <div className=' h-4 w-4 md:h-6 md:w-6 rounded-full bg-[#333] flex items-center justify-center'>
                        <AiOutlineUser className='w-2 h-2 md:w-3 md:h-3 text-white'/>
                    </div>

                    <div className='flex flex-col'>
                        <span className='text-[6px] md:text-[8px] font-medium text-[#777] '>Writen by</span>
                        <span className=' text-[8px] md:text-[10px] font-semibold'>Aaron Smith</span>
                    </div>

                    
                </div>


            </div>
        </div>
    </div>
  )
}

export default ReportCard