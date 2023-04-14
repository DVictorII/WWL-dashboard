import React from "react";
import { BsCheck2, BsLightbulb } from "react-icons/bs";

import { AiOutlineDisconnect, AiOutlineWarning } from "react-icons/ai";
import { SiFlood } from "react-icons/si";
import { BiErrorAlt } from "react-icons/bi";
import ProgressChart from "./ProgressChart";

// @ts-ignore: Unreachable code error
import { boxShadow, boxShadowSlight } from "../utils/shadow";

interface PiezoCardProps {
  title: string;
  icon: string;
  number?: number;
  color: string;
  level?: string;

  statusID: number;
  selectStatusCard: (statusID: number) => void;
  returnStatusToNormal: () => void;
  isActive: boolean;
  isIncidentsCard?: boolean;
  selectIncidents?: () => void;
}

function PiezoCard({
  title,
  icon,
  number,
  color,
  level,
  statusID,
  selectStatusCard,
  returnStatusToNormal,
  isActive,
  isIncidentsCard,
  selectIncidents,
}: PiezoCardProps) {
  const selectIcon = () => {
    if (icon === "active")
      return <BsCheck2 style={{ color }} className="w-5 h-5 lg:w-6 lg:h-6 " />;
    if (icon === "damaged")
      return (
        <AiOutlineWarning
          style={{ color }}
          className="w-5 h-5 lg:w-6 lg:h-6 "
        />
      );
    if (icon === "disconnected")
      return (
        <AiOutlineDisconnect
          style={{ color }}
          className="w-5 h-5 lg:w-6 lg:h-6 "
        />
      );
    if (icon === "proposed")
      return (
        <BsLightbulb style={{ color }} className="w-5 h-5 lg:w-6 lg:h-6 " />
      );
    if (icon === "tarps")
      return <SiFlood style={{ color }} className="w-5 h-5 lg:w-6 lg:h-6 " />;
    if (icon === "incidents")
      return (
        <BiErrorAlt style={{ color }} className="w-5 h-5 lg:w-6 lg:h-6 " />
      );
  };
  return (
    <div
      onClick={
        isIncidentsCard
          ? selectIncidents
          : isActive
          ? returnStatusToNormal
          : () => selectStatusCard(statusID)
      }
      className={`w-full flex flex-col rounded-[14px]  bg-white z-[10] border-2 border-b-0 cursor-pointer `}
      style={{
        boxShadow: isActive ? boxShadow : boxShadowSlight,
        borderColor: isActive ? color : "transparent",
      }}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="lg:text-sm xl:text-base 2xl:text-lg">{title}</span>
          {selectIcon()}
        </div>
        <span className="font-semibold text-2xl 2xl:text-3xl block mt-4">
          {number}
        </span>
      </div>
      <div className="mt-6">
        <ProgressChart
          isIncidentsCard={isIncidentsCard}
          number={number ? number : 0}
          level={level}
        />
      </div>

      <div
        className="mt-8 h-[10px] 2xl:h-[12px] justify-self-end  "
        style={{ borderRadius: "0px 0px 10px 10px", backgroundColor: color }}
      />
    </div>
  );
}

export default PiezoCard;
