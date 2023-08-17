import React, { useState } from "react";
import { IoSaveOutline } from "react-icons/io5";

import { useGloblalUserStore } from "../../store/GlobalUserStore";
import { useNewIncidentReportStateStore } from "../../store/NewIncidentReportStateStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// @ts-ignore
import axios from "../../utils/axios";

import IncidentPhotoUploader from "./IncidentPhotoUploader";

import IncidentLocationShowcaseMap from "./IncidentLocationShowcaseMap";

import IncidentSupervisorsComponent from "./filtering/IncidentSupervisorsComponent";
import IncidentTitle from "./form/IncidentTitle";
import IncidentDescription from "./form/IncidentDescription";
import IncidentDate from "./form/IncidentDate";
import IncidentPaddock from "./form/IncidentPaddock";
import IncidentElevation from "./form/IncidentElevation";
import IncidentLatitude from "./form/IncidentLatitude";
import IncidentLongitude from "./form/IncidentLongitude";

function IncidentReportForm() {
  const userID = useGloblalUserStore((state) => state.userID);
  const title = useNewIncidentReportStateStore((state) => state.title);
  const photo = useNewIncidentReportStateStore((state) => state.photo);
  const description = useNewIncidentReportStateStore(
    (state) => state.description
  );
  const date = useNewIncidentReportStateStore((state) => state.date);
  const supervisors = useNewIncidentReportStateStore(
    (state) => state.supervisors
  );
  const paddock = useNewIncidentReportStateStore((state) => state.paddock);
  const resetState = useNewIncidentReportStateStore(
    (state) => state.resetState
  );

  const latitude = useNewIncidentReportStateStore((state) => state.latitude);
  const longitude = useNewIncidentReportStateStore((state) => state.longitude);
  const elevation = useNewIncidentReportStateStore((state) => state.elevation);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filteredSupervisors = supervisors.filter((sup) => sup !== "");

    try {
      await toast.promise(
        axios.post(
          "/new-incident-report",
          {
            from_user: userID,
            title,
            photo: photo,
            description,
            date,
            supervisors: String(filteredSupervisors),
            paddock,
            latitude,
            longitude,
            elevation,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        ),
        {
          loading: "Creating report...",
          success: (data) => `Incident report created!`,
          error: (err) => `There was an error, please try again`,
        },
        {
          success: {
            duration: 3000,

            style: {
              fontWeight: "500",
              border: "2px solid #65a30d",
              padding: "8px 16px",
              color: "#1c1917",
            },
          },
          error: {
            duration: 3000,

            style: {
              fontWeight: "500",
              border: "2px solid #b91c1c",
              padding: "8px 16px",
              color: "#1c1917",
            },
          },
        }
      );

      resetState();
      navigate("/operations/reports/incidents");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 bg-white p-4 rounded-xl shadow-sm">
        <IncidentTitle />
        <IncidentDescription />

        <IncidentDate />
        <IncidentPaddock />
        <IncidentElevation />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 gap-y-6">
        <div className="bg-white p-4 rounded-xl shadow-sm flex ">
          <div className=" flex flex-col gap-y-6 w-full">
            <h2 className="font-semibold text-[#555]">Incident photo</h2>
            <IncidentPhotoUploader />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm flex items-center ">
          <div className=" flex flex-col gap-y-6 w-full">
            <h2 className="font-semibold text-[#555]">Location map</h2>

            <div className="grid grid-cols-2 gap-x-6">
              <IncidentLatitude />
              <IncidentLongitude />
            </div>

            <div key={`${paddock}`}>
              <IncidentLocationShowcaseMap />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col bg-white p-4 2xl:p-6 rounded-xl shadow-sm">
        <h2 className="font-bold text-sm 2xl:text-base">
          Supervisors (optional)
        </h2>
        <p className="mt-4 text-sm font-medium text-[#666]">
          Add the email of the supervisors who will receive a detailed report.
        </p>

        <IncidentSupervisorsComponent />
      </div>

      <button className="w-max py-2 px-6 bg-[#333] rounded-full text-white  flex items-center justify-center gap-x-2 shadow-sm">
        <IoSaveOutline className="w-6 h-6 " />
        <span className="text-lg font-semibold">Save</span>
      </button>
    </form>
  );
}

export default IncidentReportForm;
