import React from "react";
import { AiOutlineBell } from "react-icons/ai";

function AlertsButton() {
  return (
    <div className=" w-10 h-10 rounded-full border border-white flex justify-center items-center relative cursor-pointer  group">
      <AiOutlineBell className=" w-4 h-4 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6" />
      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-orange-500" />

      <div className="absolute w-auto px-4 py-2 m-2 min-w-max -bottom-14 rounded-[4px] shadow-md text-white bg-[#333] border-2 border-gray-500  font-bold text-sm transition-all duration-300  origin-top scale-0 group-hover:scale-100">
        Alerts (under construction)
      </div>
    </div>
  );
}

export default AlertsButton;
