// @ts-ignore: Unreachable code error

import MenuNavbar from "../MenuNavbar";

import PaddockMapWrapper from "../PaddockMapWrapper";

import LecturesLocationTable from "../PiezometerLectures/LecturesLocationTable";
import PiezoInformationTable from "../PiezometerLectures/PiezoInformationTable";

import PiezoLecturesComponent from "../PiezometerLectures/PiezoLecturesComponent";

import { usePiezometerLecturesStateStore } from "../../store/PiezometerLecturesStateStore";

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

      <div className="bg-backgroundWhite md:bg-white   md:px-8 md:py-10  rounded-2xl mt-12 flex flex-col gap-y-10 md:shadow-lg ">
        <LecturesLocationTable />

        <PiezoLecturesComponent />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 xl:gap-x-10 gap-y-8 xl:gap-y-10">
          <div className=" md:px-4 md:py-8 rounded-[14px] flex flex-col gap-y-4 ">
            <h2
              className="text-sm md:text-base font-semibold"
              key={`${paddock}${piezo}`}
            >
              {paddock} / {piezo}
            </h2>
            <PiezoInformationTable />
          </div>

          <div key={`${piezo}${paddock}`} className="flex items-center">
            <PaddockMapWrapper />
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
