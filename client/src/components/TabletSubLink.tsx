import React from "react";
import { Link } from "react-router-dom";

interface TabletSubLinkProps {
  title: string;
  linkTo: string;
  isCurrentPage: boolean;
}

function TabletSubLink({ title, linkTo, isCurrentPage }: TabletSubLinkProps) {
  return (
    <Link to={linkTo}>
      <div
        className={` font-semibold text-lg pb-2 border-b-2  ${
          isCurrentPage ? "border-orangeSecondary" : " border-transparent"
        } `}
      >
        {title}
      </div>
    </Link>
  );
}

export default TabletSubLink;
