import React, { useEffect, useState } from "react";

import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";

import { motion } from "framer-motion";
import rossingPhoto from "../../assets/Rossing.jpg";
import logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
//@ts-ignore: Unreachable code error
import axios from "../../utils/axios";
import toast, { Toaster } from "react-hot-toast";

import {useAuth0} from "@auth0/auth0-react"

function Login() {
  const {loginWithRedirect, logout} = useAuth0()
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      key="login-page"
      className="h-screen font-nunito text-textBlue grid grid-cols-1 md:grid-cols-2 "
    >
      <div className="w-full h-full relative hidden md:inline">
        <div className="bg-black absolute w-full h-full top-0 left-0 right-0 z-[20] bg-opacity-20" />
        <img src={rossingPhoto} className="object-cover w-full h-full " />
      </div>
      <div className="flex flex-col justify-center h-full relative">
        <main className="flex flex-col py-8 px-8 sm:px-12 lg:px-20 items-center gap-y-8 self-center w-full sm:w-3/4 md:w-full">
          <div className="w-44 2xl:w-52 relative">
            <img src={logo} className="w-full object-contain" />
          </div>
          <h1 className="font-semibold text-xl lg:text-2xl 2xl:text-3xl">
            Remote Sensing App
          </h1>

          {/* <form
            className="w-full 3xl:w-4/5 flex flex-col gap-y-8 mt-4"
          >
            <fieldset className="relative">
              <HiOutlineMail className="absolute left-4 top-[18px] w-6 h-6 2xl:w-8 2xl:h-8 text-bluePrimary " />
              <input
                type="text"
                className="font-semibold pl-14 2xl:pl-[4.5rem] 2xl:text-xl pr-4 py-3 2xl:py-5 w-full border-2 border-[#cedae7]  focus:border-bluePrimary  rounded-[20px]   text-textBlue  focus:outline-none"
                placeholder="Username"
                value={credentials.username}
                name="username"
                required
                onChange={handleChange}
                
              />
            </fieldset>

            <fieldset className="relative">
              <RiLockPasswordLine className="absolute left-4 top-[18px] w-6 h-6 2xl:w-8 2xl:h-8 text-bluePrimary " />
              <input
                type="password"
                className="font-semibold pl-14 2xl:pl-[4.5rem] 2xl:text-xl pr-4 py-3 2xl:py-5 w-full border-2 border-[#cedae7]  focus:border-bluePrimary  rounded-[20px]   text-textBlue  focus:outline-none"
                placeholder="Password"
                value={credentials.password}
                name="password"
                required
                onChange={handleChange}
                
              />
            </fieldset>

            <button className="w-full py-3 rounded-[20px] bg-[#333] text-white text-xl 2xl:text-2xl 2xl:py-5 font-semibold">
              Log in
            </button>
          </form> */}

          <button onClick={()=>loginWithRedirect()} className="w-full py-3 rounded-[20px] bg-[#333] text-white text-xl 2xl:text-2xl 2xl:py-5 font-semibold">
            Log in  
          </button>

          <button onClick={()=>logout()} className="w-full py-3 rounded-[20px] bg-[#333] text-white text-xl 2xl:text-2xl 2xl:py-5 font-semibold">
            Log out  
          </button>
        </main>
      </div>
      <Toaster position="top-right" />
    </motion.div>
  );
}

export default Login;
