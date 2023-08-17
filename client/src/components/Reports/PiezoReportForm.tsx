//@ts-ignore
import axios from "../../utils/axios";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { IoSaveOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useGloblalUserStore } from "../../store/GlobalUserStore";

import PhotoUploader from "./PhotoUploader";
import { useNewPiezoReportStateStore } from "../../store/NewPiezoReportStateStore";

import PiezoLecturesComponent from "../PiezometerLectures/PiezoLecturesComponent";
import SupervisorsComponent from "./SupervisorsComponent";

import ReportTitle from "./form/ReportTitle";
import ReportDescription from "./form/ReportDescription";

import ReportPaddock from "./form/ReportPaddock";
import ReportPiezo from "./form/ReportPiezo";
import ReportTimeSpan from "./form/ReportTimeSpan";

import ReportPiezoTableWithInoperativeDates from "./form/ReportPiezoTableWithInoperativeDates";
import { BsFillGearFill } from "react-icons/bs";
import { FiAlertTriangle } from "react-icons/fi";

import Switch from "react-switch";

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
  const timeSpan = useNewPiezoReportStateStore((state) => state.timeSpan);

  const lecturesInformation = useNewPiezoReportStateStore(
    (state) => state.lecturesInformation
  );

  const resetState = useNewPiezoReportStateStore((state) => state.resetState);

  const navigate = useNavigate();

  const [displaying, setDisplaying] = useState("piezoInfo");
  const handleToggleTable = () => {
    if (displaying === "piezoInfo") setDisplaying("inoperativeDates");
    if (displaying === "inoperativeDates") setDisplaying("piezoInfo");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filteredSupervisors = supervisors.filter((sup) => sup !== "");

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
            time_span: timeSpan,
            readings_information: JSON.stringify(lecturesInformation),
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
      navigate("/operations/reports/piezometers");
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 bg-white p-4 rounded-xl shadow-sm">
        <ReportTitle />
        <ReportDescription />
        <ReportPaddock />

        <ReportPiezo />

        {/* <ReportDate /> */}
        <ReportTimeSpan />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6 gap-y-8">
        <div className="bg-white p-4 rounded-xl shadow-sm flex items-center ">
          <PhotoUploader />
        </div>

        <div className="flex flex-col gap-y-4  bg-white p-4 rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-y-4">
              <h2 className="font-semibold text-[#555]">Piezometer details</h2>

              <div className="flex items-center gap-x-2 font-bold">
                <span>{paddock}</span>
                <span>-</span>
                <span>{piezo}</span>
              </div>
            </div>

            <Switch
              onChange={handleToggleTable}
              checked={displaying === "piezoInfo"}
              offColor="#8D2525"
              onColor="#1C394A"
              uncheckedIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 20,
                    color: "#fff",
                  }}
                >
                  <FiAlertTriangle className="w-4 h-4" />
                </div>
              }
              checkedIcon={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    fontSize: 20,
                    color: "#fff",
                  }}
                >
                  <BsFillGearFill className="w-4 h-4" />
                </div>
              }
            />
          </div>

          {/* <h2
            className="text-sm md:text-base font-bold"
            key={`${paddock}${piezo}`}
          >
            {paddock} / {piezo}
          </h2> */}
          <ReportPiezoTableWithInoperativeDates
            displaying={displaying}
            handleToggleTable={handleToggleTable}
          />
        </div>
      </div>

      <PiezoLecturesComponent />

      <div className="flex flex-col bg-white p-4 2xl:p-6 rounded-xl shadow-sm">
        <h2 className="font-semibold text-sm 2xl:text-base">
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
