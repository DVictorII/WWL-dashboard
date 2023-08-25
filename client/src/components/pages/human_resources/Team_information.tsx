import React from "react";
import MenuNavbar from "../../MenuNavbar";
import HRHeadcountSummary from "../../human_resources/HRHeadcountSummary";
import HRHiresSummary from "../../human_resources/HRHiresSummary";
import HRLeavesSummary from "../../human_resources/HRLeavesSummary";
import MembersInformationTable from "../../human_resources/MembersInformationTable";
import { AiOutlinePhone } from "react-icons/ai";
import { GoMail } from "react-icons/go";
import { s3StaticFilesLinks } from "../../../utils/globalLinks";

const colores = ["#164A41", "#4D774E", "#9DC88D", "#F1B24A", "#FFFFFF"];

function Team_information() {
  return (
    <>
      <MenuNavbar />

      <div className="mt-12 md:hidden" />

      <div className="flex items-center  bg-white  p-4 2xl:px-6 rounded-xl shadow-md shadow-[rgba(22,74,65,0.1)]  lg:mx-4 mt-4 ">
        <h1 className="font-bold xl:text-lg ">
          <span className="text-[#b69000]">Staff Training</span> - Team
          Information
        </h1>
      </div>

      <div className="mt-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-6  gap-y-6 lg:mx-4">
        <div className="flex md:col-span-2 2xl:col-span-1   bg-white  p-4 2xl:px-6 rounded-xl shadow-md shadow-[rgba(22,74,65,0.1)]   ">
          <HRHeadcountSummary />
        </div>

        <div className="flex   bg-white  p-4 2xl:px-6 rounded-xl shadow-md shadow-[rgba(22,74,65,0.1)]   ">
          <HRHiresSummary />
        </div>

        <div className="flex   bg-white  p-4 2xl:px-6 rounded-xl shadow-md shadow-[rgba(22,74,65,0.1)]   ">
          <HRLeavesSummary />
        </div>
      </div>

      <div className="mt-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-x-6  gap-y-6 lg:mx-4">
        <div className="   bg-white  p-4 2xl:px-6 rounded-xl shadow-md shadow-[rgba(22,74,65,0.1)]   ">
          <div className="flex flex-col gap-y-6">
            <h2 className="font-semibold text-[#555]">Team Manager</h2>

            <div className="flex flex-col gap-y-12">
              <div className="flex items-center gap-x-4">
                <div className="w-28 h-28">
                  <img
                    src={`${s3StaticFilesLinks.baseURL}/${s3StaticFilesLinks.userProfilePictures}/undraw_profile_3.svg`}
                    alt="Team manager image"
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <span className="font-bold text-xl">Cynthia Pogisho</span>
                  <span className="font-semibold text-[#777] text-sm">
                    Team Leader
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-y-6">
                <div className="flex items-center gap-x-3 flex-wrap gap-y-2">
                  <AiOutlinePhone className="w-5 h-5 text-[#777]" />
                  <span className="text-sm font-semibold text-[#777]">
                    Phone number:{" "}
                  </span>
                  <span className="text-sm font-semibold">
                    +61 923 892 812{" "}
                  </span>
                </div>

                <div className="flex items-center gap-x-3 flex-wrap gap-y-2">
                  <GoMail className="w-5 h-5 text-[#777]" />
                  <span className="text-sm font-semibold text-[#777]">
                    Email address:{" "}
                  </span>
                  <span className="text-sm font-semibold">
                    cPogishio@wwlenginnering.com{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-rows-2 gap-y-4">
          <div className=" bg-white  p-4 2xl:px-6 rounded-xl shadow-md shadow-[rgba(22,74,65,0.1)]   ">
            <div className="flex justify-center items-center w-full h-full">
              <div className="flex flex-col gap-y-4 items-center">
                <span className="font-semibold sm:text-lg 2xl:text-xl">
                  Active people in job
                </span>
                <span className="font-bold text-3xl">22</span>
              </div>
            </div>
          </div>

          <div className=" bg-white  p-4 2xl:px-6 rounded-xl shadow-md shadow-[rgba(22,74,65,0.1)]   ">
            <div className="flex justify-center items-center w-full h-full">
              <div className="flex flex-col gap-y-4 items-center">
                <span className="font-semibold sm:text-lg 2xl:text-xl">
                  Total team members
                </span>
                <span className="font-bold text-3xl">25</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 2xl:col-span-2   bg-white  p-4 2xl:px-6 rounded-xl shadow-md shadow-[rgba(22,74,65,0.1)]   ">
          <div className="flex flex-col gap-y-6">
            <h2 className="font-semibold text-[#555]">
              Team members information
            </h2>

            <div className="grid grid-cols-1">
              <MembersInformationTable />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6" />
      <span className="text-sm  font-semibold text-[#777] lg:mx-4 lg:mb-4">
        *: Compared to the last year
      </span>
    </>
  );
}

export default Team_information;
