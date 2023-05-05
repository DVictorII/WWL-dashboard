import React from "react";
import { BsArrowDownUp } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonPiezoListTable() {
  return (
    <div
      className={`max-w-[1000vh] h-[21rem] md:h-[24rem] overflow-x-auto rounded-lg border-2 border-[#333] bg-white shadow-sm`}
    >
      <table className="select-none w-full border-collapse bg-white">
        <thead>
          <tr
            className={`w-full flex items-center px-8 whitespace-nowrap   gap-x-10 md:gap-x-12 justify-evenly   text-xs h-12  font-medium text-white bg-[#222]`}
          >
            <th className="flex items-center gap-x-2 w-16 md:w-20 justify-center ">
              <span className="text-[11px] md:text-xs">Piezo. ID</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th className="flex items-center gap-x-2 w-16 md:w-20 justify-center">
              <span className="text-[11px] md:text-xs">Paddock</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th className="flex items-center gap-x-2 w-16 md:w-20 justify-center">
              <span className="text-[11px] md:text-xs">Section</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th className="flex items-center gap-x-2 w-24 md:w-28 justify-center">
              <span className="text-[11px] md:text-xs">Coordinates</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th className="flex items-center gap-x-2 w-16 md:w-20 justify-center">
              <span className="text-[11px] md:text-xs">Depth</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th className="flex items-center gap-x-2 w-24 md:w-28 justify-center">
              <span className="text-[11px] md:text-xs">Current PWP</span>
              <BsArrowDownUp className="w-2" />
            </th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {
            //@ts-ignore
            Array(7)
              .fill(0)
              .map((_, i) => {
                return (
                  <tr
                    style={{
                      backgroundColor: i % 2 === 0 ? "#E7E8EA" : "#fff",
                    }}
                    className="w-full flex items-center whitespace-nowrap  gap-x-10 md:gap-x-12 px-8  h-12  "
                  >
                    <th className="flex items-center gap-x-2 w-16 md:w-20 justify-center">
                      <Skeleton width={60} height={20} />
                    </th>

                    <th className="flex items-center gap-x-2 w-16 md:w-20 justify-center">
                      <span className="text-[9px] md:text-[10px]">
                        <Skeleton width={60} height={20} />
                      </span>
                    </th>

                    <th className="flex items-center gap-x-2 w-16 md:w-20 justify-center">
                      <span className="text-[9px] md:text-[10px]">
                        <Skeleton width={60} height={20} />
                      </span>
                    </th>

                    <th className="flex flex-col gap-y-1 items-center gap-x-2 w-24 md:w-28 justify-center">
                      <span className="text-[9px] md:text-[10px]">
                        <Skeleton width={60} height={20} count={2} />
                      </span>
                    </th>

                    <th
                      className="flex items-center gap-x-2 
                          w-16 md:w-20 justify-center"
                    >
                      <span className={"text-[9px] md:text-[10px]"}>
                        <Skeleton width={60} height={20} />
                      </span>
                    </th>

                    <th className="flex items-center gap-x-2 w-24 md:w-28 justify-center">
                      <span className="text-[9px] md:text-[10px]">
                        <Skeleton width={60} height={20} />
                      </span>
                    </th>
                  </tr>
                );
              })
          }
        </tbody>
      </table>
    </div>
  );
}

export default SkeletonPiezoListTable;
