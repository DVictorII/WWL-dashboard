import React from 'react'
import { useSectionImgStore } from '../store/sectionImgStore';
//@ts-ignore
import BarChart from "./Barchart"

interface Information {
    paddock:string
    piezo:string
    days: string | number
    chartType:string
}

function FullPageComps({information}:{information:Information}) {
    const sectionImgIsOpen = useSectionImgStore((s) => s.sectionImgIsOpen);
    const closeSectionImg = useSectionImgStore((s) => s.closeSectionImg);
  
    const fullPageBarChartIsOpen = useSectionImgStore((s) => s.fullPageBarChartIsOpen);
    const closeFullPageBarChart = useSectionImgStore((s) => s.closeFullPageBarChart);
  
    const imgURL = useSectionImgStore((s) => s.imgURL);

  return (
    <>
    {
        sectionImgIsOpen ? (<div className="fixed top-0 left-0 h-screen w-screen z-[100] flex items-center justify-center">
            <div onClick={closeSectionImg} className="absolute top-0 left-0 w-full h-full bg-[#222222] bg-opacity-50 blur-md  "/>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[700px] md:w-4/5 rounded-[14px] overflow-hidden shadow-sm shadow-sky-900  rotate-90 origin-center lg:rotate-0">
              <img className=" w-full "  src={imgURL} />
            </div>
        </div>)
    :null  
      }

      {
        fullPageBarChartIsOpen ? (<div className="fixed top-0 left-0 h-screen w-screen z-[100] flex items-center justify-center">
            <div onClick={closeFullPageBarChart} className="absolute top-0 left-0 w-full h-full bg-[#222222] bg-opacity-50 blur-md  "/>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[700px] md:w-4/5 rounded-[14px] h-1/2  shadow-sm shadow-sky-900  rotate-90 origin-center lg:rotate-0 ">
                <BarChart information={information} />
            </div>
        </div>)
    :null  
      }
    </>
  )
}

export default FullPageComps