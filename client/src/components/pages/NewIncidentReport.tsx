import { useState } from "react";

import MenuNavbar from "../MenuNavbar";

import { Link, useNavigate } from "react-router-dom";
import IncidentReportForm from "../Incidents/IncidentReportForm";
import { useNewIncidentReportStateStore } from "../../store/NewIncidentReportStateStore";
import { AiOutlineArrowLeft, AiOutlineLeft } from "react-icons/ai";

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

      <div className="py-4  lg:px-4  border-b border-[#ccc]">
        <div className="flex flex-col gap-y-4">
          <h1 className="flex gap-x-4 items-center ">
            <div onClick={cancelForm} className="cursor-pointer">
              <AiOutlineLeft className="w-4 h-4 " />
            </div>

            <span className="font-bold xl:text-lg">
              Operations - New Incident
            </span>
          </h1>
        </div>
      </div>

      <div className="mt-6" />

      <div className="lg:mx-4">
        <IncidentReportForm />
      </div>
    </>
  );
}

export default NewIncidentReport;
