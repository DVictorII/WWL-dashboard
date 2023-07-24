import React from "react";
import { AiFillEye } from "react-icons/ai";
import { useSectionImgStore } from "../../store/sectionImgStore";

function FullScreenButton({comp="chart", url}:{comp:string; url?:string}) {
  const openFullPageBarChart = useSectionImgStore((s) => s.openFullPageBarChart);
  const openSectionImg = useSectionImgStore((s) => s.openSectionImg);
  return (
    <button onClick={(e)=>{
      e.preventDefault()
      e.stopPropagation()

      if(comp==="chart") openFullPageBarChart()

      if(comp==="section") openSectionImg(url as string)


         
      
      }} className="flex items-center gap-x-2 cursor-pointer w-max shrink-0">
      <span className="text-xs font-semibold">Watch full screen</span>
      <AiFillEye />
    </button>
  );
}

export default FullScreenButton;
