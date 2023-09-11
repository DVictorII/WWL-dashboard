import {
  AiOutlineAreaChart,
  AiOutlineBarChart,
  AiOutlineClose,
  AiOutlineCloseCircle,
  AiOutlineLogout,
  AiOutlinePieChart,
  AiOutlineSetting,
  AiOutlineUsergroupAdd,
} from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useMobileMenuStore } from "../../store/MobileMenuStore";
import UserIDCard from "../UserIDCard";
import DesktopLink from "../DesktopLink";
import DesktopSubLink from "../DesktopSubLink";
import { useGloblalUserStore } from "../../store/GlobalUserStore";
import { FaTools } from "react-icons/fa";
import { useConfirmationModalStore } from "../../store/ConfirmationModalStore";
import { useState } from "react";
import { BsArrowLeft, BsCalendarMonth } from "react-icons/bs";
import { TfiMapAlt } from "react-icons/tfi";
import { FiAlertTriangle } from "react-icons/fi";
import { s3StaticFilesLinks } from "../../utils/globalLinks";

function MobileMenu() {
  const navigate = useNavigate();
  const mobileMenuIsOpen = useMobileMenuStore(
    (state) => state.mobileMenuIsOpen
  );
  const closeMobileMenu = useMobileMenuStore((state) => state.closeMobileMenu);
  const currentUser = useGloblalUserStore((state) => state.currentUser);

  const [detailedMenu, setDetailedMenu] = useState("none");

  const openLogOutModal = useConfirmationModalStore(
    (state) => state.openLogOutModal
  );

  const location = useLocation();

  const currentPage = location.pathname;

  const navigateTo = (destiny: string) => {
    closeMobileMenu();
    navigate(destiny);
  };

  return (
    <AnimatePresence mode="wait">
      {mobileMenuIsOpen ? (
        <motion.div
          initial={{ x: "100%" }}
          animate={{
            x: "0%",
            transition: { duration: 0.7, ease: "easeInOut" },
          }}
          exit={{ x: "100%", transition: { duration: 0.7, ease: "easeInOut" } }}
          key="mobile-menu"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(12, 16, 24,0.95), rgba(12, 16, 24,0.95)) , url('${s3StaticFilesLinks.baseURL}/${s3StaticFilesLinks.layoutImages}/Rossing_mine.jpg') `,
          }}
          className=" md:hidden fixed top-0 left-0 z-[100] bg-cover bg-center h-screen w-screen  text-white py-8  px-4 sm:px-8 overflow-scroll "
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
            className="flex justify-between items-center"
          >
            <div className="w-24  relative ">
              <img
                src={`${s3StaticFilesLinks.baseURL}/${s3StaticFilesLinks.layoutImages}/logo_white.png`}
                className="w-full  object-contain"
              />
            </div>

            <div onClick={closeMobileMenu}>
              <AiOutlineCloseCircle className="text-2xl" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
            className="mt-10 flex flex-col gap-y-10"
          >
            <div className="flex items-center gap-x-4">
              {currentUser ? (
                <>
                  <div className="w-10 h-10 overflow-hidden rounded-full">
                    <img
                      src={`${s3StaticFilesLinks.baseURL}/${
                        s3StaticFilesLinks.userProfilePictures
                      }/${currentUser.picture || "undraw_profile_1.svg"}`}
                      alt={`${currentUser.name} profile picture`}
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="flex flex-col gap-y-1">
                    <span className="font-semibold text-lg">
                      {currentUser.name}
                    </span>
                    <span className="text-xs text-[#999]">
                      ({currentUser.username})
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 overflow-hidden rounded-full">
                    <img
                      src={`${s3StaticFilesLinks.baseURL}/${s3StaticFilesLinks.userProfilePictures}/undraw_profile_1.svg`}
                      alt="user photo"
                      className="object-cover w-full h-full"
                    />
                  </div>

                  <div className="flex flex-col gap-y-1">
                    <span className="font-semibold text-lg">Guest user</span>
                    <span className="text-xs text-[#999]">
                      (guest_user1809)
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="bg-[#333] bg-opacity-30 backdrop-blur-md rounded-lg py-4 sm:py-8 flex justify-center">
              <AnimatePresence mode="wait">
                {detailedMenu === "none" ? (
                  <motion.div
                    key="options-none"
                    className="w-full flex flex-col px-4  relative items-center"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,

                        transition: {
                          duration: 0.5,

                          ease: "easeInOut",
                        },
                      }}
                      exit={{
                        opacity: 0,
                        transition: {
                          duration: 0.5,

                          ease: "easeInOut",
                        },
                      }}
                      className="flex flex-col  gap-y-8 sm:gap-y-12  "
                    >
                      <div
                        onClick={() => setDetailedMenu("operations")}
                        className="flex items-center gap-x-4"
                      >
                        <div
                          // onClick={!menuIsOpen ? openMenu : closeMenu}
                          className="w-8 h-8  lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 bg-gradient-to-br to-[#7ea3b8] from-[#477c9a] border-[#477c9a]  border-2  flex items-center justify-center  bg-opacity-40 rounded-lg hover:text-[#222] hover:bg-opacity-90 transition-all cursor-pointer duration-500 relative group"
                        >
                          <AiOutlineAreaChart className=" w-4 h-4 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6" />
                        </div>

                        <span className="text-sm font-semibold text-[#f1f1f1]">
                          Operations (100%)
                        </span>
                      </div>

                      <div
                        onClick={() => navigateTo("/business/stocks-tracking")}
                        className="flex items-center gap-x-4"
                      >
                        <div className="w-8 h-8  lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 bg-gradient-to-br to-[#7ea3b8] from-[#477c9a] border-2 border-[#477c9a] flex items-center justify-center  bg-opacity-40 rounded-lg hover:text-[#222] hover:bg-opacity-90 transition-all cursor-pointer duration-500 relative group">
                          <AiOutlinePieChart className=" w-4 h-4 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6" />
                        </div>

                        <span className="text-sm font-semibold text-[#f1f1f1]">
                          Business (100%)
                        </span>
                      </div>

                      <div className="flex items-center gap-x-4">
                        <div className="bg-gradient-to-br to-[#d27474] from-[#bc2f2f]  border-2 border-[#bc2f2f]   w-8 h-8  lg:w-10 lg:h-10 2xl:w-12 2xl:h-12    flex items-center justify-center  bg-opacity-10 rounded-lg hover:text-[#222]  transition-all cursor-pointer duration-500 relative group">
                          <FaTools className=" w-3 h-3 lg:w-4 lg:h-4 2xl:w-5 2xl:h-5" />
                        </div>
                        <span className="text-sm font-semibold text-[#666]">
                          Logistics and machinery ( 70% )
                        </span>
                      </div>

                      <div
                        onClick={() =>
                          navigateTo("/staff-training/team-information")
                        }
                        className="flex items-center gap-x-4"
                      >
                        <div
                          onClick={closeMobileMenu}
                          className="bg-gradient-to-br to-[#658293] from-[#9c3838] p-[2px] rounded-lg"
                        >
                          <div className="w-8 h-8  lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 bg-gradient-to-br to-[#7ea3b8] from-[#c34646]  flex items-center justify-center  bg-opacity-40 rounded-lg hover:text-[#222] hover:bg-opacity-90 transition-all cursor-pointer duration-500 relative group">
                            <AiOutlineUsergroupAdd className=" w-4 h-4 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6 " />
                          </div>
                        </div>
                        <span className="text-sm font-semibold text-[#f1f1f1]">
                          Staff Training ( 80% )
                        </span>
                      </div>

                      <div
                        className="flex items-center gap-x-4"
                        onClick={() => {
                          closeMobileMenu();
                          openLogOutModal();
                        }}
                      >
                        <div className="w-8 h-8  lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 border-2 border-white border-opacity-50 flex items-center justify-center bg-white bg-opacity-10 rounded-lg 2xl:mt-6   hover:text-[#222] hover:bg-opacity-100 transition-all cursor-pointer duration-500 relative group">
                          <AiOutlineLogout className=" w-4 h-4 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6" />
                        </div>
                        <span className="text-sm font-semibold text-[#f1f1f1]">
                          Log out
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="options-operations"
                    className="w-full flex flex-col px-4 gap-y-8"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,

                        transition: {
                          duration: 0.5,

                          ease: "easeInOut",
                        },
                      }}
                      exit={{
                        opacity: 0,
                        transition: {
                          duration: 0.5,

                          ease: "easeInOut",
                        },
                      }}
                    >
                      <div
                        onClick={() => setDetailedMenu("none")}
                        className="flex items-center gap-x-2 text-[#999]"
                      >
                        <BsArrowLeft className="w-3 h-3 " />
                        <span className="text-sm font-semibold">
                          Operations
                        </span>
                      </div>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,

                        transition: {
                          duration: 0.5,

                          ease: "easeInOut",
                        },
                      }}
                      exit={{
                        opacity: 0,
                        transition: {
                          duration: 0.5,

                          ease: "easeInOut",
                        },
                      }}
                      className="flex flex-col  gap-y-8 self-center sm:grid sm:grid-cols-2 sm:gap-x-16 sm:gap-y-12"
                    >
                      <div
                        className="flex items-center gap-x-4"
                        onClick={() => navigateTo("/operations/monitoring-map")}
                      >
                        <div className="w-8 h-8  lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 border-2 border-white border-opacity-50 flex items-center justify-center bg-white bg-opacity-10 rounded-lg 2xl:mt-6   hover:text-[#222] hover:bg-opacity-100 transition-all cursor-pointer duration-500 relative group">
                          <TfiMapAlt className=" w-4 h-4 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6" />
                        </div>
                        <span className="text-sm font-semibold text-[#f1f1f1]">
                          Monitoring map
                        </span>
                      </div>

                      <div
                        className="flex items-center gap-x-4"
                        onClick={() =>
                          navigateTo("/operations/piezometer-readings")
                        }
                      >
                        <div className="w-8 h-8  lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 border-2 border-white border-opacity-50 flex items-center justify-center bg-white bg-opacity-10 rounded-lg 2xl:mt-6   hover:text-[#222] hover:bg-opacity-100 transition-all cursor-pointer duration-500 relative group">
                          <AiOutlineBarChart className=" w-4 h-4 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6" />
                        </div>
                        <span className="text-sm font-semibold text-[#f1f1f1]">
                          Piezometer Readings
                        </span>
                      </div>

                      <div
                        className="flex items-center gap-x-4"
                        onClick={() =>
                          navigateTo("/operations/reports/piezometers")
                        }
                      >
                        <div className="w-8 h-8  lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 border-2 border-white border-opacity-50 flex items-center justify-center bg-white bg-opacity-10 rounded-lg 2xl:mt-6   hover:text-[#222] hover:bg-opacity-100 transition-all cursor-pointer duration-500 relative group">
                          <AiOutlineSetting className=" w-4 h-4 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6" />
                        </div>
                        <span className="text-sm font-semibold text-[#f1f1f1]">
                          Piezometer Reports
                        </span>
                      </div>

                      <div
                        className="flex items-center gap-x-4"
                        onClick={() =>
                          navigateTo("/operations/reports/incidents")
                        }
                      >
                        <div className="w-8 h-8  lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 border-2 border-white border-opacity-50 flex items-center justify-center bg-white bg-opacity-10 rounded-lg 2xl:mt-6   hover:text-[#222] hover:bg-opacity-100 transition-all cursor-pointer duration-500 relative group">
                          <FiAlertTriangle className=" w-4 h-4 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6" />
                        </div>
                        <span className="text-sm font-semibold text-[#f1f1f1]">
                          Incident Reports
                        </span>
                      </div>

                      <div
                        className="flex items-center gap-x-4"
                        onClick={() =>
                          navigateTo("/operations/biannual-visits/1")
                        }
                      >
                        <div className="w-8 h-8  lg:w-10 lg:h-10 2xl:w-12 2xl:h-12 border-2 border-white border-opacity-50 flex items-center justify-center bg-white bg-opacity-10 rounded-lg 2xl:mt-6   hover:text-[#222] hover:bg-opacity-100 transition-all cursor-pointer duration-500 relative group">
                          <BsCalendarMonth className=" w-4 h-4 lg:w-5 lg:h-5 2xl:w-6 2xl:h-6" />
                        </div>
                        <span className="text-sm font-semibold text-[#f1f1f1]">
                          Biannual visits
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default MobileMenu;
