import MenuNavbar from "../MenuNavbar";
import PiezoReportForm from "../PiezoReportForm";

import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function NewPiezoReport() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      key="new-piezometer-report"
    >
      <MenuNavbar />

      <div className="mt-20 lg:mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-y-8 pb-10 border-b border-[#F1F5F9]">
        <h1 className="font-semibold text-2xl  2xl:text-4xl">New Report</h1>

        <Link to="/reports/piezometers">
          <span className="cursor-pointer text-bluePrimary pb-1 border-b border-bluePrimary w-max sz450:justify-self-end 2xl:text-2xl font-medium">
            &larr; Back
          </span>
        </Link>
      </div>

      <main className="py-12">
        <PiezoReportForm />
      </main>
      <Toaster position="top-right" />
    </motion.div>
  );
}

export default NewPiezoReport;
