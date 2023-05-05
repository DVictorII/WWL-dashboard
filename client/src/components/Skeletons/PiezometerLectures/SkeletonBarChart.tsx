import React from "react";
import Skeleton from "react-loading-skeleton";
import FullScreenButton from "../../PiezometerLectures/FullScreenButton";
import ChartLegend from "../../PiezometerLectures/ChartLegend";

function SkeletonBarChart() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="h-[50vh] w-full">
        <Skeleton width={"100%"} height={"100%"} />
      </div>
      <div className="w-full flex justify-between gap-x-16 flex-wrap gap-y-8 ">
        <Skeleton width={120} height={20} />
        <Skeleton width={120} height={20} />
      </div>
    </div>
  );
}

export default SkeletonBarChart;
