import React from "react";
import { useNewIncidentReportStateStore } from "../../../store/NewIncidentReportStateStore";

function IncidentTitleDescription() {
  const title = useNewIncidentReportStateStore((state) => state.title);
  const changeTitle = useNewIncidentReportStateStore(
    (state) => state.changeTitle
  );

  const description = useNewIncidentReportStateStore(
    (state) => state.description
  );
  const changeDescription = useNewIncidentReportStateStore(
    (state) => state.changeDescription
  );

  return (
    <div className="flex flex-col gap-y-8 ">
      <div className="flex flex-col sz500:w-4/5 md:w-5/6 lg:w-full sz500:self-center sz500:grid sz500:grid-cols-4 md:grid-cols-3  gap-y-1 sz500:gap-y-8 gap-x-8">
        <span className="text-[10px] xl:text-xs 2xl:text-sm font-bold text-[#555] justify-self-end">
          Incident title
        </span>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => changeTitle(e.target.value)}
          className="sz500:col-span-3 md:col-span-2 text-xs sm:text-sm bg-[#f5f5f5] text-[#333] font-semibold placeholder:text-[#dfdfdf] px-3 h-10 2xl:h-12 rounded-lg shadow-sm border border-[#dfdfdf]  focus:outline-none focus:border-orange-500 focus:border-opacity-50 transition-all"
          placeholder="Title..."
        />
      </div>

      <div className="flex flex-col sz500:w-4/5 md:w-5/6 lg:w-full sz500:self-center sz500:grid sz500:grid-cols-4 md:grid-cols-3  gap-y-1 sz500:gap-y-8 gap-x-8">
        <span className="text-[10px] xl:text-xs 2xl:text-xs sm:text-sm font-bold text-[#555] justify-self-end w-max">
          Incident description
        </span>
        <textarea
          name="description"
          value={description}
          onChange={(e) => changeDescription(e.target.value)}
          className="sz500:col-span-3 md:col-span-2 text-sm bg-[#f5f5f5] text-[#333] font-semibold placeholder:text-[#dfdfdf] px-3 py-3 h-14 2xl:h-16 rounded-lg shadow-sm border border-[#dfdfdf]  focus:outline-none focus:border-orange-500 focus:border-opacity-50  transition-all"
          placeholder="Description..."
        />
      </div>
    </div>
  );
}

export default IncidentTitleDescription;
