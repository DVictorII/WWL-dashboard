import React from "react";
import { AiTwotoneCalendar } from "react-icons/ai";
import { Link } from "react-router-dom";

// @ts-ignore: Unreachable code error
import { boxShadowSlight } from "../utils/shadow";

interface Incident {
  id: string;
  from_user: number;
  photo: string;
  title: string;
  paddock: string;
  date: string;
  latitude: number;
  longitude: number;
  elevation: number;
  description: string;
  supervisor2: string;
  supervisor3: string;
}

function IncidentReportComp({ incident }: { incident: Incident }) {
  const coordsStr = `${incident.latitude}, ${incident.longitude}`;
  return (
    <Link to={`/reports/incidents/${incident.id}`}>
      <div
        className="flex  lg:justify-center relative p-4 sm:p-8 lg:pr-0 xl:pr-4 lg:pl-36  rounded-[14px] overflow-hidden cursor-pointer shadow-sm"
        
      >
        <div className="absolute top-0 left-0 h-full w-40 shrink-0 hidden lg:inline ">
          <img
            src={`/static/img/incident_reports/${incident.photo}`}
            className="h-full object-cover w-full"
          />
        </div>

        <div>
          <span className="text-xl font-semibold 2xl:text-2xl">
            {incident.title}
          </span>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 sm:mt-8 md:mt-10 gap-y-4 gap-x-6">
            <div className="2xl:text-xl">
              <span>{incident.paddock}</span> / <span>{coordsStr}</span>
            </div>

            <div className="flex items-center gap-x-4 2xl:text-xl">
              <span>{incident.date}</span>
              <AiTwotoneCalendar className="w-6 h-6 2xl:w-7 2xl:h-7" />
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 h-full w-[20px] 2xl:w-[22px] bg-[#831B1B] shrink-0" />
      </div>
    </Link>
  );
}

export default IncidentReportComp;
