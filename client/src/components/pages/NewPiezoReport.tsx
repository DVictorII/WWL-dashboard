import MenuNavbar from "../MenuNavbar";
import PiezoReportForm from "../PiezoReportForm";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSectionImgStore } from "../../store/sectionImgStore";

//@ts-ignore
import BarChart from "../BarChart"

function NewPiezoReport() {
  const sectionImgIsOpen = useSectionImgStore((s) => s.sectionImgIsOpen);
  const closeSectionImg = useSectionImgStore((s) => s.closeSectionImg);

  const fullPageBarChartIsOpen = useSectionImgStore((s) => s.fullPageBarChartIsOpen);
  const closeFullPageBarChart = useSectionImgStore((s) => s.closeFullPageBarChart);
  const imgURL = useSectionImgStore((s) => s.imgURL);

  return (
    <>
      <MenuNavbar />

      <div className="mt-12 md:mt-0 flex items-center justify-between gap-x-16 flex-wrap ">
        <h1 className="md:text-lg 2xl:text-xl font-bold">New Report</h1>

        <Link to="/reports/piezometers">
          <span className="cursor-pointer text-bluePrimary pb-1 border-b-2 border-[#777] border-bluePrimary w-max sz450:justify-self-end md:text-lg  font-semibold">
            &larr; Back
          </span>
        </Link>
      </div>

      <div className="md:bg-[#f5f5f5] bg-white   md:px-8 md:py-10  rounded-2xl mt-12 flex flex-col gap-y-8">
        <PiezoReportForm />
      </div>

      {
        sectionImgIsOpen ? (<div className="fixed top-0 left-0 h-screen w-screen z-[100] flex items-center justify-center">
            <div onClick={closeSectionImg} className="absolute top-0 left-0 w-full h-full bg-[#222222] bg-opacity-50 blur-md  "/>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[700px] md:w-4/5 rounded-[14px] overflow-hidden shadow-sm shadow-sky-900  rotate-90 origin-center lg:rotate-0">
              <img className=" w-full "  src={imgURL} />
            </div>
        </div>)
    :null  
      }

      {
        fullPageBarChartIsOpen ? (<div className="fixed top-0 left-0 h-screen w-screen z-[100] flex items-center justify-center">
            <div onClick={closeFullPageBarChart} className="absolute top-0 left-0 w-full h-full bg-[#222222] bg-opacity-50 blur-md  "/>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[700px] md:w-4/5 rounded-[14px] h-1/2  shadow-sm shadow-sky-900  rotate-90 origin-center lg:rotate-0 ">
                <BarChart />
            </div>
        </div>)
    :null  
      }
      
    </>
  );
}

export default NewPiezoReport;
