//@ts-ignore
import axios from "../utils/axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLogOutStore } from "../store/LogOutStore";

function LogOutConfirmationModal() {
  const closeLogOutModal = useLogOutStore((state) => state.closeLogOutModal);

  const navigate = useNavigate();

  const logOut = async () => {
    await axios.post("/logout");

    navigate("/login");
    closeLogOutModal();
  };

  return (
    <div className="px-4 sm:px-0 fixed top-0 left-0 right-0 w-full h-screen z-[2000] flex justify-center items-center">
      <div
        className="bg-stone-900 bg-opacity-70 w-full h-full absolute left-0 top-0 cursor-pointer"
        onClick={closeLogOutModal}
      />

      <div className="flex flex-col justify-center gap-y-12 relative  w-full sm:w-2/3 lg:w-1/2 h-1/2 bg-white rounded-[18px] px-6 md:px-8 border-2 border-orangeSecondary">
        <div className="text-xl md:text-2xl font-semibold 2xl:text-3xl">
          Are you sure you want to log out?
        </div>

        <div className="flex gap-x-10">
          <button
            onClick={logOut}
            className="px-6 lg:px-10 py-2  border-2 border-orangeSecondary text-white rounded-[14px] bg-[#333] text-lg xl:text-xl font-semibold"
          >
            Confirm
          </button>
          <button
            onClick={closeLogOutModal}
            className="px-6 lg:px-10 py-2  border-2 border-[#333] text-[#333] rounded-[14px] bg-white text-lg xl:text-xl font-semibold"
          >
            Go back
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogOutConfirmationModal;
