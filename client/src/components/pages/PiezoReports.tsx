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

      <div className="mt-12 md:hidden" />

      <div className="items-center flex flex-wrap justify-between  gap-x-8 gap-y-4 bg-white p-4 rounded-xl shadow-sm">
        <h1 className="  font-bold">Piezometer Reports</h1>

        <div className="flex items-center gap-x-4">
          <div className="p-2 bg-all-normal flex items-center justify-center rounded-full text-white ">
            <BsBookmarkHeartFill className="w-4 h-4  lg:w-5 lg:h-5 " />
          </div>

          <Link to="/reports/piezometers/new-report">
            <button className="flex items-center gap-x-2 p-2 sm:px-4 rounded-full bg-all-normal text-white  hover:bg-orange-800 transition-all">
              <AiOutlinePlus className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 " />
              <span className="text-xs sm:text-sm   font-medium hidden sm:block">
                New
              </span>
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-12" />

      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-6 xl:gap-x-8 gap-y-8 ">
        <div className="flex flex-col  bg-white p-4 2xl:p-6 rounded-xl shadow-sm justify-center gap-y-4 ">
          <h2 className="font-bold text-sm 2xl:text-base">Featured reports</h2>

          <div className="w-full ">
            <SliderComp reports={piezoReports} />
          </div>
        </div>

        <div className="flex flex-col  bg-white p-4 2xl:p-6 rounded-xl shadow-sm justify-center gap-y-4 ">
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
