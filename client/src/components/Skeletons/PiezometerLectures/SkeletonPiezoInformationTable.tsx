import React from "react";
import Skeleton from "react-loading-skeleton";

function SkeletonPiezoInformationTable() {
  return (
    <div className="max-w-[1000vh] h-[19rem] overflow-x-auto rounded-lg border-2 border-[#c1c1c1] relative bg-white">
      <table className="   select-none w-full border-collapse  bg-white">
        <tbody>
          <tr className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12 bg-[#f5f5f5] ">
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold text-[11px]">
              <span>Location coordinates:</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <Skeleton height={15} width={60} /> /{" "}
              <Skeleton height={15} width={60} />
            </th>
          </tr>

          <tr className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12 bg-white ">
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold text-[11px]">
              <span>Section:</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <Skeleton height={15} width={60} />
            </th>
          </tr>

          <tr className=" bg-[#f5f5f5] w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12  ">
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold text-[11px]">
              <span>Depth:</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <Skeleton height={15} width={60} />
            </th>
          </tr>

          <tr className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12 bg-white ">
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold text-[11px]">
              <span>Status:</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <Skeleton height={15} width={60} />
            </th>
          </tr>

          <tr className="bg-[#f5f5f5] w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12  ">
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold text-[11px]">
              <span>Current PWP</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <Skeleton height={15} width={60} />
            </th>
          </tr>

          <tr className="w-full grid grid-cols-2 justify-items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12 bg-white ">
            <th className="flex items-center gap-x-2 w-20 justify-center font-bold  text-[11px]">
              <span>Last reading at:</span>
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center font-semibold">
              <Skeleton height={15} width={100} />
            </th>
          </tr>
        </tbody>
      </table>
      <div className="bg-[#f1f1f1] absolute top-0 left-1/2 w-[2px] h-[19rem] " />
    </div>
  );
}

export default SkeletonPiezoInformationTable;
