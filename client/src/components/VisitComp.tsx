import React from "react";
import { AiTwotoneCalendar } from "react-icons/ai";
import { Link } from "react-router-dom";
// @ts-ignore
import { boxShadow, boxShadowSlight } from "../utils/shadow";

function VisitComp() {
  return (
    <Link to={`/biannual-visits/1`}>
      <div
        className="relative p-4 sm:p-8 pr-12 sm:pr-20 rounded-[14px] overflow-hidden cursor-pointer shadow-sm "
        
      >
        <span className="text-xl 2xl:text-2xl font-semibold">
          Biannual review - 360 Photos - May 2022
        </span>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 sm:mt-8 md:mt-10 gap-y-4 gap-x-6">
          <div className="flex items-center gap-x-4 2xl:text-xl">
            <span>2022 - 05 - 02</span>
            <AiTwotoneCalendar className="w-6 h-6 2xl:w-7 2xl:h-7" />
          </div>
        </div>

        <div className="absolute top-0 right-0 h-full w-[20px] 2xl:w-[22px] bg-orange-900" />
      </div>
    </Link>
  );
}

export default VisitComp;
