import { toast } from "react-hot-toast";
import axios from "./axios";

export const deletePiezoReport = (id: string) => {
  return toast.promise(
    axios.delete(`/piezometer-reports/${id}`),

    {
      loading: "Deleting report...",
      success: (data) => `Piezo. report deleted!!`,
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
};

export const deleteIncidentReport = (id: string) => {
  return toast.promise(
    axios.delete(`/incident-reports/${id}`),

    {
      loading: "Deleting report...",
      success: (data) => `Incident report deleted!!`,
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
};
