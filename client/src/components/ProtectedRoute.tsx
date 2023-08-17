//@ts-ignore
import axios from "../utils/axios";
import React from "react";
import { toast, Toaster } from "react-hot-toast";
import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { useGloblalUserStore } from "../store/GlobalUserStore";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const updateUserID = useGloblalUserStore((state) => state.updateUserID);
  const updateWholeUser = useGloblalUserStore((state) => state.updateWholeUser);

  const check_user = async () => {
    try {
      const result = await axios.get("/current-user");
      updateUserID(result.data.id);
      updateWholeUser(result.data);
      return result.data;
    } catch (err) {
      return null;
    }
  };

  const { isLoading, data: user } = useQuery("user", check_user, {
    refetchOnWindowFocus: false,
  });

  if (isLoading)
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <FadeLoader color="#BD9C45" loading={isLoading} radius={50} />
      </div>
    );

  if (!isLoading && !user) {
    // toast("Please, log in", {
    //   duration: 3000,

    //   style: {
    //     fontWeight: "500",
    //     border: "2px solid #b91c1c",
    //     padding: "8px 16px",
    //     color: "#1c1917",
    //   },
    // });

    return (
      <>
        <Navigate to="/login" />
        <Toaster position="top-right" />
      </>
    );
  }

  return children;
}

export default ProtectedRoute;
