import React from "react";
import IncidentMapSingle from "./IncidentMapSingle";
import { IncidentDetails } from "../../types";
import IncidentDetailsTable from "./IncidentDetailsTable";

function IncidentMapDetailsTable({ incident }: { incident: IncidentDetails }) {
  return (
    <div className="flex flex-col gap-y-8 md:gap-y-4">
      <h2 className="font-bold text-sm 2xl:text-base">Incident details</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 xl:gap-x-10 gap-y-8 md:gap-y-0 lg:gap-y-8 xl:gap-y-10">
        <div className=" md:px-4 md:py-8 flex flex-col gap-y-4 ">
          <IncidentMapSingle incident={incident} />
        </div>

        <div className="pt-8 md:px-4 lg:pt-0 flex flex-col gap-y-4 justify-center">
          <IncidentDetailsTable incident={incident} />
        </div>
      </div>
    </div>
  );
}

export default IncidentMapDetailsTable;
