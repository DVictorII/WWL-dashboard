import React from "react";

import labelCard from "../assets/labelCard.svg";

interface LabelCardProps {
  number: number;
  level?: string;
}

function LabelCard({ number, level }: LabelCardProps) {
  const percentage = Math.round((number / 92) * 100);
  return (
    <div className="w-12 h-12 2xl:w-14 2xl:h-14 relative">
      <img src={labelCard} className="w-full h-full" />
      <span className="absolute top-[6px] left-[10px] 2xl:top-[10px]  font-semibold 2xl:text-lg text-textBlue">
        {level ? level : `${percentage}%`}
      </span>
    </div>
  );
}

export default LabelCard;
