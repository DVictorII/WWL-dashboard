import React from "react";

function globalSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-x-8 gap-y-8 flex-wrap bg-white p-4 rounded-xl shadow-sm">
      <h1 className="flex flex-col gap-y-1 ">
        <span className="font-bold xl:text-lg">
          Operations - Monitoring Map
        </span>
      </h1>
    </div>
  );
}

export default globalSectionTitle;
