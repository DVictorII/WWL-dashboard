import React from "react";
import { motion } from "framer-motion";
import MenuNavbar from "../MenuNavbar";
import { Link } from "react-router-dom";
import { img360Data } from "../../utils/img360Data";
import VisitMap from "../BVisits/VisitMap";

function VisitDetails() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      key="media-details"
    >
      <MenuNavbar />

      <div className="mt-20 lg:mt-10 flex flex-col gap-y-10 pb-10 border-b border-[#F1F5F9]">
        <div className="flex flex-col md:flex-row w-full md:justify-between gap-x-10 gap-y-10 flex-wrap">
          <h1 className="font-semibold text-2xl 2xl:text-4xl">
            Biannual review - 360 Photos - May 2022
          </h1>

          <Link to="/operations/biannual-visits">
            <span className="cursor-pointer text-bluePrimary pb-1 border-b border-bluePrimary w-max  2xl:text-2xl font-medium">
              &larr; Back
            </span>
          </Link>
        </div>

        <h2 className="font-semibold text-lg 2xl:text-xl">
          Made on 2022-05-02
        </h2>
      </div>

      <main className="pb-12">
        <p className="leading-relaxed 2xl:text-xl font-medium">
          Use the map below to visualize the media collected during the visit.
        </p>

        <div className="mt-16">
          <VisitMap media={img360Data} />
        </div>
      </main>
    </motion.div>
  );
}

export default VisitDetails;
