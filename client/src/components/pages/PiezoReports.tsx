import MenuNavbar from "../MenuNavbar";
import PiezoReportComp from "../PiezoReportComp";
import ReportsFiltering from "../ReportsFiltering";

import { AiOutlinePlus } from "react-icons/ai";

// @ts-ignore: Unreachable code error
import { boxShadowSlight } from "../../utils/shadow";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
//@ts-ignore: Unreachable code error
import axios from "../../utils/axios";
import { useQuery } from "react-query";

import FadeLoader from "react-spinners/FadeLoader";

function PiezoReports() {
  const fetchPiezoReports = async () => {
    const result = await axios.get("/piezometer-reports");
    return result.data.reports;
  };

  const { isLoading, data: piezoReports } = useQuery(
    "incidents",
    fetchPiezoReports,
    {
      refetchOnWindowFocus: false,
    }
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      key="piezometers-reports"
    >
      <MenuNavbar />

      <div className="mt-20 lg:mt-10 flex flex-col sz450:flex-row sz450:items-center sz450:justify-between gap-y-8 pb-10 border-b border-[#F1F5F9]">
        <h1 className="font-bold text-2xl 2xl:text-4xl">Piezo. Reports</h1>

        <button
          className="flex items-center gap-x-2 2xl:gap-x-3 bg-[#333] px-4 py-2 2xl:px-6 2xl:py-3 rounded-[10px] text-white w-max"
          style={{ boxShadow: boxShadowSlight }}
        >
          <AiOutlinePlus className="2xl:w-6 2xl:h-6" />
          <Link to={"/reports/piezometers/new-report"}>
            <span className="font-medium 2xl:text-xl">Add new report </span>
          </Link>
        </button>
      </div>

      <main className="pb-12">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <FadeLoader color="#BD9C45" loading={isLoading} radius={50} />
          </div>
        ) : (
          <>
            {/* <ReportsFiltering page="reports" /> */}

            {/* @ts-ignore */}
            {piezoReports.map((report) => (
              <div className="mt-20">
                <PiezoReportComp report={report} />
              </div>
            ))}
          </>
        )}
      </main>
      <Toaster position="top-right" />
    </motion.div>
  );
}

export default PiezoReports;
