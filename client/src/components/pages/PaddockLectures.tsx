// @ts-ignore: Unreachable code error

import MenuNavbar from "../MenuNavbar";

import PaddockMapWrapper from "../PaddockMapWrapper";

import LecturesLocationTable from "../PiezometerLectures/LecturesLocationTable";
import PiezoInformationTable from "../PiezometerLectures/PiezoInformationTable";

import PiezoLecturesComponent from "../PiezometerLectures/PiezoLecturesComponent";

import { usePiezometerLecturesStateStore } from "../../store/PiezometerLecturesStateStore";

import FullPageComps from "../FullPageComps";

import PiezoReadingsDateTable from "../PiezometerLectures/PiezoReadingsDateTable";
import { AiOutlineLeft } from "react-icons/ai";
import { Link } from "react-router-dom";

function PaddockLectures() {
  const paddock = usePiezometerLecturesStateStore((s) => s.paddock);
  const piezo = usePiezometerLecturesStateStore((s) => s.piezo);
  const days = usePiezometerLecturesStateStore((s) => s.days);
  const chartType = usePiezometerLecturesStateStore((s) => s.chartType);
  const date = usePiezometerLecturesStateStore((state) => state.date);

  return (
    <>
      <MenuNavbar />

      <div className="py-4  lg:px-4  border-b border-[#ccc]">
        <div className="flex flex-col gap-y-4">
          <h1 className="flex gap-x-4 items-center ">
            <Link to="/operations/monitoring-map">
              <AiOutlineLeft className="w-4 h-4 cursor-pointer" />
            </Link>
            <span className="font-bold xl:text-lg">
              Operations - Piezometer Readings
            </span>
          </h1>
          <p className="text-xs xl:text-sm font-semibold text-[#666]">
            Use the interactive chart below to explore paddocks, sections and
            piezometers state.
          </p>
        </div>
      </div>

      <div className="mt-12" />

      <div className=" flex flex-col gap-y-8 lg:px-4 lg:pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-3   ">
          <LecturesLocationTable />
        </div>

        <div key={`${paddock}${piezo}`}>
          <PiezoLecturesComponent />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-6 xl:gap-x-8 gap-y-8 ">
          <div className="flex flex-col  bg-white p-4 gap-y-4 rounded-xl shadow-sm  ">
            <h2 className="font-semibold text-[#555]">Piezometer details</h2>
            <PiezoInformationTable />
          </div>

          <div className="flex flex-col  bg-white p-4 gap-y-4 rounded-xl shadow-sm  ">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-[#555]">
                Piezometer location map
              </h2>
              <PiezoReadingsDateTable />
            </div>
            <PaddockMapWrapper key={`${piezo}${paddock}${date}`} />
          </div>
        </div>
      </div>

      <FullPageComps
        information={{
          paddock,
          piezo,
          days,
          chartType,
        }}
      />
    </>
  );
}

export default PaddockLectures;
