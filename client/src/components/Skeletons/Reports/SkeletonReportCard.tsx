import React from "react";
import { AiOutlineCalendar } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";

function SkeletonReportCard() {
  return (
    <div
      className={`w-48 md:w-56 mx-auto h-full rounded-[6px] md:rounded-[8px] overflow-hidden shadow-md my-1 shrink-0`}
    >
      <div className="h-24 md:h-28  ">
        <Skeleton width="100%" height="100%" />
      </div>

      <div className="bg-white p-2 md:p-3">
        <div className="flex justify-between gap-x-4 items-center ">
          <Skeleton containerClassName="w-28 md:w-32 h-7 md:h-8 flex items-center" />

          <Skeleton
            width={20}
            height={20}
            circle
            containerClassName="flex items-center"
          />
        </div>

        <Skeleton
          width="100%"
          height={30}
          containerClassName="mt-1 md:mt-2 flex items-center"
        />

        <div className="w-full h-[2px] bg-all-normal bg-opacity-10 mt-4" />

        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col justify-center gap-y-2">
            <Skeleton
              width={60}
              height={8}
              containerClassName="w-16 h-2 flex items-center"
            />

            <Skeleton
              width={80}
              height={8}
              containerClassName="w-20 h-2 flex items-center"
            />
          </div>

          <div className="flex items-center gap-x-1">
            <Skeleton
              width={16}
              height={16}
              circle
              containerClassName="flex items-center"
            />

            <div className="flex flex-col justify-center gap-y-2 ">
              <Skeleton
                width={50}
                height={8}
                containerClassName="w-14 h-2 flex items-center"
              />

              <Skeleton
                width={50}
                height={8}
                containerClassName="w-14 h-2 flex items-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonReportCard;
