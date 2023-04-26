import React from "react";
import { IncidentDetails } from "../../types";
import { Link } from "react-router-dom";
import { BsBookmarkHeart } from "react-icons/bs";
import { AiOutlineCalendar, AiOutlineUser } from "react-icons/ai";
import moment from "moment";

function IncidentReportCard({ incident }: { incident: IncidentDetails }) {
  return (
    <div
      className={`w-48 md:w-56 mx-auto h-full rounded-[6px] md:rounded-[8px] overflow-hidden shadow-md my-1`}
    >
      <div className="h-24 md:h-28  ">
        <img
          src="/media/img/photos/Rossing_mine.jpg"
          alt="mine"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="bg-white p-2 md:p-3">
        <div className="flex justify-between gap-x-4 items-center">
          <Link to={`/reports/piezometers/${incident.incident_id}`}>
            <span className="text-xs md:text-base font-semibold line-clamp-2 h-[48px] hover:text-active-normal cursor-pointer transition-all">
              {incident.incident_title}
            </span>
          </Link>

          <div className="w-5 h-5 border border-[#333] rounded-full flex justify-center items-center shrink-0">
            <BsBookmarkHeart className="w-3 h-3" />
          </div>
        </div>

        <p className="text-[8px] md:text-[10px] text-[#555] mt-1 md:mt-2 line-clamp-2 h-[30px]">
          {incident.incident_description}
        </p>

        <div className="w-full h-[2px] bg-all-normal bg-opacity-10 mt-4" />

        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col gap-y-1 md:gap-y-2">
            <div className=" text-[8px] md:text-[10px] font-semibold">
              <span className=" font-semibold">{incident.incident_paddock}</span> /{" "}
              {/* <span className=" font-semibold">{report.report_piezo}</span> */}
            </div>
            <div className="flex items-center gap-x-1">
              <AiOutlineCalendar className="w-2 h-2 md:w-3 md:h-3" />
              <span className="text-[8px] md:text-[10px] font-semibold">
                {moment(incident.incident_date).format("MMM DD, YYYY")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-x-1">
            <div className=" h-4 w-4 md:h-6 md:w-6 rounded-full bg-[#333] flex items-center justify-center">
              <AiOutlineUser className="w-2 h-2 md:w-3 md:h-3 text-white" />
            </div>

            <div className="flex flex-col">
              <span className="text-[6px] md:text-[8px] font-medium text-[#777] ">
                Writen by
              </span>
              <span className=" text-[8px] md:text-[10px] font-semibold">
                {incident.user_name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncidentReportCard;
