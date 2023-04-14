import MapWrapper from "../MapWrapper";
import MenuNavbar from "../MenuNavbar";

// @ts-ignore: Unreachable code error
import { boxShadowSlight } from "../../utils/shadow";

import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

import landscape from "../../assets/loginLandscape.jpg";
//@ts-ignore: Unreachable code error
import axios from "../../utils/axios";
import { useQuery } from "react-query";
import IncidentMapSingle from "../IncidentMapSingle";

import FadeLoader from "react-spinners/FadeLoader";

function IncidentReportDetails() {
  const { id } = useParams();

  const fetchIncidents = async () => {
    const result = await axios.get(`/incident-reports/${id}`);
    return result.data.incidents[0];
  };

  const { isLoading, data: incident } = useQuery(
    `incident-${id}`,
    fetchIncidents,
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading)
    return (
      <div className="w-full h-full flex items-center justify-center">
        <FadeLoader color="#BD9C45" loading={isLoading} radius={50} />
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      key="incident-report-details"
    >
      <MenuNavbar />

      <div className="mt-20 lg:mt-10 flex flex-col sz450:flex-row sz450:justify-between gap-y-10 pb-10 border-b border-[#F1F5F9]">
        <h1 className="font-semibold text-2xl 2xl:text-4xl">
          {incident.title}
        </h1>

        <div>
          <Link to="/reports/incidents">
            <span className=" grow-0  cursor-pointer text-bluePrimary pb-1 border-b border-bluePrimary w-max }2xl:text-2xl font-medium">
              &larr; Back
            </span>
          </Link>
        </div>
      </div>

      <main className="py-12">
        <p className="leading-relaxed 2xl:text-xl font-medium">
          {incident.description}
        </p>

        <div
          className="mt-16 relative w-full h-64 rounded-[14px] overflow-hidden"
          style={{ boxShadow: boxShadowSlight }}
        >
          <img
            src={`/static/img/incident_reports/${incident.photo}`}
            className="h-full object-cover w-full"
          />
        </div>

        <div className="mt-16 flex flex-col gap-y-8">
          <h2 className="text-lg font-semibold 2xl:text-2xl">
            Piezo. information
          </h2>

          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <span className="font-semibold 2xl:text-lg">Paddock section:</span>
            <span className="2xl:text-lg">{incident.paddock}</span>

            <span className="font-semibold 2xl:text-lg">Inspection date:</span>
            <span className="2xl:text-lg">{incident.date}</span>

            <span className="font-semibold 2xl:text-lg">Coordinates:</span>
            <span className="2xl:text-lg">
              {incident.latitude}, {incident.longitude}
            </span>

            <span className="font-semibold 2xl:text-lg">Elevation:</span>
            <span className="2xl:text-lg">{incident.elevation} m</span>
          </div>
        </div>

        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <div className="mt-16">
            <IncidentMapSingle incident={incident} />
          </div>
        )}

        <div className="mt-16 flex flex-col gap-y-8">
          <h2 className="text-lg font-semibold 2xl:text-2xl">
            Supervisors email
          </h2>

          <p className="2xl:text-xl font-medium ">
            These supervisors were notified of the incident. Please contact them
            if required.
          </p>

          <div className=" font-medium 2xl:text-xl flex flex-col gap-y-4">
            <span>. rugaz@wwlengineering.com</span>
            {incident.supervisor2 && <span>. {incident.supervisor2}</span>}

            {incident.supervisor3 && <span>. {incident.supervisor3}</span>}
          </div>
        </div>
      </main>
    </motion.div>
  );
}

export default IncidentReportDetails;
