import React from "react";
import { IncidentDetails } from "../../types";

function IncidentDetailsTable({ incident }: { incident: IncidentDetails }) {
  return (
    <div className="max-w-[1000vh] h-[12rem] overflow-x-auto rounded-lg border-2  relative bg-white border-incident-dark ">
      <table className="   select-none w-full border-collapse  bg-white">
        <tbody>
          <tr className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12  bg-incident-light ">
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold text-[11px]">
              <span>Location coordinates:</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <span>
                {Number(incident.incident_latitude).toFixed(8)}° /{" "}
                {Number(incident.incident_longitude).toFixed(8)}°
              </span>
            </th>
          </tr>

          <tr className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12 bg-white ">
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold text-[11px]">
              <span>At paddock:</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <span>{incident.incident_paddock}</span>
            </th>
          </tr>

          <tr className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12 bg-incident-light ">
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold text-[11px]">
              <span>Location elevation:</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <span>{incident.incident_elevation}</span>
            </th>
          </tr>

          <tr className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12 bg-white ">
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold text-[11px]">
              <span>Incident date:</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <span>{incident.incident_date}</span>
            </th>
          </tr>
        </tbody>
      </table>
      <div className="absolute top-0 left-1/2 w-[2px] h-[12rem] bg-incident-dark bg-opacity-20 " />
    </div>
  );
}

export default IncidentDetailsTable;
