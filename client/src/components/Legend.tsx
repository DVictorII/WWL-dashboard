import React from "react";

import { motion } from "framer-motion";

function Legend({ labelType }: { labelType: string }) {
  return (
    <div className="flex items-center justify-end px-4 gap-x-4 mt-8 ">
      <div
        className={`w-12 h-6 rounded-full ${
          labelType === "pressure" ? "bg-bluePrimary" : "bg-[#831B1B]"
        }`}
      />
      <span className="text-sm font-semibold">
        {labelType === "pressure" ? "Pressure (KPa)" : "Elevation (m)"}
      </span>
    </div>
  );
}

export default Legend;
