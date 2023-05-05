import React from "react";
import Skeleton from "react-loading-skeleton";

function SkeletonSupervisorsView() {
  return (
    <div className="flex flex-col mt-8 lg:mt-0 ">
      <h2 className="font-bold text-sm 2xl:text-base">Supervisors</h2>
      <p className="mt-4 text-[10px] md:text-xs font-medium text-[#555]">
        These supervisors received further details of the report. Please,
        contact them if necessary.
      </p>

      <div className="mt-12">
        <Skeleton
          width={300}
          height={25}
          count={3}
          style={{ marginBottom: "20px" }}
        />
      </div>
    </div>
  );
}

export default SkeletonSupervisorsView;
