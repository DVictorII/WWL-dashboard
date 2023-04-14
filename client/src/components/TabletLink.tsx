import React from "react";
import {
  AiOutlineDashboard,
  AiOutlineLineChart,
  AiOutlineUser,
} from "react-icons/ai";
import { TbReportAnalytics } from "react-icons/tb";
import { Link } from "react-router-dom";
import AccountPopUp from "./AccountPopUp";

interface TabletLinks {
  icon: string;
  linkTo?: string;
  isCurrentPage: boolean;
  hasAccountPopUp?: boolean;
  isOpen?: boolean;
  closeAccountPopUp?: () => void;
  openAccountPopUp?: () => void;
}

function TabletLink({
  icon,
  linkTo,
  isCurrentPage,
  hasAccountPopUp,
  closeAccountPopUp,
  openAccountPopUp,
  isOpen,
}: TabletLinks) {
  const generateIcon = () => {
    if (icon === "dashboard")
      return <AiOutlineDashboard className="text-3xl text-white" />;
    if (icon === "chart")
      return <AiOutlineLineChart className="text-3xl text-white" />;
    if (icon === "reports")
      return <TbReportAnalytics className="text-3xl text-white" />;
    if (icon === "account")
      return <AiOutlineUser className="text-3xl text-white" />;
  };
  return linkTo ? (
    <Link to={linkTo}>
      <div
        className={`w-12 h-12 flex justify-center items-center rounded-full relative ${
          isCurrentPage ? "bg-[#9E8239]" : ""
        }`}
      >
        {generateIcon()}
      </div>
    </Link>
  ) : (
    <div
      className={`w-12 h-12 flex justify-center items-center rounded-full relative ${
        isCurrentPage ? "bg-[#896C20]" : ""
      }`}
      onClick={() =>
        hasAccountPopUp && openAccountPopUp !== undefined && openAccountPopUp()
      }
    >
      {generateIcon()}

      {isOpen && hasAccountPopUp && closeAccountPopUp !== undefined ? (
        <AccountPopUp isOpen={isOpen} closeAccountPopUp={closeAccountPopUp} />
      ) : null}
    </div>
  );
}

export default TabletLink;
