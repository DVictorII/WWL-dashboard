import React, {useState} from "react";
import { IoSaveOutline } from "react-icons/io5";

// @ts-ignore: Unreachable code error
import { boxShadowSlight } from "../../utils/shadow";
import landscape from "../assets/loginLandscape.jpg";
import { useGloblalUserStore } from "../../store/GlobalUserStore";
import { useNewIncidentReportStateStore } from "../../store/NewIncidentReportStateStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
// @ts-ignore
import axios from "../../utils/axios"
import PhotoUploader from "../Reports/PhotoUploader";
import IncidentPhotoUploader from "./IncidentPhotoUploader";
import IncidentMapSingle from "../IncidentMapSingle";
import IncidentLocationShowcaseMap from "./IncidentLocationShowcaseMap";
import ReportTitleDescription from "../Reports/ReportTitleDescription";
import ReportDateTable from "../Reports/ReportDateTable";
import ReportLocationTable from "../Reports/ReportLocationTable";
import SupervisorsComponent from "../Reports/SupervisorsComponent";
import IncidentTitleDescription from "./filtering/IncidentTitleDescription";
import IncidentDateTable from "./filtering/IncidentDateTable";
import IncidentLocationTable from "./filtering/IncidentLocationTable";
import IncidentSupervisorsComponent from "./filtering/IncidentSupervisorsComponent";


function IncidentReportForm() {

  const userID = useGloblalUserStore((state) => state.userID);
  const title = useNewIncidentReportStateStore((state) => state.title);
  const photo = useNewIncidentReportStateStore((state) => state.photo);
  const description = useNewIncidentReportStateStore((state) => state.description);
  const date = useNewIncidentReportStateStore((state) => state.date);
  const supervisors = useNewIncidentReportStateStore((state) => state.supervisors);
  const paddock = useNewIncidentReportStateStore((state) => state.paddock);

  const latitude = useNewIncidentReportStateStore((state) => state.latitude);
  const longitude = useNewIncidentReportStateStore((state) => state.longitude);
  const elevation = useNewIncidentReportStateStore((state) => state.elevation);

  const navigate = useNavigate();

  const [mapKey, setMapKey] = useState(1)

  const refreshMap = ()=>{
    setMapKey((s)=>s+1)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filteredSupervisors = supervisors.filter((sup) => sup !== "");
    console.log(filteredSupervisors);

    try {
      await toast.promise(
        axios.post("/new-incident-report", {
          from_user: userID,
          title,
          photo : photo,
          description,
          date,
          supervisors: String(filteredSupervisors),
          paddock,
          latitude,
          longitude,
          elevation
        }, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
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

      navigate("/reports/incidents");
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <form
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-16"
    >
      <IncidentPhotoUploader />

      <div className="flex flex-col gap-y-8 md:gap-y-4">
        <h2 className="font-bold text-sm 2xl:text-base">Report details</h2>

        <div className="md:px-4 grid grid-cols-1 lg:grid-cols-2 gap-x-8 xl:gap-x-10 gap-y-8 md:gap-y-0 lg:gap-y-8 xl:gap-y-10">
          <div className=" md:py-8 flex flex-col gap-y-4 ">
            <h2
              className="text-sm md:text-base font-semibold"
              
            >
              Location map
            </h2>
            <IncidentLocationShowcaseMap information={{
              latitude,
              longitude,
              paddock
            }} key={`${paddock}${mapKey}`}/>
          </div>

          <div className=" md:py-8 flex flex-col gap-y-8">
            <IncidentTitleDescription/>

            <IncidentDateTable />

            <IncidentLocationTable refreshMap={refreshMap} />
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <h2 className="font-bold text-sm 2xl:text-base">
          Supervisors (optional)
        </h2>
        <p className="mt-4 text-sm font-medium">
          Add the email of the supervisors who will receive a detailed report.
        </p>

        <IncidentSupervisorsComponent />
      </div>

      <button
        className="w-max py-3 px-6 bg-all-normal rounded-[14px] text-white  flex items-center justify-center gap-x-2 shadow-sm"
      >
        <IoSaveOutline className="w-6 h-6 " />
        <span className="text-lg font-semibold">Save</span>
      </button>
    </form>
  );
}

export default IncidentReportForm;
