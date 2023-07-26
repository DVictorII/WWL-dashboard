import React from "react";
import { BiLogOut } from "react-icons/bi";
import UserIDCard from "./UserIDCard";
import popup from "../assets/accountPopUp.svg";
import { Link, useNavigate } from "react-router-dom";
import { useLogOutStore } from "../store/ConfirmationModalStore";

interface AccountPopUpProps {
  isOpen: boolean;
  closeAccountPopUp: () => void;
}

function AccountPopUp({ isOpen, closeAccountPopUp }: AccountPopUpProps) {
  const openLogOutModal = useLogOutStore((state) => state.openLogOutModal);

  return isOpen ? (
    <div
      className="absolute -bottom-4 left-10 z-50"
      onClick={(e) => {
        e.stopPropagation();
        closeAccountPopUp();
      }}
    >
      <div className="w-80 h-56">
        <img src={popup} className="w-full h-full" />
      </div>

      <div className="absolute top-8 left-[4.5rem]">
        <UserIDCard />

        <div className="mt-8 pl-12 font-semibold text-lg flex gap-x-3 items-center">
          <BiLogOut className="w-6 h-6" />

          <span onClick={openLogOutModal}>Log Out</span>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export default AccountPopUp;
