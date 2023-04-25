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
import { BsBookmarkHeartFill, BsPlusSquare } from "react-icons/bs";
import SliderComp from "../Slider/SliderComp";
import ReportsListTable from "../Reports/ReportsListTable";

function IncidentReports() {
  const fetchIncidents = async () => {
    const result = await axios.get("/incident-reports");
    return result.data.incidents;
  };

  const { isLoading, data: incidents } = useQuery("incidents", fetchIncidents, {
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <MenuNavbar />

      <div className="items-center flex flex-wrap justify-between mt-12 md:mt-0 gap-x-8 gap-y-4">
        <h1 className=" md:text-lg 2xl:text-xl font-bold">
          Incident Reports
        </h1>

        <div className="flex items-center gap-x-4">
          <div className="w-8 h-8 xl:w-10 xl:h-10 bg-[#333] flex items-center justify-center rounded-full text-white ">
            <BsBookmarkHeartFill className="w-3 h-3 xl:w-4 xl:h-4" />
          </div>

          <Link to="/reports/incidents/new-incident">
            <button className="flex items-center gap-x-2 px-3 xl:px-4 py-2 bg-[#333] text-white rounded-[8px]">
              <BsPlusSquare className="w-3 h-3 xl:w-4 xl:h-4" />
              <span className="text-xs xl:text-sm font-bold">new</span>
            </button>
          </Link>
        </div>
      </div>

      <div className="md:bg-[#f5f5f5] bg-white   md:p-6   rounded-2xl mt-12 flex flex-col gap-y-10">
        
        <div className="grid-cols-1  grid gap-x-10 gap-y-10  ">
          <div className="  flex flex-col  gap-y-4 w-full ">
            <h2 className="font-bold text-sm 2xl:text-base">
              Featured reports
            </h2>

            <div className="w-full ">
              <SliderComp reports={piezoReports}/>
            </div>
          </div>
        </div>

        <div className="  flex flex-col  gap-y-4  ">
          <h2 className="font-bold text-sm 2xl:text-base">Reports List</h2>

          <div className="grid grid-cols-1">
            <ReportsListTable reports={piezoReports}/>
          </div>
        </div>
      </div>

      <div className="pb-12">
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
      </div>
      
    </>
  );
}

export default IncidentReports;
