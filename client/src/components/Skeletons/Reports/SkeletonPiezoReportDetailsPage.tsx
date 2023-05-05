import React from "react";
import MenuNavbar from "../../MenuNavbar";
import ReportDetailsPDFDownloadButton from "../../Reports/ReportDetailsPDFDownloadButton";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import SkeletonSupervisorsView from "./SkeletonSupervisorsView";
import SkeletonReportPiezoLecturesComponent from "./SkeletonReportPiezoLecturesComponent";
import SkeletonPiezoInfoWithInoperativeDaysTable from "./SkeletonPiezoInfoWithInoperativeDaysTable";

function SkeletonPiezoReportDetailsPage() {
  return (
    <>
      <MenuNavbar />

      <div className="mt-12 md:mt-0 flex flex-col gap-y-12">
        <div className="flex items-center justify-between gap-x-8 gap-y-8 flex-wrap">
          <Skeleton width={200} height={30} />

          <div className="flex items-center gap-x-8 flex-wrap gap-y-8">
            <ReportDetailsPDFDownloadButton />

            <Link to="/reports/piezometers">
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

        <SkeletonPiezoInfoWithInoperativeDaysTable />

        <SkeletonReportPiezoLecturesComponent />

        <SkeletonSupervisorsView />
      </div>
    </>
  );
}

export default SkeletonPiezoReportDetailsPage;
