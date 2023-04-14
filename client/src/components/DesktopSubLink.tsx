import React from "react";
import { useNavigate } from "react-router-dom";
import { useLogOutStore } from "../store/LogOutStore";

import { useMobileMenuStore } from "../store/MobileMenuStore";

interface DesktopSubLinkProps {
  title: string;
  linkTo?: string;
  isCurrentPage: boolean;
  isAccountLogOut?: boolean;
}

function DesktopSubLink({
  title,
  linkTo,
  isCurrentPage,
  isAccountLogOut,
}: DesktopSubLinkProps) {
  // const router = useRouter();
  const closeMobileMenu = useMobileMenuStore((state) => state.closeMobileMenu);
  const navigate = useNavigate();

  const openLogOutModal = useLogOutStore((state) => state.openLogOutModal);

  const goToPage = (link: string) => {
    navigate(link);
    // router.push(link);
    closeMobileMenu();
  };

  return (
    <div
      className={`px-2 py-3 pl-12 rounded-[14px] cursor-pointer ${
        isCurrentPage ? "bg-orangeSecondaryShadow" : ""
      } `}
      onClick={() => {
        if (linkTo) goToPage(linkTo);

        if (isAccountLogOut) openLogOutModal();
      }}
    >
      <span className="font-semibold  sm:text-lg md:text-base  2xl:text-xl">
        . {title}
      </span>
    </div>
  );
}

export default DesktopSubLink;
