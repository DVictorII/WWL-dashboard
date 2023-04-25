import React from "react";

function SupervisorsView() {
  return (
    <div className="flex flex-col mt-8 ">
      <h2 className="font-bold text-sm 2xl:text-base">Supervisors</h2>
      <p className="mt-4 text-[10px] md:text-xs font-medium text-[#555]">
        These supervisors received further details of the report. Please,
        contact them if necessary.
      </p>

      <div className="mt-12 flex flex-col gap-y-8">
        <div className="flex items-center gap-x-8 flex-wrap gap-y-4 ">
          <span className="text-xs md:text-sm font-semibold">Supervisor 1:</span>

          <div className="flex items-center gap-x-4">
            <span className="text-xs md:text-sm font-semibold text-active-dark">WWL Principal Engineer - Roxana Ugaz:</span>
            <span className="text-xs md:text-sm fonte-semibold text-[#555]">rugaz@wwlengineering.com</span>
          </div>
        </div>

        <div className="flex items-center gap-x-8 flex-wrap gap-y-4 ">
          <span className="text-xs md:text-sm font-semibold">Supervisor 2:</span>

          <div className="flex items-center gap-x-4">
            <span className="text-xs md:text-sm font-semibold text-active-dark">WWL Lead Software Engineer - Víctor Ayala:</span>
            <span className="text-xs md:text-sm fonte-semibold text-[#555]">vayala@wwlengineering.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupervisorsView;
