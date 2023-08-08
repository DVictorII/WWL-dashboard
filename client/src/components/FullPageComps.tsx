import React from "react";
import { useSectionImgStore } from "../store/sectionImgStore";

import { AnimatePresence, motion } from "framer-motion";
import BarChart from "./BarChart";
import SectionImg from "./PiezometerLectures/SectionImg";
import { useMonitoringMapStateStore } from "../store/MonitoringMapStateStore";

interface Information {
  paddock: string;
  piezo: string;
  days: string | number;
  chartType: string;
}

function FullPageComps({ information }: { information: Information }) {
  const sectionImgIsOpen = useSectionImgStore((s) => s.sectionImgIsOpen);
  const closeSectionImg = useSectionImgStore((s) => s.closeSectionImg);

  const piezometersData = useMonitoringMapStateStore((s) => s.piezometersData);

  const currentPiezometer = piezometersData.find(
    (p) => p.paddock === information.paddock && p.id === information.piezo
  );

  const fullPageBarChartIsOpen = useSectionImgStore(
    (s) => s.fullPageBarChartIsOpen
  );
  const closeFullPageBarChart = useSectionImgStore(
    (s) => s.closeFullPageBarChart
  );

  const imgURL = useSectionImgStore((s) => s.imgURL);

  return (
    <>
      <AnimatePresence key="fullpage-img">
        {sectionImgIsOpen ? (
          <div className="fixed top-0 left-0 h-screen w-screen z-[100] flex items-center justify-center">
            <div
              onClick={closeSectionImg}
              className="absolute top-0 left-0 w-full h-full bg-[#222222] bg-opacity-50 backdrop-blur-sm cursor-pointer "
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              exit={{
                opacity: 0,
                transition: { duration: 0.2, ease: "easeInOut" },
              }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[700px] md:w-4/5    rotate-90 origin-center lg:rotate-0"
            >
              <div className="p-5 bg-white rounded-xl shadow-sm ">
                <div className="flex flex-col gap-y-4">
                  <div className="text-2xl font-semibold">
                    {currentPiezometer?.section}
                  </div>

                  <SectionImg fullPage />
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence key="fullpage-barchart">
        {fullPageBarChartIsOpen ? (
          <div className="fixed top-0 left-0 h-screen w-screen z-[100] flex items-center justify-center">
            <div
              onClick={closeFullPageBarChart}
              className="absolute top-0 left-0 w-full h-full bg-[#222222] bg-opacity-50 backdrop-blur-sm blur-md cursor-pointer "
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  w-[700px] md:w-4/5 ] h-1/2 rotate-90 origin-center lg:rotate-0 ">
              <div className="p-5 bg-white rounded-xl shadow-sm">
                <BarChart information={information} fullPage />
              </div>
            </div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default FullPageComps;
