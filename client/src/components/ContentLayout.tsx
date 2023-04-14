import React from "react";

// @ts-ignore: Unreachable code error
import { boxShadow } from "../utils/shadow";
import DesktopSidebar from "./DesktopSidebar";
import FooterLines from "./FooterLines";

import MobileMenu from "./MobileMenu";
import TabletSidebar from "./TabletSidebar";

import { Router, useLocation } from "react-router-dom";
import { useLogOutStore } from "../store/LogOutStore";
import LogOutConfirmationModal from "./LogOutConfirmationModal";
import { useSectionImgStore } from "../store/sectionImgStore";

function ContentLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  const logOutModalIsOpen = useLogOutStore((state) => state.logOutModalIsOpen);
  
  const sectionImgIsOpen = useSectionImgStore(s=>s.sectionImgIsOpen)
  const imgURL = useSectionImgStore(s=>s.imgURL)
  const closeSectionImg = useSectionImgStore(s=>s.closeSectionImg)

  return location.pathname === "/login" ? (
    <>{children}</>
  ) : (
    <div className=" font-openSans  relative text-[#222] bg-[#f5f5f5] md:px-16 md:py-8 2xl:px-24 2xl:py-16">
      <div
        className="  min-h-screen grid grid-cols-1 lg:grid-cols-4 2xl:grid-cols-7 lg:gap-x-8 relative p-6 pb-20 md:pb-20 2xl:pb-28 2xl:pt-12 2xl:pr-8 2xl:pl-8 md:px-16 lg:pr-10 lg:pl-4 md:py-8 bg-white md:rounded-[18px] overflow-hidden "
        style={{
          boxShadow: boxShadow,
        }}
      >
        <MobileMenu />

        <TabletSidebar />
        <DesktopSidebar />
        <div className=" col-span-3 2xl:col-span-5 2xl:px-12 3xl:px-20">
          {children}
        </div>

        <FooterLines />
      </div>

      {logOutModalIsOpen ? <LogOutConfirmationModal /> : null}
      {
        sectionImgIsOpen ? (<div className="fixed top-0 left-0 h-screen w-screen z-[100] flex items-center justify-center">
        <div onClick={closeSectionImg} className="absolute top-0 left-0 w-full h-full bg-[#222222] bg-opacity-50 blur-md  "/>
        <div className="w-[800px] sm:w-full lg:w-4/5 rounded-[14px] overflow-hidden shadow-sm shadow-sky-900 relative rotate-90 lg:rotate-0">
          <img className=" w-full "  src={imgURL} />
        </div>
          </div>)
    :null  
      }
    </div>
  );
}

export default ContentLayout;
