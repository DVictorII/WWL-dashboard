import React from "react";
import { BsArrowDownUp } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";

function SkeletonIncidentListTable() {
  return (
    <div
      className={`max-w-[1000vh] h-[21rem] sm:h-[24.5rem] md:h-[28rem] overflow-x-auto rounded-lg border-2 bg-white border-[#451919]`}
    >
      <table className=" select-none w-full border-collapse bg-white">
        <thead>
          <tr
            className={`w-full flex items-center px-8 whitespace-nowrap  gap-x-10 md:gap-x-12 justify-evenly  h-14  font-medium text-white bg-[#451919]`}
          >
            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center ">
              <span className="text-[11px] md:text-xs">N°</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center ">
              <span className="text-[11px] md:text-xs">Created by</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span className="text-[11px] md:text-xs">Incident title</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span className="text-[11px] md:text-xs">Report date</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span className="text-[11px] md:text-xs">Incident location</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span className="text-[11px] md:text-xs">At Paddock</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center"></th>

            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center"></th>
            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center"></th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {Array(8)
            .fill(0)
            .map((_, i) => (
              <tr
                key={i}
                style={{
                  backgroundColor: i % 2 === 0 ? "#F2E8E8" : "white",
                }}
                className="w-full flex items-center justify-evenly whitespace-nowrap gap-x-10 md:gap-x-12 px-8  text-[9px] md:text-[10px] h-14 bg-white "
              >
                <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center">
                  <Skeleton width={60} height={20} />
                </th>

                <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
                  <Skeleton width={24} height={24} circle />
                  <Skeleton width={60} height={20} />
                </th>

                <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center ">
                  <Skeleton width={60} height={20} />
                </th>

                <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
                  <Skeleton width={60} height={20} />
                </th>

                <th className="flex items-center gap-x-1 w-36 md:w-40 justify-center">
                  <Skeleton width={100} height={20} />
                </th>
                <th className="flex items-center gap-x-1 w-36 md:w-40 justify-center">
                  <Skeleton width={100} height={20} />
                </th>

                <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center">
                  <Skeleton width={60} height={20} />
                </th>

                <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center">
                  <Skeleton width={60} height={20} />
                </th>
                <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center">
                  <Skeleton width={28} height={28} circle />
                </th>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default SkeletonIncidentListTable;
