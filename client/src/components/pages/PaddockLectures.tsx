// @ts-ignore: Unreachable code error

import MenuNavbar from "../MenuNavbar";


import { motion } from "framer-motion";

import PaddockMapWrapper from "../PaddockMapWrapper";
import { useChartStore } from "../../store/ChartStateStore";
import { useSectionImgStore } from "../../store/sectionImgStore";
import Sidebar from "../NavBars/Sidebar";
import { Toaster } from "react-hot-toast";
import { useLogOutStore } from "../../store/LogOutStore";
import LogOutConfirmationModal from "../LogOutConfirmationModal";
import MobileMenu from "../MobileMenu";
import LecturesLocationTable from "../PiezometerLectures/LecturesLocationTable";
import PiezoInformationTable from "../PiezometerLectures/PiezoInformationTable";

import PiezoLecturesComponent from "../PiezometerLectures/PiezoLecturesComponent";

import LecturesStateShowing from "../PiezometerLectures/LecturesStateShowing";
import { usePiezometerLecturesStateStore } from "../../store/PiezometerLecturesStateStore";
//@ts-ignore
import BarChart from "../BarChart"
import FullPageComps from "../FullPageComps";

function PaddockLectures() {
  const paddock = usePiezometerLecturesStateStore((s) => s.paddock);
  const piezo = usePiezometerLecturesStateStore((s) => s.piezo);

  const days = usePiezometerLecturesStateStore((s) => s.days);
  const chartType = usePiezometerLecturesStateStore((s) => s.chartType);


  return (
    <>
      <MenuNavbar />
      <div className="mt-12 md:mt-0 flex flex-col gap-y-6 justify-between">
        <h1 className="md:text-lg 2xl:text-xl font-bold ">
          Monitoring of Paddock - dashboard
        </h1>
        <p className="text-sm font-medium">
          Use the interactive chart below to explore piezometer readings from
          Paddock{" "}
        </p>
      </div>

      <div className="md:bg-[#f5f5f5] bg-white   md:px-8 md:py-10  rounded-2xl mt-12 flex flex-col gap-y-16">

        <div className=" flex flex-col gap-y-10 md:gap-y-12 w-full">
            <LecturesLocationTable />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 xl:gap-x-10 gap-y-8 xl:gap-y-10">
              <div className=" md:px-4 md:py-8 rounded-[14px] flex flex-col gap-y-4 ">
                <h2 className="text-sm md:text-base font-semibold" key={`${paddock}${piezo}`}>
                  {paddock} / {piezo}
                </h2>
                <PiezoInformationTable />
              </div>

              <div key={`${piezo}${paddock}`}>
                
                <PaddockMapWrapper />
              </div>
            </div>

            {/* <LecturesStateShowing /> */}
        </div>
        <PiezoLecturesComponent />

      </div>

      <FullPageComps information={{
        paddock,
        piezo,
        days,
        chartType
      }}/>
    </>
  );
}

export default PaddockLectures;
