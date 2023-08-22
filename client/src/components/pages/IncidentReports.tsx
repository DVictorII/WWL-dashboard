import MenuNavbar from "../MenuNavbar";

import { Link } from "react-router-dom";

//@ts-ignore: Unreachable code error
import axios from "../../utils/axios";
import { useQuery } from "react-query";

import IncidentsSliderComp from "../Slider/IncidentsSliderComp";
import IncidentsListTable from "../Incidents/IncidentsListTable";
import SkeletonIncidentReportPage from "../Skeletons/Incidents/SkeletonIncidentReportPage";
import IncidentMapMultiple from "../Incidents/IncidentMapMultiple";
import { AiOutlineLeft, AiOutlinePlus } from "react-icons/ai";

function IncidentReports() {
  const fetchIncidents = async () => {
    const result = await axios.get("/incident-reports");
    return result.data.incidents;
  };

  const { isLoading, data: incidents } = useQuery("incidents", fetchIncidents, {
    refetchOnWindowFocus: false,
  });

  if (isLoading || !incidents) return <SkeletonIncidentReportPage />;

  return (
    <>
      <MenuNavbar />

      <div className="py-4  lg:px-4  border-b border-[#ccc]">
        <div className="flex items-center justify-between flex-wrap gap-y-6">
          <h1 className="flex gap-x-4 items-center ">
            <Link to="/operations/monitoring-map">
              <AiOutlineLeft className="w-4 h-4 cursor-pointer" />
            </Link>
            <span className="font-bold xl:text-lg">
              Operations - Incident Reports
            </span>
          </h1>

          <Link to="/operations/reports/incidents/new-incident">
            <button className="flex items-center gap-x-2 p-2 sm:px-4 rounded-full bg-all-normal text-white  hover:bg-orange-800 transition-all">
              <AiOutlinePlus className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6 " />
              <span className="text-xs sm:text-sm   font-medium hidden sm:block">
                New
              </span>
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-6" />

      <div className="grid grid-cols-1  lg:gap-x-6 gap-y-6 lg:mx-4 ">
        <div className="flex flex-col  bg-white p-4 2xl:p-6 rounded-xl shadow-sm justify-center gap-y-4">
          <div className="  flex flex-col  gap-y-4 w-full ">
            <h2 className="font-semibold text-[#555] ">Featured Incidents</h2>

            <div className="w-full ">
              <IncidentsSliderComp incidents={incidents} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6" />

      <div className="grid grid-cols-1 lg:grid-cols-2  lg:gap-x-6 gap-y-6 lg:mx-4">
        <div className="flex flex-col   bg-white p-4 2xl:p-6 rounded-xl shadow-sm  gap-y-4">
          <div className="  flex flex-col  gap-y-4  ">
            <h2 className="font-semibold text-[#555] ">Reports List</h2>

            <div className="grid grid-cols-1">
              <IncidentsListTable incidents={incidents} />
            </div>
          </div>
        </div>

        <div className="flex flex-col  bg-white p-4 2xl:p-6 rounded-xl shadow-sm justify-center gap-y-4">
          <div className="  flex flex-col  gap-y-4  ">
            <h2 className="font-semibold text-[#555]">
              Incidents Interactive Map
            </h2>

            <div className="grid grid-cols-1">
              <IncidentMapMultiple />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IncidentReports;
