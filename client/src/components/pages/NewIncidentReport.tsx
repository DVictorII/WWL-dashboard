import { useState } from "react";
import IncidentReportForm from "../IncidentReportForm";
import MenuNavbar from "../MenuNavbar";

import React from "react";

import { motion } from "framer-motion";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
//@ts-ignore: Unreachable code error
import axios from "../../utils/axios";
import { useGloblalUserStore } from "../../store/GlobalUserStore";
import { toast, Toaster } from "react-hot-toast";

function NewIncidentReport() {
  const userID = useGloblalUserStore((state) => state.userID);
  const [incidentState, setIncidentState] = useState<{
    from_user: number;
    photo: File | undefined;
    title: string;
    paddock: string;
    date: string;

    latitude: number;
    longitude: number;
    elevation: number;
    description: string;

    supervisor2: string;
    supervisor3: string;
  }>({
    from_user: userID,
    photo: undefined,
    title: "",
    paddock: "CDIII",
    date: moment(Date.now()).format("YYYY-MM-DD"),

    latitude: 0,
    longitude: 0,
    elevation: 0,
    description: "",

    supervisor2: "",
    supervisor3: "",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setIncidentState((s) => {
      return {
        ...s,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      setIncidentState((s) => {
        return {
          ...s,
          photo: file,
        };
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await toast.promise(
        axios.post("/new-incident-report", incidentState, {
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      key="new-incident-report"
    >
      <MenuNavbar />

      <div className="mt-20 lg:mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-8 pb-10 border-b border-[#F1F5F9]">
        <h1 className="font-semibold text-2xl 2xl:text-4xl">New Incident</h1>

        <Link to="/reports/incidents">
          <span className="cursor-pointer text-bluePrimary pb-1 border-b border-bluePrimary w-max sz450:justify-self-end 2xl:text-2xl font-medium">
            &larr; Back
          </span>
        </Link>
      </div>

      <main className="py-12">
        <IncidentReportForm
          incidentState={incidentState}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handlePhotoChange={handlePhotoChange}
        />
      </main>
      <Toaster position="top-right" />
    </motion.div>
  );
}

export default NewIncidentReport;
