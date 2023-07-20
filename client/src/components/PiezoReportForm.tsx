//@ts-ignore
import axios from "../utils/axios";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { IoSaveOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useGloblalUserStore } from "../store/GlobalUserStore";

import PhotoUploader from "./Reports/PhotoUploader";
import { useNewPiezoReportStateStore } from "../store/NewPiezoReportStateStore";
import PiezoInformationTable from "./PiezometerLectures/PiezoInformationTable";

import ReportLocationTable from "./Reports/form/ReportPiezo";

import PiezoLecturesComponent from "./PiezometerLectures/PiezoLecturesComponent";
import SupervisorsComponent from "./Reports/SupervisorsComponent";
import ReportTitleDescription from "./Reports/form/ReportDescription";
import ReportState from "./Reports/ReportState";
import ReportTitle from "./Reports/form/ReportTitle";
import ReportDescription from "./Reports/form/ReportDescription";
import ReportDate from "./Reports/form/ReportDate";
import ReportPaddock from "./Reports/form/ReportPaddock";
import ReportPiezo from "./Reports/form/ReportPiezo";
import ReportTimeSpan from "./Reports/form/ReportTimeSpan";
import ReportPiezoInformationTable from "./Reports/ReportPiezoInformationTable";

interface reportState {
  title: string;
  paddock: string;
  piezo: string;
  date: string;
  description: string;
}

interface PiezoReportFormProps {
  handleChange: (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => void;
  reportState: reportState;
  piezoListDisplay: string[];
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function PiezoReportForm() {
  const title = useNewPiezoReportStateStore((state) => state.title);
  const photo = useNewPiezoReportStateStore((state) => state.photo);
  const description = useNewPiezoReportStateStore((state) => state.description);
  const date = useNewPiezoReportStateStore((state) => state.date);
  const supervisors = useNewPiezoReportStateStore((state) => state.supervisors);
  const paddock = useNewPiezoReportStateStore((state) => state.paddock);
  const piezo = useNewPiezoReportStateStore((state) => state.piezo);
  const days = useNewPiezoReportStateStore((state) => state.days);
  const chartType = useNewPiezoReportStateStore((state) => state.chartType);
  const userID = useGloblalUserStore((state) => state.userID);

  const resetState = useNewPiezoReportStateStore((state) => state.resetState);

  // useEffect(()=>{
  //   //@ts-ignore
  //   console.log("PHOTO", photo?.name  || "piezoreport-default")
  // },[photo])

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filteredSupervisors = supervisors.filter((sup) => sup !== "");
    console.log(filteredSupervisors);

    try {
      await toast.promise(
        axios.post(
          "/new-piezometer-report",
          {
            from_user: userID,
            title,
            photo,
            description,
            date,
            supervisors: String(filteredSupervisors),
            paddock,
            piezo,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        ),
        {
          loading: "Creating report...",
          success: (data) => `Piezo. report created!`,
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
      navigate("/reports/piezometers");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-8"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 bg-white p-4 rounded-xl shadow-sm">
        <ReportTitle />
        <ReportDescription />

        <ReportPiezo />

        <ReportPaddock />

        {/* <ReportDate /> */}
        <ReportTimeSpan />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 lg:gap-x-8 gap-y-8">
        <div className="bg-white p-4 rounded-xl shadow-sm flex items-center ">
          <PhotoUploader />
        </div>

        <div className="flex flex-col gap-y-4  bg-white p-4 rounded-xl shadow-sm">
          <h2 className="font-bold text-sm 2xl:text-base">
            Piezometer details
          </h2>

          {/* <h2
            className="text-sm md:text-base font-bold"
            key={`${paddock}${piezo}`}
          >
            {paddock} / {piezo}
          </h2> */}
          <ReportPiezoInformationTable />
        </div>
      </div>

      <PiezoLecturesComponent />

      <div className="flex flex-col bg-white p-4 rounded-xl shadow-sm">
        <h2 className="font-bold text-sm 2xl:text-base">
          Supervisors (optional)
        </h2>
        <p className="mt-4 text-sm font-medium text-[#666]">
          Add the email of the supervisors who will receive a detailed report.
        </p>

        <SupervisorsComponent />
      </div>

      <button className="w-max py-2 px-6 bg-[#333] rounded-full text-white  flex items-center justify-center gap-x-2 shadow-sm">
        <IoSaveOutline className="w-6 h-6 " />
        <span className="text-lg font-semibold">Save</span>
      </button>
    </form>
  );
}

export default PiezoReportForm;
