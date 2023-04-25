import React from "react";
import { Information } from "../../types";
import DaysChange from "../PiezometerLectures/Filtering/DaysChange";
import SectionImg from "../PiezometerLectures/SectionImg";
import LecturesChart from "../PiezometerLectures/LecturesChart";
import ReportSectionImg from "./ReportSectionImg";
import ReportLecturesChart from "./ReportLecturesChart";


function ReportPiezoLecturesComponent({paddock, piezo}:{paddock:string, piezo:string}) {
  return (
    <div className=" flex flex-col gap-y-10">
      <h2 className="flex items-center gap-x-4 flex-wrap gap-y-2">
        <span className="text-sm md:text-base font-semibold">
          Piezometer lectures / Last
        </span>
        <DaysChange />
        <span className="text-sm md:text-base font-semibold">days</span>
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 xl:gap-x-10 gap-y-10 ">
        <ReportLecturesChart paddock={paddock} piezo={piezo} />
        <ReportSectionImg paddock={paddock} piezo={piezo}/>
      </div>
    </div>
  );
}

export default ReportPiezoLecturesComponent;
