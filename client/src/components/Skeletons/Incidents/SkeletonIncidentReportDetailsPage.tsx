import React from "react";
import MenuNavbar from "../../MenuNavbar";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import SkeletonIncidentSupervisorsView from "./SkeletonIncidentSupervisorsView";
import SkeletonIncidentLocationShowcaseMap from "./SkeletonIncidentLocationShowcaseMap";
import SkeletonIncidentDetailsTable from "./SkeletonIncidentDetailsTable";

function SkeletonIncidentReportDetailsPage() {
  return (
    <>
      <MenuNavbar />

      <div className="mt-12 md:mt-0 flex flex-col gap-y-12">
        <div className="flex items-center justify-between gap-x-8 gap-y-8 flex-wrap">
          <Skeleton width={200} height={30} />

          <div className="flex items-center gap-x-8 flex-wrap gap-y-8">
            <Link to="/reports/incidents">
              <span className="cursor-pointer text-all-normal pb-1 border-b-2  border-all-normal hover:text-orange-800 hover:border-orange-800 transition-all w-max sz450:justify-self-end md:text-lg  font-semibold ">
                &larr; Back
              </span>
            </Link>
          </div>
        </div>
        <Skeleton width={400} height={20} />
      </div>

      <div className="bg-backgroundWhite md:bg-white   md:px-8 md:py-10  rounded-2xl mt-12 flex flex-col gap-y-12 md:shadow-lg ">
        <Skeleton
          width="100%"
          height="100%"
          containerClassName="border border-[#dfdfdf]  shadow-sm w-full sm:w-3/4 lg:w-1/2 h-[10rem] md:h-[12rem] 2xl:h-[14rem]   rounded-lg self-center flex items-center"
        />

        <div className="flex flex-col gap-y-8 md:gap-y-4">
          <h2 className="font-bold text-sm 2xl:text-base">Incident details</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 xl:gap-x-10 gap-y-8 md:gap-y-0 lg:gap-y-8 xl:gap-y-10">
            <div className=" md:px-4 md:py-8 flex flex-col gap-y-4 ">
              <SkeletonIncidentLocationShowcaseMap />
            </div>

            <div className="pt-8 md:px-4 lg:pt-0 flex flex-col gap-y-4 justify-center">
              <SkeletonIncidentDetailsTable />
            </div>
          </div>
        </div>

        <SkeletonIncidentSupervisorsView />
      </div>
    </>
  );
}

export default SkeletonIncidentReportDetailsPage;
