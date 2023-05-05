import React from "react";
import MenuNavbar from "../../MenuNavbar";
import Skeleton from "react-loading-skeleton";
import SkeletonReportCard from "../Reports/SkeletonReportCard";
import SkeletonReportListTable from "../Reports/SkeletonReportListTable";
import SkeletonIncidentListTable from "./SkeletonIncidentListTable";
import SkeletonIncidentMapMultiple from "./SkeletonIncidentMapMultiple"

function SkeletonIncidentReportPage() {
  return (
    <>
      <MenuNavbar />

      <div className="items-center flex flex-wrap justify-between mt-12 md:mt-0 gap-x-8 gap-y-4">
        <h1 className=" md:text-lg 2xl:text-xl font-bold">Incident Reports</h1>

        <div className="flex items-center gap-x-4">
          <div className="w-8 h-8 xl:w-10 xl:h-10">
            <Skeleton circle width="100%" height="100%" />
          </div>

          <Skeleton width={80} height={30} />
        </div>
      </div>

      <div className="bg-backgroundWhite md:bg-white   md:px-8 md:py-10  rounded-2xl mt-12 flex flex-col gap-y-12 md:shadow-lg ">
        <div className="grid-cols-1  grid gap-x-10 gap-y-10  ">
          <div className="  flex flex-col  gap-y-4 w-full ">
            <h2 className="font-bold text-sm 2xl:text-base">
              Featured reports
            </h2>

            <div className="w-full py-1 overflow-x-hidden flex gap-x-8">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <SkeletonReportCard />
                ))}
            </div>
          </div>
        </div>

        <div className="  flex flex-col  gap-y-4  ">
          <h2 className="font-bold text-sm 2xl:text-base">Incident List</h2>

          <div className="grid grid-cols-1">
            <SkeletonIncidentListTable />
          </div>
        </div>

        <div className="  flex flex-col  gap-y-4  ">
          <h2 className="font-bold text-sm 2xl:text-base">Incidents Interactive Map</h2>

          <div className="grid grid-cols-1">
            <SkeletonIncidentMapMultiple />
          </div>
        </div>
      </div>
    </>
  );
}

export default SkeletonIncidentReportPage;
