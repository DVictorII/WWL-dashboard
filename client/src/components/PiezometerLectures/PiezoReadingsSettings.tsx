import React, { useState, useRef, useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { TbRulerMeasure } from "react-icons/tb";
import { usePiezometerLecturesStateStore } from "../../store/PiezometerLecturesStateStore";

function PiezoReadingsSettings() {
  const [showing, setShowing] = useState("base");
  const [isOpen, setIsOpen] = useState(false);

  const chartType = usePiezometerLecturesStateStore((s) => s.chartType);
  const changeChartType = usePiezometerLecturesStateStore(
    (s) => s.changeChartType
  );

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  //@ts-ignore
  const handler = (e) => {
    // console.log(menuRef.current.contains(e.target));
    if (
      menuRef.current &&
      buttonRef.current &&
      isOpen &&
      //@ts-ignore
      !menuRef.current.contains(e.target) &&
      //@ts-ignore
      !buttonRef.current.contains(e.target)
    ) {
      console.log("uwu");
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, [menuRef, buttonRef, isOpen]);

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={(e) => {
          //   e.stopPropagation();
          toggleOpen();
        }}
        className="cursor-pointer"
      >
        <HiOutlineDotsVertical className="w-5 h-5 text-[#666] " />
      </button>

      {isOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 top-12 border-2 shadow-sm rounded-[4px] px-2 py-4 w-max z-[20] bg-white"
        >
          {showing === "base" && (
            <div className="flex flex-col gap-y-4">
              <span className="text-xs font-semibold text-[#666]">
                Settings
              </span>

              <div className="flex flex-col gap-y-2">
                <div
                  onClick={() => setShowing("unit")}
                  className="flex items-center justify-between gap-x-4  px-2 py-1 rounded-[4px] cursor-pointer hover:bg-damaged-light transition-all"
                >
                  <div className="flex items-center gap-x-3">
                    <TbRulerMeasure className="text-[#666]" />
                    <span className="text-sm font-medium">Measure units</span>
                  </div>

                  <AiOutlineRight className="w-3 h-3 text-[#666]" />
                </div>

                <div
                  //   onClick={() => setShowing("time")}
                  className="flex items-center justify-between gap-x-4  px-2 py-1 rounded-[4px] cursor-pointer hover:bg-damaged-light transition-all"
                >
                  <div className="flex items-center gap-x-3">
                    <BiTime className="text-[#666]" />
                    <span className="text-sm font-medium">Time span</span>
                  </div>

                  <AiOutlineRight className="w-3 h-3 text-[#666]" />
                </div>
              </div>
            </div>
          )}

          {showing === "unit" && (
            <div className="flex flex-col gap-y-4">
              <div className="flex items-center gap-x-2">
                <AiOutlineLeft
                  className="w-3 h-3 text-[#666] cursor-pointer"
                  onClick={() => setShowing("base")}
                />

                <span className="text-xs font-semibold text-[#666]">
                  Measure units
                </span>
              </div>

              <div className="flex flex-col gap-y-2">
                <div
                  onClick={() => changeChartType("pressure")}
                  style={{
                    backgroundColor:
                      chartType === "pressure"
                        ? "rgb(240,209,209)"
                        : "transparent",
                  }}
                  className="flex items-center justify-between gap-x-4  px-2 py-1 rounded-[4px] cursor-pointer hover:bg-damaged-light transition-all"
                >
                  <div className="flex items-center gap-x-3">
                    <TbRulerMeasure className="text-[#666]" />
                    <span className="text-sm font-medium">Pressure (Kpa)</span>
                  </div>
                </div>

                <div
                  onClick={() => changeChartType("wLevel")}
                  style={{
                    backgroundColor:
                      chartType === "wLevel"
                        ? "rgb(240,209,209)"
                        : "transparent",
                  }}
                  className="flex items-center justify-between gap-x-4  px-2 py-1 rounded-[4px] cursor-pointer hover:bg-damaged-light transition-all"
                >
                  <div className="flex items-center gap-x-3">
                    <TbRulerMeasure className="text-[#666]" />
                    <span className="text-sm font-medium">Water Level (m)</span>
                  </div>
                </div>

                <div
                  onClick={() => changeChartType("wElevation")}
                  style={{
                    backgroundColor:
                      chartType === "wElevation"
                        ? "rgb(240,209,209)"
                        : "transparent",
                  }}
                  className="flex items-center justify-between gap-x-4  px-2 py-1 rounded-[4px] cursor-pointer hover:bg-damaged-light transition-all"
                >
                  <div className="flex items-center gap-x-3">
                    <TbRulerMeasure className="text-[#666]" />
                    <span className="text-sm font-medium">
                      Water Elevation (RLm)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default PiezoReadingsSettings;
