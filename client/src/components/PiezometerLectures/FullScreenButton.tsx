import React from "react";
import { AiFillEye } from "react-icons/ai";
import { useSectionImgStore } from "../../store/sectionImgStore";
import { MdOpenInFull } from "react-icons/md";

function FullScreenButton({
  comp = "chart",
  url,
}: {
  comp: string;
  url?: string;
}) {
  const openFullPageBarChart = useSectionImgStore(
    (s) => s.openFullPageBarChart
  );
  const openSectionImg = useSectionImgStore((s) => s.openSectionImg);
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (comp === "chart") openFullPageBarChart();

        if (comp === "section") openSectionImg(url as string);
      }}
      className="w-6 h-6 flex items-center justify-center border-2 rounded-[4px] border-[#666]"
    >
      <MdOpenInFull className="w-3 h-3 text-[#666]" />
    </button>
  );
}

export default FullScreenButton;
