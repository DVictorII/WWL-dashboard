import React from "react";
import Skeleton from "react-loading-skeleton";

function SkeletonInoperativeDaysTable() {
  return (
    <div
      className={`w-full h-[19rem] overflow-y-auto rounded-lg border-2 bg-white border-damaged-dark`}
    >
      <table className="select-none w-full border-collapse bg-white">
        <thead>
          <tr
            className={`w-full flex items-center px-4 xl:px-8  text-xs h-12  font-medium text-white bg-damaged-dark`}
          >
            <th className="flex items-center gap-x-2 ">
              <span className="text-[11px] md:text-xs text-start leading-relaxed">
                Inoperative days
              </span>
            </th>
          </tr>
        </thead>

        <tbody className="bg-white">
          <tr
            //   style={{
            //     backgroundColor:
            //       i % 2 === 0 ? selectedStatus.lightColor : "#fff",
            //   }}
            className="w-full h-[15rem] flex items-center  xl:px-8  bg-white p-2 "
          >
            <th className="w-full h-full  ">
              <Skeleton
                width={"100%"}
                height={"100%"}
                containerClassName="w-full h-full"
              />
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SkeletonInoperativeDaysTable;
