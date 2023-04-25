import MenuNavbar from "../MenuNavbar";
import PiezoReportForm from "../PiezoReportForm";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useSectionImgStore } from "../../store/sectionImgStore";

//@ts-ignore
import BarChart from "../BarChart"
import { useNewPiezoReportStateStore } from "../../store/NewPiezoReportStateStore";
import FullPageComps from "../FullPageComps";

function NewPiezoReport() {
  const sectionImgIsOpen = useSectionImgStore((s) => s.sectionImgIsOpen);
  const closeSectionImg = useSectionImgStore((s) => s.closeSectionImg);

  const fullPageBarChartIsOpen = useSectionImgStore((s) => s.fullPageBarChartIsOpen);
  const closeFullPageBarChart = useSectionImgStore((s) => s.closeFullPageBarChart);
  const imgURL = useSectionImgStore((s) => s.imgURL);

  const paddock = useNewPiezoReportStateStore((state) => state.paddock);
  const piezo = useNewPiezoReportStateStore((state) => state.piezo);
  const days = useNewPiezoReportStateStore((state) => state.days);
  const chartType = useNewPiezoReportStateStore((state) => state.chartType);

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

      <FullPageComps information={{
        paddock, piezo, days, chartType
      }} />
      
    </>
  );
}

export default NewPiezoReport;
