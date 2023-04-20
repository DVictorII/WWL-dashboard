import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useLogOutStore } from '../../store/LogOutStore';
import { useSectionImgStore } from '../../store/sectionImgStore';
import Sidebar from '../NavBars/Sidebar';
import {motion} from "framer-motion"
import LogOutConfirmationModal from '../LogOutConfirmationModal';
import MobileMenu from '../MobileMenu';
import { Toaster } from 'react-hot-toast';

function PageLayout() {
  const location = useLocation();

  const logOutModalIsOpen = useLogOutStore((state) => state.logOutModalIsOpen);
  
  const sectionImgIsOpen = useSectionImgStore(s=>s.sectionImgIsOpen)
  const imgURL = useSectionImgStore(s=>s.imgURL)
  const closeSectionImg = useSectionImgStore(s=>s.closeSectionImg)


  return location.pathname === "/login" ? (
    <div>
      <Outlet/>
    </div>
  ) : (
    <main className="flex font-openSans">

      <Sidebar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        key={location.pathname}
        className="md:ml-20 lg:ml-24 2xl:ml-28 px-4 py-12 md:px-8  lg:p-12  2xl:p-16 w-full "
        
      >
        <MobileMenu />
        
        <Outlet/>
        
      </motion.div>

      {logOutModalIsOpen ? <LogOutConfirmationModal /> : null}
      
      <Toaster position="top-right" />
    </main>)
}

export default PageLayout