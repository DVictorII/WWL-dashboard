import MenuNavbar from "../MenuNavbar";
import { Link } from "react-router-dom";

import { useQuery } from "react-query";

import { BsBookmarkHeartFill, BsPlusSquare } from "react-icons/bs";
import SliderComp from "../Slider/SliderComp";
import ReportsListTable from "../Reports/ReportsListTable";
import { fetchPiezoReports } from "../../utils/reportsFetchFunctions";
import { useEffect } from "react";
import SkeletonPiezoReportsPage from "../Skeletons/Reports/SkeletonPiezoReportsPage";
import { AiOutlinePlus } from "react-icons/ai";

function PiezoReports() {
  const { isLoading, data: piezoReports } = useQuery(
    "piezoReports",
    fetchPiezoReports,
    {
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    console.log(piezoReports);
  }, [piezoReports]);

  if (isLoading || !piezoReports) return <SkeletonPiezoReportsPage />;

  return (
    <>
      <MenuNavbar />

      <div className="items-center flex flex-wrap justify-between mt-12 md:mt-0 gap-x-8 gap-y-4 bg-white p-4 rounded-xl shadow-sm">
        <h1 className=" md:text-lg 2xl:text-xl font-bold">
          Piezometer Reports
        </h1>

        <div className="flex items-center gap-x-4">
          <div className="flex items-center gap-x-1   px-2  py-2   bg-[#333] text-[#f1f1f1] rounded-full hover:bg-orange-800">
            <BsBookmarkHeartFill className="w-4 h-4  lg:w-5 lg:h-5" />
          </div>

          <Link to="/reports/piezometers/new-report">
            <button className="flex items-center gap-x-2   px-2  py-2 sm:px-4  bg-[#333] text-[#f1f1f1] rounded-full hover:bg-orange-800">
              <AiOutlinePlus className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              <span className="text-xs xl:text-sm font-bold hidden sm:block">
                New
              </span>
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 gap-y-8">
        <div className="flex flex-col  bg-white p-4 2xl:p-6 rounded-xl shadow-sm">
          <div className="  flex flex-col  gap-y-4 w-full ">
            <h2 className="font-bold text-sm 2xl:text-base">
              Featured reports
            </h2>

            <div className="w-full ">
              <SliderComp reports={piezoReports} />
            </div>
          </div>
        </div>

        <div className="flex flex-col  bg-white p-4 2xl:p-6 rounded-xl shadow-sm gap-y-4">
          <h2 className="font-bold text-sm 2xl:text-base">Reports List</h2>

          <div className="grid grid-cols-1">
            <ReportsListTable reports={piezoReports} />
          </div>
        </div>
      </div>
    </>
  );
}

export default PiezoReports;
