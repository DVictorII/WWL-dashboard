import React from "react";

function GlobalSectionSubtitle({ subtitle }: { subtitle: string }) {
  return (
    <h2 className="font-semibold text-[#666] text-sm xl:text-base ">
      {subtitle}
    </h2>
  );
}

export default GlobalSectionSubtitle;
