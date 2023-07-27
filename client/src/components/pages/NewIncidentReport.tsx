import { useState } from "react";

import MenuNavbar from "../MenuNavbar";

import { Link, useNavigate } from "react-router-dom";
import IncidentReportForm from "../Incidents/IncidentReportForm";
import { useNewIncidentReportStateStore } from "../../store/NewIncidentReportStateStore";

function NewIncidentReport() {
  const resetState = useNewIncidentReportStateStore(
    (state) => state.resetState
  );

  const navigate = useNavigate();

  const cancelForm = () => {
    resetState();
    navigate("/operations/reports/incidents");
  };

  return (
    <>
      <MenuNavbar />

      <div className="mt-12 md:mt-0 flex items-center justify-between gap-x-16 flex-wrap ">
        <h1 className="font-bold xl:text-lg">Operations - New Incident</h1>

        <span
          onClick={cancelForm}
          className="cursor-pointer text-all-normal pb-1 border-b-2  border-all-normal hover:text-orange-800 hover:border-orange-800 transition-all w-max sz450:justify-self-end md:text-lg  font-semibold "
        >
          &larr; Back
        </span>
      </div>

      <div className="md:bg-white bg-[#f1f1f1]   md:px-8 md:py-10  rounded-xl mt-12 flex flex-col gap-y-8 md:shadow-lg">
        <IncidentReportForm />
      </div>
    </>
  );
}

export default NewIncidentReport;
