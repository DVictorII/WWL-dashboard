import React,{useEffect} from "react";
import { useNewPiezoReportStateStore } from "../../store/NewPiezoReportStateStore";

function ReportTitleDescription() {

    const title = useNewPiezoReportStateStore((state)=>state.title)
    const changeTitle = useNewPiezoReportStateStore((state)=>state.changeTitle)

    const description = useNewPiezoReportStateStore((state)=>state.description)
    const changeDescription = useNewPiezoReportStateStore((state)=>state.changeDescription)


  return (
    <div className="grid grid-cols-1 sz400:grid-cols-2 gap-x-8 gap-y-8">
      <div className="flex flex-col gap-y-1">
        <span className="text-[10px] xl:text-xs 2xl:text-sm font-bold text-[#555]">
          Report title
        </span>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e)=>changeTitle(e.target.value)}
          className="text-sm bg-[#f9f9f9] text-[#333] font-medium placeholder:text-gray-300 px-3 h-10 2xl:h-12 rounded-xl shadow-sm border border-gray-300 focus:outline-none focus:border-orange-500 focus:border-opacity-50 transition-all"
          placeholder="Title..."
        />
      </div>

      <div className="flex flex-col gap-y-1">
        <span className="text-[10px] xl:text-xs 2xl:text-sm font-bold text-[#555]">
          Report description
        </span>
        <textarea
        name="description"
        value={description}
        onChange={(e)=>changeDescription(e.target.value)}
          className="text-sm bg-[#f9f9f9] text-[#333] font-medium placeholder:text-gray-300 px-3 py-3 h-14 2xl:h-16 rounded-xl shadow-sm border border-gray-300 focus:outline-none focus:border-orange-500 focus:border-opacity-50  transition-all"
          placeholder="Description..."
        />
      </div>
    </div>
  );
}

export default ReportTitleDescription;
