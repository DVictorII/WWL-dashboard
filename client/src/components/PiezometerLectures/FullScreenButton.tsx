import React from "react";
import { AiFillEye } from "react-icons/ai";

function FullScreenButton() {
  return (
    <div className="flex items-center gap-x-2">
      <span className="text-xs font-semibold">Watch full screen</span>
      <AiFillEye />
    </div>
  );
}

export default FullScreenButton;
