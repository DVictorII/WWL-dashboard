import { BsArrowDown } from "react-icons/bs";
import LeavesVSHiresChart from "./charts/LeavesVSHiresChart";

function HRLeavesSummary() {
  return (
    <div className="grid grid-cols-2 gap-x-4 w-full ">
      <div className="flex justify-start sm:justify-center ">
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-4">
            <div className="flex items-end gap-x-8">
              <div className="flex items-center gap-x-2">
                <span className="text-xl font-semibold">Leaves</span>
                <span>
                  <BsArrowDown className="text-[#666]" />
                </span>
              </div>

              <span className="text-3xl font-semibold">1</span>
            </div>

            <div className="flex items-center gap-x-1">
              <div className="px-4 py-[2px] bg-active-normal bg-opacity-20 rounded-full">
                <span className="font-semibold text-sm">-100%</span>
              </div>
              <span className="text-sm text-[#999]">*</span>
            </div>
          </div>

          <div className="flex flex-col gap-y-2 ">
            <span className="text-2xl font-bold ">+ 2</span>
            <span className=" font-semibold ">Current workplace changes</span>
            <span className="text-sm font-semibold text-[#666] ">
              (news vs. leaves)
            </span>
          </div>
        </div>
      </div>
      <div className="max-w-[200px] max-h-52">
        <LeavesVSHiresChart />
      </div>
    </div>
  );
}

export default HRLeavesSummary;
