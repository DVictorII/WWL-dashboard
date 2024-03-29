import React from "react";
import { IncidentDetails } from "../../types";
import { BsArrowDownUp, BsTrash } from "react-icons/bs";
import moment from "moment";
import { Link } from "react-router-dom";
import { useConfirmationModalStore } from "../../store/ConfirmationModalStore";
import { s3StaticFilesLinks } from "../../utils/globalLinks";

function IncidentsListTable({ incidents }: { incidents: IncidentDetails[] }) {
  const openDeleteIncidentReportModal = useConfirmationModalStore(
    (s) => s.openDeleteIncidentReportModal
  );

  return (
    <div className=" max-w-full max-h-fit ">
      <div
        className={` overflow-y-scroll overflow-x-scroll h-fit max-h-96 min-h-[18rem] mt-5 mb-4   pb-5  rounded-sm border-b border-[#451919]`}
      >
        <table className="min-w-max border-separate border-spacing-0">
          <thead className="bg-incident-normal text-white">
            <th className="sticky top-0 text-center px-4 py-2  lg:py-3  border-b border-[#999] ">
              <div className="flex gap-x-2 justify-center items-center">
                <span className="text-[11px] md:text-xs">N°</span>
                <BsArrowDownUp className="w-2" />
              </div>
            </th>

            <th className="sticky top-0 text-center px-4 py-2  lg:py-3  border-b border-[#999] ">
              <div className="flex gap-x-2 justify-center items-center">
                <span className="text-[11px] md:text-xs">Created by</span>
                <BsArrowDownUp className="w-2" />
              </div>
            </th>

            <th className="sticky top-0 text-center px-4 py-2  lg:py-3  border-b border-[#999] ">
              <div className="flex gap-x-2 justify-center items-center">
                <span className="text-[11px] md:text-xs">Incident title</span>
                <BsArrowDownUp className="w-2" />
              </div>
            </th>

            <th className="sticky top-0 text-center px-4 py-2  lg:py-3  border-b border-[#999] ">
              <div className="flex gap-x-2 justify-center items-center">
                <span className="text-[11px] md:text-xs">Report date</span>
                <BsArrowDownUp className="w-2" />
              </div>
            </th>

            <th className="sticky top-0 text-center px-4 py-2  lg:py-3  border-b border-[#999] ">
              <div className="flex gap-x-2 justify-center items-center">
                <span className="text-[11px] md:text-xs">
                  Incident location
                </span>
                <BsArrowDownUp className="w-2" />
              </div>
            </th>

            <th className="sticky top-0 text-center px-4 py-2  lg:py-3  border-b border-[#999] ">
              <div className="flex gap-x-2 justify-center items-center">
                <span className="text-[11px] md:text-xs">At paddock</span>
                <BsArrowDownUp className="w-2" />
              </div>
            </th>

            <th className="sticky top-0 text-center px-8 py-2  lg:py-3  border-b border-[#999] "></th>

            {/* <th className="sticky top-0 text-center px-8 py-2  lg:py-3  border-b border-[#999] "></th> */}
            <th className="sticky top-0 text-center px-8 py-2  lg:py-3  border-b border-[#999] "></th>
          </thead>

          <tbody className="bg-white text-[#444]">
            {incidents.map((incident, i) => (
              <tr
                key={incident.incident_id}
                style={{
                  backgroundColor: i % 2 === 0 ? "#F2E8E8" : "white",
                }}
              >
                <td className="px-4 py-2  lg:py-3">
                  <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-bold">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                </td>

                <td className="px-4 py-2  lg:py-3">
                  <div className="flex items-center gap-x-2 justify-center">
                    <div className="w-6 h-6 border border-[#333] rounded-full flex items-center justify-center">
                      <img
                        src={`${s3StaticFilesLinks.baseURL}/${s3StaticFilesLinks.userProfilePictures}/${incident.user_picture}`}
                        alt={incident.user_name}
                      />
                    </div>
                    <span className="text-[9px] md:text-[10px] lg:text-[11px]  font-semibold">
                      {incident.user_name}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-2  lg:py-3">
                  <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-bold">
                    {incident.incident_title}
                  </span>
                </td>

                <td className="px-4 py-2  lg:py-3">
                  <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-semibold">
                    {moment(incident.incident_date).format("MMM DD, YYYY")}
                  </span>
                </td>

                <td className="px-4 py-2  lg:py-3">
                  <div className="flex items-center gap-x-2 justify-center">
                    <span className="text-[9px] md:text-[10px] lg:text-[11px]  font-semibold">
                      {incident.incident_latitude}°,
                    </span>

                    <span className="text-[9px] md:text-[10px] lg:text-[11px]  font-semibold">
                      {incident.incident_longitude}°
                    </span>
                  </div>
                </td>

                <td className="px-4 py-2  lg:py-3">
                  <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-semibold">
                    {incident.incident_paddock}
                  </span>
                </td>

                <td className="px-8 py-2  lg:py-3">
                  <Link
                    to={`/operations/reports/incidents/${incident.incident_id}`}
                  >
                    <div className="flex items-center">
                      <span className="text-[9px] md:text-[10px] lg:text-[11px]  font-bold text-orange-600  border-b border-orange-600  hover:text-orange-800 hover:border-orange-800 transition-all cursor-pointer">
                        View
                      </span>
                    </div>
                  </Link>
                </td>

                {/* <td className="px-8 py-2  lg:py-3">
                <span className="text-[11px] md:text-xs text-orange-600 border-b-2 border-orange-600  hover:text-orange-800 hover:border-orange-800 transition-all cursor-pointer">
                  Edit
                </span>
              </td> */}
                <td className="px-8 py-2  lg:py-3">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      console.log("deleting...");
                      openDeleteIncidentReportModal(incident.incident_id);
                    }}
                    className=" w-7 h-7 md:w-9 md:h-9 bg-damaged-normal hover:bg-opacity-30 transition-all cursor-pointer  bg-opacity-20 rounded-full flex items-center justify-center"
                  >
                    <BsTrash className="h-3 w-3 md:w-4 md:h-4 text-damaged-dark" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IncidentsListTable;
