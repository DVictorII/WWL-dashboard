import React from "react";
import DateTable from "./DateTable";
import LocationTable from "./LocationTable";
import StatusTable from "./StatusTable";
import { useMediaQuery } from "react-responsive";
import LocationPaddock from "./LocationPaddock";
import LocationSection from "./LocationSection";
import LocationPiezo from "./LocationPiezo";

function PiezoFilterComp() {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  return isBigScreen ? (
    <div className="grid grid-cols-5 border-b border-[#ccc]">
      <StatusTable />

      <div className="flex flex-col gap-y-4 col-span-3 p-4 ">
        <h3 className="font-semibold text-[#666] ">Location selectors</h3>
        <div className="grid grid-cols-2 col-span-3 gap-x-8 gap-y-4 xl:px-8 2xl:gap-y-6 2xl:gap-x-12">
          <DateTable />

          <LocationPaddock />
          <LocationSection />
          <LocationPiezo />
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-y-8">
      <div className="flex flex-col gap-y-8 lg:grid lg:grid-cols-2 gap-x-8">
        <StatusTable />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 lg:grid-cols-1">
          <DateTable />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3   ">
        <LocationTable />
      </div>
    </div>
  );
}

export default PiezoFilterComp;
