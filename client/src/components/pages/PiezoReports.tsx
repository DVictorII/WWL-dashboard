import MenuNavbar from "../MenuNavbar";
import { Link } from "react-router-dom";

import { useQuery } from "react-query";

import { BsBookmarkHeartFill, BsPlusSquare } from "react-icons/bs";
import SliderComp from "../Slider/SliderComp";
import ReportsListTable from "../Reports/ReportsListTable";
import { fetchPiezoReports } from "../../utils/reportsFetchFunctions";
import { useEffect } from "react";

function PiezoReports() {
  const { isLoading, data: piezoReports } = useQuery(
    "piezoReports",
    fetchPiezoReports,
    {
      refetchOnWindowFocus: false,
    }
  );
  useEffect(()=>{
    console.log(piezoReports)
  },[piezoReports])

  if(isLoading) return (
    <h1>Loading...</h1>
  )

  return (
    <>
      <MenuNavbar />

      <div className="items-center flex flex-wrap justify-between mt-12 md:mt-0 gap-x-8 gap-y-4">
        <h1 className=" md:text-lg 2xl:text-xl font-bold">
          Piezometer Reports
        </h1>

        <div className="flex items-center gap-x-4">
          <div className="w-8 h-8 xl:w-10 xl:h-10 bg-all-normal flex items-center justify-center rounded-full text-white ">
            <BsBookmarkHeartFill className="w-3 h-3 xl:w-4 xl:h-4 " />
          </div>

          <Link to="/reports/piezometers/new-report">
            <button className="flex items-center gap-x-2 px-3 xl:px-4 py-2 bg-all-normal text-white rounded-[8px] hover:bg-orange-800 transition-all">
              <BsPlusSquare className="w-3 h-3 xl:w-4 xl:h-4 opacity-70" />
              <span className="text-xs xl:text-sm font-bold">New</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="bg-backgroundWhite md:bg-white   md:px-8 md:py-10  rounded-2xl mt-12 flex flex-col gap-y-12 md:shadow-lg ">
        
        <div className="grid-cols-1  grid gap-x-10 gap-y-10  ">
          <div className="  flex flex-col  gap-y-4 w-full ">
            <h2 className="font-bold text-sm 2xl:text-base">
              Featured reports
            </h2>

            <div className="w-full ">
              <SliderComp reports={piezoReports}/>
            </div>
          </div>
        </div>

        <div className="  flex flex-col  gap-y-4  ">
          <h2 className="font-bold text-sm 2xl:text-base">Reports List</h2>

          <div className="grid grid-cols-1">
            <ReportsListTable reports={piezoReports}/>
          </div>
        </div>
      </div>

      
    </>
  );
}

export default PiezoReports;
