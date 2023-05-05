import React from "react";
import SkeletonPiezoInformationTable from "../PiezometerLectures/SkeletonPiezoInformationTable";
import Skeleton from "react-loading-skeleton";
import SkeletonInoperativeDaysTable from "./SkeletonInoperativeDaysTable";

function SkeletonPiezoInfoWithInoperativeDaysTable() {
  return (
    <div className="flex flex-col gap-y-8 md:gap-y-4">
      <h2 className="font-bold text-sm 2xl:text-base">Report details</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 xl:gap-x-10 gap-y-8 md:gap-y-0 lg:gap-y-8 xl:gap-y-10">
        <div className=" md:px-4 md:py-8 flex flex-col gap-y-4 ">
          <h2 className="text-sm md:text-base font-semibold flex items-center gap-x-2">
            <Skeleton width={100} height={20} /> /{" "}
            <Skeleton width={100} height={20} />
          </h2>
          <SkeletonPiezoInformationTable />
        </div>

        <div className=" md:px-4 md:pb-8 md:pt-7 flex flex-col gap-y-4 ">
          <div className="flex items-center gap-x-4 lg:self-end">
            <span className="text-sm md:text-base font-semibold">
              Days span:{" "}
            </span>

            <Skeleton width={60} height={30} />
          </div>
          <SkeletonInoperativeDaysTable />
        </div>
      </div>
    </div>
  );
}

export default SkeletonPiezoInfoWithInoperativeDaysTable;
