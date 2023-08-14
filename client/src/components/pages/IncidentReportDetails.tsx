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
import { AiOutlineArrowLeft } from "react-icons/ai";
import IncidentDetailsTable from "../Incidents/IncidentDetailsTable";
import IncidentMapSingle from "../Incidents/IncidentMapSingle";

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

      <div className="mt-12 md:hidden" />

      <div className="flex">
        <Link to="/operations/reports/incidents">
          <button className="flex items-center gap-x-1 pb-px border-b w-max border-transparent hover:border-[#666] transition-all">
            <AiOutlineArrowLeft />
            <span className="cursor-pointer font-semibold">back</span>
          </button>
        </Link>
      </div>

      <div className="mt-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 gap-y-6">
        <div className="flex flex-col gap-y-6">
          <div className="flex items-center justify-between gap-x-8 gap-y-8 flex-wrap bg-white p-4 rounded-xl shadow-sm">
            <h1 className=" font-bold xl:text-lg">Incident Report Details</h1>
          </div>

          <div className=" bg-white p-4 rounded-xl shadow-sm">
            <div className="flex flex-col gap-y-8">
              <div className="flex flex-col gap-y-3 flex-wrap">
                <span className="text-lg 2xl:text-xl font-bold">
                  {incident.incident_title}
                </span>

                <span className="font-semibold text-xs md:text-sm text-[#666]">
                  {incident.incident_date}
                </span>
              </div>

              <div className="gap-x-4 flex items-end">
                <span className="font-semibold text-sm">
                  Incident description:
                </span>{" "}
                <span className="font-medium text-sm">
                  {incident.incident_description}
                </span>{" "}
              </div>
            </div>
          </div>
        </div>

        <div className=" bg-white p-4 rounded-xl shadow-sm">
          <IncidentDetailsTable incident={incident} />
        </div>
      </div>

      <div className="mt-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 gap-y-6">
        <div className=" bg-white p-4 rounded-xl shadow-sm">
          <div className="flex flex-col gap-y-6">
            <h2 className="font-semibold">Location photo</h2>
            <div className="bg-[#f5f5f5] border border-[#dfdfdf]  shadow-sm w-full  min-h-[10rem] md:min-h-[12rem] 2xl:min-h-[14rem] max-h-[20rem]   rounded-md flex items-center justify-center overflow-hidden cursor-pointer ">
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
          </div>
        </div>

        <div className="flex flex-col gap-y-4  bg-white p-4 rounded-xl shadow-sm">
          <div className="flex flex-col gap-y-4">
            <h2 className="font-semibold text-sm 2xl:text-base">
              Incident location map
            </h2>
          </div>

          <IncidentMapSingle incident={incident} />
        </div>
      </div>

      <div className="mt-6" />

      <div className=" bg-white p-4 rounded-xl shadow-sm">
        <IncidentSupervisorsView incident={incident} />
      </div>
    </>
  );
}

export default IncidentReportDetails;
