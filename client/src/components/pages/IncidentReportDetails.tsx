import MenuNavbar from "../MenuNavbar";

import { Link, useParams } from "react-router-dom";

//@ts-ignore: Unreachable code error
import axios from "../../utils/axios";
import { useQuery } from "react-query";

import { useEffect } from "react";

import IncidentSupervisorsView from "../Incidents/IncidentSupervisorsView";
import IncidentMapDetailsTable from "../Incidents/IncidentMapDetailsTable";
import { IncidentDetails } from "../../types";
import SkeletonIncidentReportDetailsPage from "../Skeletons/Incidents/SkeletonIncidentReportDetailsPage";

function IncidentReportDetails() {
  const { id } = useParams();

  const fetchIncidents = async () => {
    const result = await axios.get(`/incident-reports/${id}`);
    return result.data.report as IncidentDetails;
  };

  const { isLoading, data: incident } = useQuery(
    `incident-${id}`,
    fetchIncidents,
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading || !incident) return <SkeletonIncidentReportDetailsPage />;

  return (
    <>
      <MenuNavbar />

      <div className="mt-12 md:mt-0 flex flex-col gap-y-12">
        <div className="flex items-center justify-between gap-x-8 gap-y-8 flex-wrap">
          <h1 className="md:text-lg 2xl:text-xl font-bold">
            {incident.incident_title}
          </h1>

          <div className="flex items-center gap-x-8 flex-wrap gap-y-8">
            {/* <button
              // onClick={downloadReport}
              className="flex items-center gap-x-2 md:gap-x-3 lg:gap-x-4 px-4 py-2 bg-all-normal hover:bg-orange-800 transition-all text-white rounded-lg shadow-sm"
            >
              <BsDownload className="w-4 h-4 " />
              <span className="text-xs md:text-sm">Download report on PDF</span>
            </button> */}

            <Link to="/operations/reports/incidents">
              <span className="cursor-pointer text-all-normal pb-1 border-b-2  border-all-normal hover:text-orange-800 hover:border-orange-800 transition-all w-max sz450:justify-self-end md:text-lg  font-semibold ">
                &larr; Back
              </span>
            </Link>
          </div>
        </div>
        <div className="text-sm font-medium">
          {incident.incident_description}
        </div>
      </div>

      <div className="bg-backgroundWhite md:bg-white   md:px-8 md:py-10  rounded-2xl mt-12 flex flex-col gap-y-12 md:shadow-lg ">
        <div className="bg-[#f5f5f5] border border-[#dfdfdf]  shadow-sm w-full sm:w-3/4 lg:w-1/2 min-h-[10rem] md:min-h-[12rem] 2xl:min-h-[14rem] max-h-[20rem]   rounded-lg flex items-center justify-center overflow-hidden cursor-pointer self-center">
          <img
            src={`/media/incident_reports/${
              incident.incident_photo === "incident-default"
                ? "incident-default.png"
                : incident.incident_photo
            }`}
            alt={`/media/incident_reports/${
              incident.incident_photo === "incident-default"
                ? "incident-default.png"
                : incident.incident_photo
            }`}
            className="object-cover"
          />
        </div>

        <IncidentMapDetailsTable incident={incident} />

        <IncidentSupervisorsView incident={incident} />
      </div>
    </>
  );
}

export default IncidentReportDetails;
