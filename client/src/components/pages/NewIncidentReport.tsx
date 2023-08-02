import { useState } from "react";

import MenuNavbar from "../MenuNavbar";

import { Link, useNavigate } from "react-router-dom";
import IncidentReportForm from "../Incidents/IncidentReportForm";
import { useNewIncidentReportStateStore } from "../../store/NewIncidentReportStateStore";
import { AiOutlineArrowLeft } from "react-icons/ai";

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

      <div className="mt-12 md:hidden" />

      <div className="flex items-center gap-x-1 pb-px border-b w-max border-transparent hover:border-[#666] transition-all">
        <AiOutlineArrowLeft />
        <span onClick={cancelForm} className="cursor-pointer font-semibold">
          back
        </span>
      </div>

      <div className="mt-4" />

      <div className="flex items-center justify-between gap-x-8 gap-y-8 flex-wrap bg-white p-4 rounded-xl shadow-sm">
        <h1 className="font-bold xl:text-lg">Operations - New Incident</h1>
      </div>

      <div className="mt-4" />

      <IncidentReportForm />
    </>
  );
}

export default NewIncidentReport;
