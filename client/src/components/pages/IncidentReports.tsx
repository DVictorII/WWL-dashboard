import IncidentReportComp from "../IncidentReportComp";
import MenuNavbar from "../MenuNavbar";

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

function IncidentReports() {
  const fetchIncidents = async () => {
    const result = await axios.get("/incident-reports");
    return result.data.incidents;
  };

  const { isLoading, data: incidents } = useQuery("incidents", fetchIncidents, {
    refetchOnWindowFocus: false,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      key="incidents-reports"
    >
      <MenuNavbar />

      <div className="mt-20 lg:mt-10 flex flex-col sz450:flex-row sz450:items-center sz450:justify-between gap-y-8 pb-10 border-b border-[#F1F5F9]">
        <h1 className="font-bold text-2xl 2xl:text-4xl ">Incident Reports</h1>

        <Link to={"/reports/incidents/new-incident"}>
          <button
            className="flex items-center gap-x-2 2xl:gap-x-3 bg-[#333] px-4 py-2 2xl:px-6 2xl:py-3 rounded-[10px] text-white w-max"
            style={{ boxShadow: boxShadowSlight }}
          >
            <AiOutlinePlus className="2xl:w-6 2xl:h-6" />

            <span className="font-medium 2xl:text-xl">Add new report </span>
          </button>
        </Link>
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
            {incidents.map((incident) => (
              <div className="mt-20">
                <IncidentReportComp incident={incident} />
              </div>
            ))}
          </>
        )}
      </main>
      <Toaster position="top-right" />
    </motion.div>
  );
}

export default IncidentReports;
