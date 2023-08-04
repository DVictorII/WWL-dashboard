import React, { useEffect } from "react";
import {
  AiOutlineSetting,
  AiOutlineDown,
  AiOutlineBarChart,
  AiOutlinePieChart,
  AiOutlineAreaChart,
  AiOutlineUsergroupAdd,
  AiOutlineBell,
  AiOutlineUser,
  AiOutlineLogout,
} from "react-icons/ai";
import { BsArrowLeft, BsCalendarMonth } from "react-icons/bs";
import { TfiMapAlt } from "react-icons/tfi";
import { TbReportAnalytics } from "react-icons/tb";
import { FiAlertTriangle } from "react-icons/fi";
import { FaTools } from "react-icons/fa";

import { AnimatePresence, motion } from "framer-motion";
import { useMenuStore } from "../../store/DesktopSidebarStore";
import { Link, useNavigate } from "react-router-dom";
import { useConfirmationModalStore } from "../../store/ConfirmationModalStore";
import { useGloblalUserStore } from "../../store/GlobalUserStore";
import { BiLogOut } from "react-icons/bi";

function Sidebar() {
  const menuIsOpen = useMenuStore((state) => state.menuIsOpen);
  const closeMenu = useMenuStore((state) => state.closeMenu);
  const openMenu = useMenuStore((state) => state.openMenu);

  const navigate = useNavigate();

  const openLogOutModal = useConfirmationModalStore(
    (state) => state.openLogOutModal
  );

  const currentUser = useGloblalUserStore((state) => state.currentUser);

  const navigateTo = (destiny: string) => {
    closeMenu();
    navigate(destiny);
  };

  return (
    <>
      <div
        className="sticky top-0 left-0 h-screen pt-8 pb-12 
                        w-20 lg:w-24  2xl:w-28  md:flex flex-col 
                        bg-all-normal text-white justify-between  z-[400] hidden shrink-0 "
      >
        <div className="flex flex-col items-center gap-y-6 2xl:gap-y-10 ">
          <Link to="/operations/monitoring-map">
            <div className="w-full relative h-20">
              <img
                className="object-contain w-full"
                src="/media/img/photos/logo_white.png"
                alt="rossing-logo"
              />
            </div>
          </Link>

          <div
            onClick={!menuIsOpen ? openMenu : closeMenu}
            className="w-8 h-8  lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 bg-gradient-to-br to-[#7ea3b8] from-[#477c9a] border-[#477c9a]  border-2  flex items-center justify-center  bg-opacity-40 rounded-lg hover:text-[#222] hover:bg-opacity-90 transition-all cursor-pointer duration-500 relative group"
          >
            <AiOutlineAreaChart className=" w-4 h-4 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6" />
            <span className="absolute w-auto px-4 py-2 m-2 min-w-max left-14 rounded-md shadow-md text-white bg-[#222] border-2 border-gray-500  font-bold transition-all duration-300  origin-left scale-0 group-hover:scale-100">
              Operations ( 100% )
            </span>
          </div>

          <Link to="/business/stocks-tracking">
            <div
              onClick={closeMenu}
              className="w-8 h-8  lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 bg-gradient-to-br to-[#7ea3b8] from-[#477c9a] border-2 border-[#477c9a] flex items-center justify-center  bg-opacity-40 rounded-lg hover:text-[#222] hover:bg-opacity-90 transition-all cursor-pointer duration-500 relative group"
            >
              <AiOutlinePieChart className=" w-4 h-4 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6" />
              <span className="absolute w-auto px-4 py-2 m-2 min-w-max left-14 rounded-md shadow-md text-white bg-[#222] border-2 border-gray-500  font-bold transition-all duration-300  origin-left scale-0 group-hover:scale-100">
                Business ( 100% )
              </span>
            </div>
          </Link>

          <div className="bg-gradient-to-br to-[#d27474] from-[#bc2f2f]  border-2 border-[#bc2f2f]   w-8 h-8  lg:w-10 lg:h-10 2xl:w-12 2xl:h-12    flex items-center justify-center  bg-opacity-10 rounded-lg hover:text-[#222]  transition-all cursor-pointer duration-500 relative group">
            <FaTools className=" w-3 h-3 lg:w-4 lg:h-4 2xl:w-5 2xl:h-5" />
            <span className="absolute  w-auto px-4 py-2 m-2 min-w-max left-14 rounded-md shadow-md text-white bg-[#222] border-2 border-gray-500  font-bold transition-all duration-300  origin-left scale-0 group-hover:scale-100">
              Logistics and machinery (under construction) ( 70% )
            </span>
          </div>

          <Link to="/staff-training/team-information">
            <div
              onClick={closeMenu}
              className="bg-gradient-to-br to-[#658293] from-[#9c3838] p-[2px] rounded-lg"
            >
              <div className="w-8 h-8  lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 bg-gradient-to-br to-[#7ea3b8] from-[#c34646]  flex items-center justify-center  bg-opacity-40 rounded-lg hover:text-[#222] hover:bg-opacity-90 transition-all cursor-pointer duration-500 relative group">
                <AiOutlineUsergroupAdd className=" w-4 h-4 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6 " />
                <span className="absolute w-auto px-4 py-2 m-2 min-w-max left-14 rounded-md shadow-md text-white bg-[#222] border-2 border-gray-500  font-bold transition-all duration-300  origin-left scale-0 group-hover:scale-100">
                  Staff Training (under construction) ( 80% )
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="flex flex-col items-center gap-y-6 2xl:gap-y-10 ">
          <div className="w-8 h-8  lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 border-2 border-white border-opacity-50 flex items-center justify-center bg-white bg-opacity-40 rounded-lg relative hover:text-[#222] hover:bg-opacity-90 transition-all cursor-pointer duration-500  group">
            <AiOutlineBell className=" w-4 h-4 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6" />
            <div className="absolute -top-1 lg:-top-2 -right-1 lg:-right-2 w-3 h-3  lg:w-4 lg:h-4 rounded-full bg-orange-500" />
            <span className="absolute w-auto px-4 py-2 m-2 min-w-max left-14 rounded-md shadow-md text-white bg-[#222] border-2 border-gray-500  font-bold transition-all duration-300  origin-left scale-0 group-hover:scale-100">
              Alerts (under construction)
            </span>
          </div>

          <div className="w-8 h-8  lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 border-2 border-white border-opacity-50 flex items-center justify-center bg-white bg-opacity-40 rounded-lg hover:text-[#222] hover:bg-opacity-90 transition-all cursor-pointer duration-500 relative group">
            <AiOutlineAreaChart className=" w-4 h-4 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6" />
            <span className="absolute w-auto px-4 py-2 m-2 min-w-max left-14 rounded-md shadow-md text-white bg-[#222] border-2 border-gray-500  font-bold transition-all duration-300  origin-left scale-0 group-hover:scale-100">
              Operations (under construction)
            </span>
          </div>

          <div className="w-8 h-8  lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 bg-white  flex items-center justify-center border-2 border-white rounded-full text-[#222] hover:text-white hover:bg-white hover:bg-opacity-10  transition-all cursor-pointer duration-500 relative group">
            <AiOutlineUser className=" w-4 h-4 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6 " />

            <div className="absolute w-72 px-4 py-2 m-2 min-w-max left-14 rounded-md shadow-md text-[#333] bg-white border-2 border-gray-500  font-bold transition-all duration-300  origin-left scale-0 group-hover:scale-100">
              {currentUser ? (
                <>
                  <div className="w-full h-20">
                    <img
                      src={`/media/img/photos/${
                        currentUser.picture || "undraw_profile_1.svg"
                      }`}
                      alt={`${currentUser.name} profile picture`}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="p-2 flex flex-col gap-y-12">
                    <div className="flex flex-col gap-y-1">
                      <span className="font-semibold text-lg">
                        {currentUser.name}
                      </span>
                      <span className="text-xs text-[#666]">
                        ({currentUser.username})
                      </span>
                    </div>

                    <div
                      onClick={() => {
                        closeMenu();
                        openLogOutModal();
                      }}
                      className="flex items-center gap-x-2 hover:text-orange-800 transition-all"
                    >
                      <BiLogOut />
                      <span className="text-sm ">Log out</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full h-20">
                    <img
                      src={`/media/img/photos/undraw_profile_1.svg`}
                      alt="user photo"
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="p-2 flex flex-col gap-y-12">
                    <div className="flex flex-col gap-y-1">
                      <span className="font-semibold text-lg">Guest user</span>
                      <span className="text-xs text-[#666]">
                        (guest_user1809)
                      </span>
                    </div>

                    <div
                      onClick={() => {
                        closeMenu();
                        openLogOutModal();
                      }}
                      className="flex items-center gap-x-2 hover:text-orange-800 transition-all"
                    >
                      <BiLogOut />
                      <span className="text-sm ">Log out</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div
            onClick={() => {
              closeMenu();
              openLogOutModal();
            }}
            className="w-8 h-8  lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 border-2 border-white border-opacity-50 flex items-center justify-center bg-white bg-opacity-10 rounded-lg 2xl:mt-6   hover:text-[#222] hover:bg-opacity-100 transition-all cursor-pointer duration-500 relative group"
          >
            <AiOutlineLogout className=" w-4 h-4 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6" />

            <span className="absolute w-auto px-4 py-2 m-2 min-w-max left-14 rounded-md shadow-md text-white bg-[#222] border-2 border-gray-500  font-bold transition-all duration-300  origin-left scale-0 group-hover:scale-100">
              Log out
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence key={"menu"}>
        {menuIsOpen ? (
          <>
            <div className="fixed z-[300] md:ml-20 lg:ml-24 2xl:ml-28 h-screen w-1/2 lg:w-1/3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%", transition: { duration: 0.5 } }}
                exit={{
                  width: 0,
                  padding: 0,
                  transition: { duration: 0.5, delay: 0.3 },
                }}
                className="bg-cover  h-full   p-10 text-white flex flex-col gap-y-24"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, rgba(12, 16, 24,0.95), rgba(12, 16, 24,0.95)) ,url('/media/img/photos/Rossing_mine.jpg') ",
                }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.3, delay: 0.2 },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                  className="flex gap-x-6 items-center text-gray-300 relative whitespace-nowrap"
                >
                  <BsArrowLeft
                    onClick={closeMenu}
                    className="cursor-pointer shrink-0"
                  />
                  <span className="text-sm">Operations</span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.3, delay: 0.2 },
                  }}
                  exit={{ opacity: 0, transition: { duration: 0.3 } }}
                  className="flex flex-col gap-y-12"
                >
                  <div
                    onClick={() => navigateTo("/operations/monitoring-map")}
                    className=" whitespace-nowrap flex items-center gap-x-4 relative py-2 group cursor-pointer hover:text-orange-500 transition-all"
                  >
                    <TfiMapAlt className="w-6 h-6 lg:w-7 lg:h-7 shrink-0" />
                    <span className="lg:text-lg">Monitoring map</span>
                    <div className="w-2 h-full bg-transparent group-hover:bg-orange-500 transition-all absolute top-0 -right-10 rounded-l-xl " />
                  </div>

                  <div
                    onClick={() =>
                      navigateTo("/operations/piezometer-readings")
                    }
                    className="whitespace-nowrap flex items-center gap-x-4 relative py-2 group cursor-pointer hover:text-orange-500 transition-all"
                  >
                    <AiOutlineBarChart className="w-6 h-6 lg:w-7 lg:h-7 shrink-0" />
                    <span className="lg:text-lg">Piezometer Readings</span>
                    <div className="w-2 h-full bg-transparent group-hover:bg-orange-500 transition-all absolute top-0 -right-10 rounded-l-xl " />
                  </div>

                  <div className="whitespace-nowrap flex items-center gap-x-4 relative py-2 group cursor-pointer hover:text-orange-500 transition-all">
                    <TbReportAnalytics className="w-6 h-6 lg:w-7 lg:h-7 shrink-0" />
                    <span className="lg:text-lg">Reports</span>
                    <AiOutlineDown className="w-3 h-3 lg:w-4 lg:h-4 shrink-0" />
                  </div>

                  <div className="flex flex-col gap-y-8 ml-12">
                    <div
                      onClick={() =>
                        navigateTo("/operations/reports/piezometers")
                      }
                      className="whitespace-nowrap flex items-center gap-x-4 relative py-2 group cursor-pointer hover:text-orange-500 transition-all"
                    >
                      <AiOutlineSetting className="w-4 h-4 lg:w-5 lg:h-5 shrink-0" />
                      <span className="text-sm ">Piezometers</span>
                      <div className="w-2 h-full bg-transparent group-hover:bg-orange-500 transition-all absolute top-0 -right-10 rounded-l-xl " />
                    </div>

                    <div
                      onClick={() =>
                        navigateTo("/operations/reports/incidents")
                      }
                      className="whitespace-nowrap flex items-center gap-x-4 relative py-2 group cursor-pointer hover:text-orange-500 transition-all"
                    >
                      <FiAlertTriangle className="w-4 h-4 lg:w-5 lg:h-5 shrink-0" />
                      <span className="text-sm ">Incidents</span>
                      <div className="w-2 h-full bg-transparent group-hover:bg-orange-500 transition-all absolute top-0 -right-10 rounded-l-xl " />
                    </div>
                  </div>

                  <div
                    onClick={() => navigateTo("/operations/biannual-visits/1")}
                    className="whitespace-nowrap flex items-center gap-x-4 relative py-2 group cursor-pointer hover:text-orange-500 transition-all"
                  >
                    <BsCalendarMonth className="w-6 h-6 shrink-0" />
                    <span className="lg:text-lg">Biannual visits</span>
                    <div className="w-2 h-full bg-transparent group-hover:bg-orange-500 transition-all absolute top-0 -right-10 rounded-l-xl " />
                  </div>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              onClick={closeMenu}
              exit={{ opacity: 0 }}
              className="cursor-pointer fixed top-0 left-0 bg-all-dark w-screen h-screen bg-opacity-50 backdrop-blur-sm z-[200]"
            />
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Sidebar;
