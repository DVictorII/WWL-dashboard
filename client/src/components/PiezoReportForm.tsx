//@ts-ignore
import axios from "../utils/axios";
import React from "react";
import { toast} from "react-hot-toast";
import { IoSaveOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useGloblalUserStore } from "../store/GlobalUserStore";

import PhotoUploader from "./Reports/PhotoUploader";
import { useNewPiezoReportStateStore } from "../store/NewPiezoReportStateStore";
import PiezoInformationTable from "./PiezometerLectures/PiezoInformationTable";

import ReportLocationTable from "./Reports/ReportLocationTable";
import ReportDateTable from "./Reports/ReportDateTable";
import PiezoLecturesComponent from "./PiezometerLectures/PiezoLecturesComponent";
import SupervisorsComponent from "./Reports/SupervisorsComponent";
import ReportTitleDescription from "./Reports/ReportTitleDescription";
import ReportState from "./Reports/ReportState";

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


  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await toast.promise(
        axios.post("/new-piezometer-report", {
          from_user: userID,
          photo,
          title,
          paddock,
          piezo,
          date,
          description,
          supervisors
        }),
        {
          loading: "Creating report...",
          success: (data) => `Piezometer report created!`,
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

      navigate("/reports/piezometers");
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-20">
      <PhotoUploader />

      {/* <ReportState/> */}

      <div className="flex flex-col gap-y-8 md:gap-y-4">
        <h2 className="font-bold text-sm 2xl:text-base">Report details</h2>

        <div className="md:px-4 grid grid-cols-1 lg:grid-cols-2 gap-x-8 xl:gap-x-10 gap-y-8 md:gap-y-0 lg:gap-y-8 xl:gap-y-10">
          <div className=" md:py-8 flex flex-col gap-y-4 ">
            <h2
              className="text-sm md:text-base font-semibold"
              key={`${paddock}${piezo}`}
            >
              {paddock} / {piezo}
            </h2>
            <PiezoInformationTable />
          </div>

          <div className=" md:py-8 flex flex-col gap-y-8">
            <ReportTitleDescription/>

            <ReportDateTable />

            <ReportLocationTable />
          </div>
        </div>
      </div>

      <PiezoLecturesComponent />

      <div className="flex flex-col">
        <h2 className="font-bold text-sm 2xl:text-base">
          Supervisors (optional)
        </h2>
        <p className="mt-4 text-sm font-medium">
          Add the email of the supervisors who will receive a detailed report.
        </p>

        <SupervisorsComponent />
      </div>

      <button
        className="w-max py-3 px-6 bg-[#333] rounded-[14px] text-white  flex items-center justify-center gap-x-2 shadow-sm"
        disabled
      >
        <IoSaveOutline className="w-6 h-6 " />
        <span className="text-lg font-semibold">Save</span>
      </button>
    </form>
  );
}

export default PiezoReportForm;
