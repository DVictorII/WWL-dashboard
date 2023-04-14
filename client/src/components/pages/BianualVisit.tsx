import React from "react";

import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import MenuNavbar from "../MenuNavbar";
import { Toaster } from "react-hot-toast";
import VisitComp from "../VisitComp";

function BianualVisit() {
  const location = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      key="bianual-visits"
    >
      <MenuNavbar />

      <div className="mt-20 lg:mt-10 flex flex-col sz450:flex-row sz450:items-center sz450:justify-between gap-y-8 pb-10 border-b border-[#F1F5F9]">
        <h1 className="font-bold text-2xl 2xl:text-4xl ">Bianual visits</h1>

        {/* <button
          className="flex items-center gap-x-2 2xl:gap-x-3 bg-orangeSecondary px-4 py-2 2xl:px-6 2xl:py-3 rounded-[10px] text-white w-max"
          style={{ boxShadow: boxShadowSlight }}
        >
          <AiOutlinePlus className="2xl:w-6 2xl:h-6" />
          <Link to={"/reports/incidents/new-incident"}>
            <span className="font-medium 2xl:text-xl">Add new report </span>
          </Link>
        </button> */}
      </div>

      <main className="py-12">
        <div className="mt-20">
          <VisitComp />
        </div>
      </main>
      <Toaster position="top-right" />
    </motion.div>
  );
}

export default BianualVisit;

// {location.pathname === "/bianual-visits" ? (
//     <a className="photo360 w-full h-full">
//       {/* @ts-ignore */}
//       <a-scene embedded>
//         {/* @ts-ignore */}
//         <a-sky src="/static/img/img_69.jpg"></a-sky>
//         {/* <a-sky src="IMG_20220502_094531_00_369.jpg"></a-sky> */}
//         {/* @ts-ignore */}
//       </a-scene>
//     </a>
//   ) : null}
