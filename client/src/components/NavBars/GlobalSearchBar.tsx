import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

function GlobalSearchBar() {
  return (
    <div className="relative">
      <AiOutlineSearch className="w-5 h-5 absolute top-1/2 left-4 -translate-y-1/2 text-[#555]" />
      <input
        type="text"
        className="w-48 py-2 pl-12 pr-2 rounded-[4px] border border-white text-[#ccc] bg-[#444] focus:outline-active-normal text-xs font-semibold"
        placeholder="Search"
      />
    </div>
  );
}

export default GlobalSearchBar;
