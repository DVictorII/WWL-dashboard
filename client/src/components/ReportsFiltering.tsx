import React from "react";

function ReportsFiltering({ page }: { page: string }) {
  return (
    <div className="flex flex-col gap-y-6 sz450:flex-row justify-end gap-x-6">
      <select
        name="filterBy"
        id="filterBy"
        className="px-4 py-2 2xl:px-6 2xl:py-3 rounded-[10px] font-medium text-lg 2xl:text-2xl border border-bluePrimary w-max"
      >
        <option value="piezometers">Filter By</option>
        <option value="incidents">Incidents</option>
      </select>

      <select
        name="orderBy"
        id="orderBy"
        className="px-4 py-2 2xl:px-6 2xl:py-3 rounded-[10px] font-medium text-lg 2xl:text-2xl border border-bluePrimary w-max"
      >
        <option value="piezometers">Date (desc)</option>
        <option value="incidents">Date (asc)</option>
        <option value="incidents">Piezo status</option>
        <option value="incidents">Paddock</option>
      </select>
    </div>
  );
}

export default ReportsFiltering;
