import React from "react";
import LabelCard from "./LabelCard";

interface ProgressChartProps {
  number: number;
  level?: string;
  isIncidentsCard?: boolean;
}

function ProgressChart({ number, level, isIncidentsCard }: ProgressChartProps) {
  const percentage = Math.round((number / 92) * 100);
  return (
    <div className="w-full ">
      <div className="w-full h-[1px] bg-orangeSecondaryShadow" />
      <div className="relative -mt-5 ">
        <div className="absolute top-0 " style={{ left: `${percentage}%` }}>
          <LabelCard number={number || 0} level={level || ""} />
        </div>

        <div className="px-4 pt-12 ">
          <div className="w-full bg-[#B3CAE5] h-5 2xl:h-6 rounded-full" />
          <div
            style={{ width: `${percentage > 5 ? percentage : 10}%` }}
            className="bg-bluePrimary h-5 2xl:h-6 -mt-5 2xl:-mt-6 rounded-full"
          />

          {!isIncidentsCard ? (
            <div className="mt-2 text-xs font-medium font-sans 2xl:text-sm">
              {number} / 92 piezos.
            </div>
          ) : (
            <div className="mt-2 text-xs font-medium font-sans 2xl:text-sm">
              .
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProgressChart;
