import React from "react";
import { AiOutlineCheck, AiOutlineAlert } from "react-icons/ai";
import { BsLightbulb } from "react-icons/bs";
import { FiAlertTriangle, FiAlertOctagon } from "react-icons/fi";
import { VscDebugDisconnect } from "react-icons/vsc";
import { SiFlood } from "react-icons/si";
import { useMonitoringMapStateStore } from "../../../store/MonitoringMapStateStore";

function StatusTable() {
  const status = useMonitoringMapStateStore((state) => state.status);
  const changeStatus = useMonitoringMapStateStore(
    (state) => state.changeStatus
  );
  return (
    <div className="flex flex-col gap-y-1">
      <h3 className="text-xs font-semibold">Piezometer status</h3>

      <div className="py-2 flex items-center w-full justify-evenly border-2 border-[#69742C] rounded-xl">
        <div className="relative group">
          <div
            onClick={() => {
              status !== 0 && changeStatus(0);
            }}
            className={` w-10 h-10 xl:w-12 xl:h-12 flex justify-center items-center ${
              status === 0 ? "bg-gray-300" : "bg-transparent"
            } hover:bg-gray-300  transition-all duration-500 cursor-pointer rounded-full `}
          >
            <span className="font-semibold text-sm">All</span>
          </div>
          <span className="absolute w-auto px-3 py-2  min-w-max left-2 -bottom-12  rounded-md shadow-md text-xs text-white bg-[#222] border-2 border-gray-500  font-semibold transition-all duration-300  origin-left scale-0 group-hover:scale-100">
            All piezometers
          </span>
        </div>

        <div className="relative group">
          <div
            onClick={() => {
              status !== 1 && changeStatus(1);
            }}
            className={`  w-10 h-10 xl:w-12 xl:h-12 flex justify-center items-center ${
              status === 1 ? "bg-active-normal bg-opacity-20" : "bg-transparent"
            } hover:bg-active-normal hover:bg-opacity-20 transition-all duration-500 cursor-pointer rounded-full`}
          >
            <AiOutlineCheck className=" w-4 h-4 xl:w-5 xl:h-5 text-[#477C9A]" />
          </div>
          <span className="absolute w-auto px-3 py-2  min-w-max left-2 -bottom-12  rounded-md shadow-md text-xs text-white bg-[#222] border-2 border-active-dark  font-semibold transition-all duration-300  origin-left scale-0 group-hover:scale-100">
            Active piezometers
          </span>
        </div>

        <div className="relative group">
          <div
            onClick={() => {
              status !== 2 && changeStatus(2);
            }}
            className={`  w-10 h-10 xl:w-12 xl:h-12 flex justify-center items-center ${
              status === 2
                ? "bg-damaged-normal bg-opacity-20"
                : "bg-transparent"
            } hover:bg-damaged-normal hover:bg-opacity-20 transition-all duration-500 cursor-pointer rounded-full`}
          >
            <FiAlertTriangle className=" w-4 h-4 xl:w-5 xl:h-5 text-[#B41818]" />
          </div>
          <span className="absolute w-auto px-3 py-2  min-w-max left-2 -bottom-12  rounded-md shadow-md text-xs text-white bg-[#222] border-2 border-damaged-dark  font-semibold transition-all duration-300  origin-left scale-0 group-hover:scale-100">
            Damaged piezometers
          </span>
        </div>

        <div className="relative group">
          <div
            onClick={() => {
              status !== 3 && changeStatus(3);
            }}
            className={`  w-10 h-10 xl:w-12 xl:h-12 flex justify-center items-center ${
              status === 3
                ? "bg-disconnected-normal bg-opacity-20"
                : "bg-transparent"
            } hover:bg-disconnected-normal hover:bg-opacity-20 transition-all duration-500 cursor-pointer rounded-full`}
          >
            <VscDebugDisconnect className=" w-4 h-4 xl:w-5 xl:h-5 text-[#C5B317]" />
          </div>
          <span className="absolute w-auto px-3 py-2  min-w-max left-2 -bottom-12  rounded-md shadow-md text-xs text-white bg-[#222] border-2 border-disconnected-dark  font-semibold transition-all duration-300  origin-left scale-0 group-hover:scale-100">
            Disconnected piezometers
          </span>
        </div>

        <div className="relative group">
          <div
            onClick={() => {
              status !== 4 && changeStatus(4);
            }}
            className={`  w-10 h-10 xl:w-12 xl:h-12 flex justify-center items-center ${
              status === 4
                ? "bg-proposed-normal bg-opacity-20"
                : "bg-transparent"
            } bg-opacity-20 hover:bg-proposed-normal hover:bg-opacity-20 transition-all duration-500 cursor-pointer rounded-full`}
          >
            <BsLightbulb className=" w-4 h-4 xl:w-5 xl:h-5 text-[#7B8831]" />
          </div>
          <span className="absolute w-auto px-3 py-2  min-w-max left-2 -bottom-12  rounded-md shadow-md text-xs text-white bg-[#222] border-2 border-proposed-dark  font-semibold transition-all duration-300  origin-left scale-0 group-hover:scale-100">
            Proposed piezometers
          </span>
        </div>

        <div className="relative group">
          <div
            onClick={() => {
              status !== 5 && changeStatus(5);
            }}
            className={`  w-10 h-10 xl:w-12 xl:h-12 flex justify-center items-center ${
              status === 5 ? "bg-tarp-normal bg-opacity-20" : "bg-transparent"
            } hover:bg-tarp-normal hover:bg-opacity-20 transition-all duration-500 cursor-pointer rounded-full`}
          >
            <SiFlood className=" w-4 h-4 xl:w-5 xl:h-5 text-[#2C8A5D]" />
          </div>
          <span className="absolute w-auto px-3 py-2  min-w-max left-2 -bottom-12  rounded-md shadow-md text-xs text-white bg-[#222] border-2 border-tarp-dark font-semibold transition-all duration-300  origin-left scale-0 group-hover:scale-100">
            TARPS
          </span>
        </div>

        <div className="relative group">
          <div
            onClick={() => {
              status !== 6 && changeStatus(6);
            }}
            className={`  w-10 h-10 xl:w-12 xl:h-12 flex justify-center items-center ${
              status === 6
                ? "bg-incident-normal bg-opacity-20"
                : "bg-transparent"
            } hover:bg-incident-normal hover:bg-opacity-20 transition-all duration-500 cursor-pointer rounded-full`}
          >
            <FiAlertOctagon className=" w-4 h-4 xl:w-5 xl:h-5 text-[#831B1B]" />
          </div>
          <span className="absolute w-auto px-3 py-2  min-w-max left-2 -bottom-12  rounded-md shadow-md text-xs text-white bg-[#222] border-2 border-incident-dark  font-semibold transition-all duration-300  origin-left scale-0 group-hover:scale-100">
            Incidents
          </span>
        </div>
      </div>
    </div>
  );
}

export default StatusTable;
