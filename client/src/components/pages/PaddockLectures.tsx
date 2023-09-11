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
import GlobalSectionSubtitle from "../global/GlobalSectionSubtitle";

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

      <div className="py-4 lg:px-4 flex border-b border-[#ccc]">
        <LecturesLocationTable />
      </div>

      <div className=" flex border-b border-[#ccc]">
        <div className="w-full" key={`${paddock}${piezo}`}>
          <PiezoLecturesComponent />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 ">
        <div className="flex flex-col gap-y-6   p-4 lg:border-r border-[#ccc]  ">
          <GlobalSectionSubtitle subtitle="Piezometer details" />

          <PiezoInformationTable
            information={{
              paddock,
              piezo,
            }}
          />
        </div>

        <div className="flex flex-col gap-y-6   p-4 ">
          <div className="flex items-start justify-between">
            <GlobalSectionSubtitle subtitle="Location map" />

            <PiezoReadingsDateTable />
          </div>
          <PaddockMapWrapper key={`${piezo}${paddock}${date}`} />
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
