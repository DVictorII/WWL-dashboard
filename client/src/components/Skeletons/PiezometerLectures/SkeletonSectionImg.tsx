import React from "react";
import Skeleton from "react-loading-skeleton";

function SkeletonSectionImg() {
  return (
    <div className="flex flex-col gap-y-4 self-center w-full">
      <div className="flex justify-center items-center h-52 bg-[#f5f5f5] rounded-xl font-semibold">
        <Skeleton
          width={"100%"}
          height={"100%"}
          containerClassName="w-full h-full"
        />
      </div>

      <Skeleton width={120} height={20} />
    </div>
  );
}

export default SkeletonSectionImg;
