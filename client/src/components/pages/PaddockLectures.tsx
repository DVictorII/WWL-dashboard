// @ts-ignore: Unreachable code error

import MenuNavbar from "../MenuNavbar";

import PaddockMapWrapper from "../PaddockMapWrapper";

import LecturesLocationTable from "../PiezometerLectures/LecturesLocationTable";
import PiezoInformationTable from "../PiezometerLectures/PiezoInformationTable";

import PiezoLecturesComponent from "../PiezometerLectures/PiezoLecturesComponent";

import { usePiezometerLecturesStateStore } from "../../store/PiezometerLecturesStateStore";

import FullPageComps from "../FullPageComps";
import { useEffect } from "react";

function PaddockLectures() {
  const paddock = usePiezometerLecturesStateStore((s) => s.paddock);
  const piezo = usePiezometerLecturesStateStore((s) => s.piezo);

  useEffect(() => {
    console.log(paddock, piezo);
  }, [paddock, piezo]);

  const days = usePiezometerLecturesStateStore((s) => s.days);
  const chartType = usePiezometerLecturesStateStore((s) => s.chartType);

  return (
    <>
      <MenuNavbar />

      <div className="mt-12 md:hidden" />

      <div className="  flex flex-col gap-y-4 justify-between bg-white p-4 rounded-xl shadow-sm">
        <h1 className=" font-bold ">Paddock Monitoring - Dashboard</h1>
        <p className="text-xs font-semibold text-[#666]">
          Use the interactive chart below to explore piezometer readings from
          Paddock{" "}
        </p>
      </div>

      <div className="mt-12" />

      <div className=" flex flex-col gap-y-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-3   ">
          <LecturesLocationTable />
        </div>

        <div key={`${paddock}${piezo}`}>
          <PiezoLecturesComponent />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-6 xl:gap-x-8 gap-y-8 ">
          <div className="flex flex-col  bg-white p-4 2xl:p-6 rounded-xl shadow-sm justify-center ">
            {/* <h2
              className="text-sm md:text-base font-semibold"
              key={`${paddock}${piezo}`}
            >
              {paddock} / {piezo}
            </h2> */}
            <PiezoInformationTable />
          </div>

          <div
            key={`${piezo}${paddock}`}
            className="flex flex-col  bg-white p-4 2xl:p-6 rounded-xl shadow-sm justify-center "
          >
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
