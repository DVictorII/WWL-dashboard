import React, { useState } from "react";
import { AiOutlineCheck, AiOutlineGlobal } from "react-icons/ai";
import { BsLightbulb } from "react-icons/bs";
import { FiAlertTriangle, FiAlertOctagon } from "react-icons/fi";
import { VscDebugDisconnect } from "react-icons/vsc";
import { SiFlood } from "react-icons/si";
import { useMonitoringMapStateStore } from "../../../store/MonitoringMapStateStore";
import { monitoringMapStatusInfo } from "../../../utils/monitoringMapStatusInfo";
import { useMediaQuery } from "react-responsive";
import { HiOutlineArchiveBox } from "react-icons/hi2";

const statusOptions = [
  {
    statusNumber: 0,
    icon: <AiOutlineGlobal className="xl:w-5 xl:h-5" />,
    title: "All",
  },

  {
    statusNumber: 1,
    icon: <AiOutlineCheck className="xl:w-5 xl:h-5" />,
    title: "Active",
  },

  {
    statusNumber: 2,
    icon: <FiAlertTriangle className="xl:w-5 xl:h-5" />,
    title: "Damaged",
  },

  {
    statusNumber: 3,
    icon: <VscDebugDisconnect className="xl:w-5 xl:h-5" />,
    title: (
      <>
        <span className="xl:hidden">Disconn.</span>
        <span className="hidden xl:block">Disconnected</span>
      </>
    ),
  },

  {
    statusNumber: 4,
    icon: <BsLightbulb className="xl:w-5 xl:h-5" />,
    title: "Proposed",
  },

  {
    statusNumber: 5,
    icon: <SiFlood className="xl:w-5 xl:h-5" />,
    title: "TARPS",
  },
  {
    statusNumber: 6,
    icon: <HiOutlineArchiveBox className="xl:w-5 xl:h-5" />,
    title: "Archived",
  },
];

function StatusTable() {
  const status = useMonitoringMapStateStore((state) => state.status);
  const isBigScreen = useMediaQuery({ query: "(min-width: 1024px)" });
  const islg = useMediaQuery({ query: "(max-width: 1280px)" });

  const changeStatus = useMonitoringMapStateStore(
    (state) => state.changeStatus
  );

  const [isHovered, setIsHovered] = useState<number | boolean>(0);

  //
  const statusInfoObj = monitoringMapStatusInfo[Number(status)];

  return isBigScreen ? (
    <div className="flex flex-col gap-y-4 col-span-2 p-4 border-r border-[#ccc]">
      <h3 className="font-semibold text-[#666] ">Piezometer status</h3>

      <div className="grid grid-cols-4 gap-x-2 gap-y-5 ">
        {statusOptions.map((statusObj) => (
          <div className="flex justify-center">
            <div className="flex flex-col gap-y-2 items-center">
              <button
                onClick={() => {
                  status !== statusObj.statusNumber &&
                    changeStatus(statusObj.statusNumber);
                }}
                style={{
                  backgroundColor:
                    status === statusObj.statusNumber
                      ? statusInfoObj.lightColor
                      : isHovered === statusObj.statusNumber
                      ? monitoringMapStatusInfo[statusObj.statusNumber]
                          .lightColor
                      : "",

                  color:
                    status === statusObj.statusNumber
                      ? statusInfoObj.normalColor
                      : "#666",
                }}
                onMouseEnter={() => setIsHovered(statusObj.statusNumber)}
                onMouseLeave={() => setIsHovered(false)}
                className={` w-10 h-10 xl:w-12 xl:h-12  flex justify-center items-center    transition-all duration-300 cursor-pointer rounded-full `}
              >
                {statusObj.icon}
              </button>
              <span
                style={{
                  color:
                    status === statusObj.statusNumber
                      ? statusInfoObj.normalColor
                      : "#666",
                }}
                className="text-xs font-semibold transition-all duration-300"
              >
                {statusObj.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-y-1 col-span-2 ">
      <h3 className="font-semibold text-[#666] text-xs ">Piezometer status</h3>

      <div
        // style={{
        //   shadowColor: selectedStatus.darkColor,
        // }}
        className="py-2 flex items-center w-full justify-between px-2 sm:px-4 gap-x-2 bg-white  rounded-xl shadow-sm shadow-"
      >
        <div className="relative group">
          <button
            onClick={() => {
              status !== 0 && changeStatus(0);
            }}
            className={` w-10 h-10 xl:w-12 xl:h-12 flex justify-center items-center ${
              status === 0 ? "bg-all-normal bg-opacity-20" : "bg-transparent"
            } hover:bg-all-normal hover:bg-opacity-20  transition-all duration-500 cursor-pointer rounded-full `}
          >
            <span className="font-semibold text-sm">All</span>
          </button>
          <span className="absolute w-auto px-3 py-2  min-w-max left-2 -bottom-12  rounded-md shadow-md text-xs text-white bg-[#333] border border-gray-500  font-semibold transition-all duration-300  origin-left scale-0 group-hover:scale-100">
            All piezo.
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
          <span className="absolute w-auto px-3 py-2  min-w-max left-2 -bottom-12  rounded-md shadow-md text-xs text-white bg-[#333] border border-active-dark  font-semibold transition-all duration-300  origin-left scale-0 group-hover:scale-100">
            Active piezo.
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
          <span className="absolute w-auto px-3 py-2  min-w-max left-2 -bottom-12  rounded-md shadow-md text-xs text-white bg-[#333] border border-damaged-dark  font-semibold transition-all duration-300  origin-left scale-0 group-hover:scale-100">
            Damaged piezo.
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
          <span className="absolute w-auto px-3 py-2  min-w-max left-2 -bottom-12  rounded-md shadow-md text-xs text-white bg-[#333] border border-disconnected-dark  font-semibold transition-all duration-300  origin-left scale-0 group-hover:scale-100">
            Disconnected piezo.
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
          <span className="absolute w-auto px-3 py-2  min-w-max left-2 -bottom-12  rounded-md shadow-md text-xs text-white bg-[#333] border border-proposed-dark  font-semibold transition-all duration-300  origin-left scale-0 group-hover:scale-100">
            Proposed piezo.
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
          <span className="absolute w-auto px-3 py-2  min-w-max left-2 -bottom-12  rounded-md shadow-md text-xs text-white bg-[#333] border border-tarp-dark font-semibold transition-all duration-300  origin-left scale-0 group-hover:scale-100">
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
          <span className="absolute w-auto px-3 py-2  min-w-max left-2 -bottom-12  rounded-md shadow-md text-xs text-white bg-[#333] border border-incident-dark  font-semibold transition-all duration-300  origin-left scale-0 group-hover:scale-100">
            Incidents
          </span>
        </div>
      </div>
    </div>
  );
}

export default StatusTable;
