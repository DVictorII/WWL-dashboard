//@ts-ignore
import axios from "../utils/axios";
import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import FadeLoader from "react-spinners/FadeLoader";

function ProtectedLogIn({ children }: { children: JSX.Element }) {
  const check_user = async () => {
    try {
      const result = await axios.get("/current-user");
      return result.data;
    } catch (err) {
      return null;
    }
  };

  const { isLoading, data: user } = useQuery("user", check_user, {
    cacheTime: 0,
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <FadeLoader color="#BD9C45" loading={isLoading} radius={50} />
      </div>
    );

  if (user) {
    toast("Already logged in!", {
      duration: 3000,

      style: {
        fontWeight: "500",
        border: "2px solid #65a30d",
        padding: "8px 16px",
        color: "#1c1917",
      },
    });

    return (
      <>
        <Navigate to="/" />
        <Toaster position="top-right" />
      </>
    );
  }

  return children;
}

export default ProtectedLogIn;
