import React from "react";
import { IncidentDetails } from "../../types";

function IncidentSupervisorsView({ incident }: { incident: IncidentDetails }) {
  return (
    <div className="flex flex-col ">
      <h2 className="font-semibold">Supervisors</h2>
      <p className="mt-4 text-[10px] md:text-xs 2xl:text-sm font-semibold text-[#555]">
        These supervisors received further details of the incident report.
        Please, contact them if necessary.
      </p>

      <div className="mt-12 flex flex-col gap-y-8">
        {incident.incident_supervisors.map((supervisor, i) => (
          <div key={i} className="flex items-center gap-x-8 flex-wrap gap-y-4 ">
            <span className="text-xs md:text-sm font-bold">
              Supervisor {i + 1}:
            </span>

            <div className="flex items-center gap-x-4">
              {/* <span className="text-xs md:text-sm font-semibold text-active-dark"></span> */}
              <span className="text-xs md:text-sm fonte-semibold text-[#555]">
                {supervisor}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IncidentSupervisorsView;
