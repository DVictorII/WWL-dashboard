import React from "react";

import {
  AiOutlineDashboard,
  AiOutlineLineChart,
  AiOutlineUser,
} from "react-icons/ai";
import { TbReportAnalytics } from "react-icons/tb";

import { FiChevronDown } from "react-icons/fi";

import { useMobileMenuStore } from "../store/MobileMenuStore";
import { useNavigate } from "react-router-dom";

interface ChildLinks {
  Piezometers?: string;
  Incidents?: string;
}

interface DesktopLinks {
  title: string;
  icon: string;
  linkTo?: string;
  hasSubLinks: boolean;
  isCurrentPage: boolean;
}

function DesktopLink({
  title,
  icon,
  linkTo,
  hasSubLinks,
  isCurrentPage,
}: DesktopLinks) {
  const generateIcon = () => {
    if (icon === "dashboard")
      return (
        <AiOutlineDashboard className="w-7 h-7  md:w-6 md:h-6 2xl:w-8 2xl:h-8" />
      );
    if (icon === "chart")
      return (
        <AiOutlineLineChart className="w-7 h-7  md:w-6 md:h-6 2xl:w-8 2xl:h-8" />
      );
    if (icon === "reports")
      return (
        <TbReportAnalytics className="w-7 h-7  md:w-6 md:h-6 2xl:w-8 2xl:h-8" />
      );
    if (icon === "account")
      return (
        <AiOutlineUser className="w-7 h-7  md:w-6 md:h-6 2xl:w-8 2xl:h-8" />
      );
  };

  const navigate = useNavigate();
  const closeMobileMenu = useMobileMenuStore((state) => state.closeMobileMenu);

  const goToPage = (link: string) => {
    navigate(link);
    closeMobileMenu();
  };

  return (
    <div>
      {linkTo ? (
        <div
          className={` flex gap-x-6 sm:gap-x-8 md:gap-x-4 items-center cursor-pointer  px-2 py-3 rounded-[14px] ${
            isCurrentPage ? " bg-orangeSecondaryShadow" : ""
          }`}
          onClick={() => goToPage(linkTo)}
        >
          <div>{generateIcon()}</div>
          <div className="font-semibold text-lg sm:text-xl md:text-base  2xl:text-xl">
            {title}
          </div>
        </div>
      ) : (
        <div className="flex gap-x-6 sm:gap-x-8 md:gap-x-4 items-center  p-2 py-3 rounded-[14px]">
          <div>{generateIcon()}</div>
          <div className="font-semibold text-lg sm:text-xl md:text-base  2xl:text-xl">
            {title}
          </div>
          {hasSubLinks ? (
            <div>
              <FiChevronDown className="text-orangeSecondary" />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default DesktopLink;
