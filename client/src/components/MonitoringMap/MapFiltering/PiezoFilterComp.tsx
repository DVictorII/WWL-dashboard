import React from "react";
import DateTable from "./DateTable";
import LocationTable from "./LocationTable";
import StatusTable from "./StatusTable";

function PiezoFilterComp() {
  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-8 lg:grid lg:grid-cols-2 gap-x-8">
        <StatusTable />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 lg:grid-cols-1">
          <DateTable />
        </div>
      </div>

      <div className="grid grid-cols-1  gap-x-8 ">
        <LocationTable />
      </div>
    </div>
  );
}

export default PiezoFilterComp;
