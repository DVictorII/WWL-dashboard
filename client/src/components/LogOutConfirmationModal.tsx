//@ts-ignore
import axios from "../utils/axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useConfirmationModalStore } from "../store/ConfirmationModalStore";

function LogOutConfirmationModal() {
  const closeLogOutModal = useConfirmationModalStore(
    (state) => state.closeLogOutModal
  );

  const navigate = useNavigate();

  const logOut = async () => {
    await axios.post("/logout");

    navigate("/login");
    closeLogOutModal();
  };

  return (
    <div className="px-4 sm:px-0 fixed top-0 left-0 right-0 w-full h-screen z-[2000] flex justify-center items-center">
      <div
        className="bg-stone-900 bg-opacity-70 w-full h-full absolute left-0 top-0 cursor-pointer backdrop-blur-[2px]"
        onClick={closeLogOutModal}
      />

      <div className=" relative  w-full sm:w-2/3 lg:w-1/2  bg-white rounded-xl overflow-hidden flex flex-col ">
        <div className="w-full h-28 lg:h-32 2xl:h-36">
          <img
            src="/media/img/photos/Rossing_mine.jpg"
            alt="Rossing mine photo banner"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-y-6 py-6 md:py-8 lg:py-10 md:gap-y-10 lg:gap-y-12 h-full justify-center items-center border-b-4 border-t-4 border-[#831B1B]">
          <div className=" text-lg sm:text-xl md:text-2xl font-semibold 2xl:text-3xl">
            Are you sure you want to log out?
          </div>

          <div className="flex gap-x-6 md:gap-x-8 lg:gap-x-10">
            <button
              onClick={logOut}
              className="px-8 lg:px-10 2xl:px-12 py-1 2xl:py-2  border-2 border-[#831B1B] text-white rounded-lg bg-[#831B1B] hover:bg-[#622323] transition-all  sm:text-lg xl:text-xl font-semibold"
            >
              Confirm
            </button>
            <button
              onClick={closeLogOutModal}
              className="px-8 lg:px-10 2xl:px-12 py-1 2xl:py-2  border-2 border-[#333] text-[#333] rounded-lg bg-white hover:bg-[#333] hover:text-white transition-all  sm:text-lg xl:text-xl font-semibold"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogOutConfirmationModal;
