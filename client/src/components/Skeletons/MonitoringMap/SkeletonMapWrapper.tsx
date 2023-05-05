import React from "react";
import Skeleton from "react-loading-skeleton";

function SkeletonMapWrapper() {
  return (
    <div className=" w-full   h-[50vh]  rounded-lg overflow-hidden shadow-md relative z-[10] p-2 border-2">
      <div className="w-full h-full rounded-sm overflow-hidden">
        <Skeleton width={"100%"} height={"100%"} />
      </div>
    </div>
  );
}

export default SkeletonMapWrapper;
