import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useConfirmationModalStore } from "../../store/ConfirmationModalStore";

import Sidebar from "../NavBars/Sidebar";
import { motion } from "framer-motion";
import LogOutConfirmationModal from "../LogOutConfirmationModal";

import { Toaster } from "react-hot-toast";
import ProtectedRoute from "../ProtectedRoute";
import ProtectedLogIn from "../ProtectedLogIn";
import { useMonitoringMapStateStore } from "../../store/MonitoringMapStateStore";
import { useQuery } from "react-query";
import { fetchLastReadings, fetchPiezometersData } from "../../utils/map";
import { usePiezometerLecturesStateStore } from "../../store/PiezometerLecturesStateStore";
import PiezoReportDeleteConfirmationModal from "../Reports/PiezoReportDeleteConfirmationModal";
import IncidentReportDeleteConfirmationModal from "../Incidents/IncidentReportDeleteConfirmationModal";
import MobileMenu from "../NavBars/MobileMenu";
import { clearInterval } from "timers";
import { useOverallReportStateStore } from "../../store/overallReportStateStore";
import axios from "../../utils/axios";
import TopBar from "../NavBars/TopBar";

function PageLayout() {
  const location = useLocation();

  const logOutModalIsOpen = useConfirmationModalStore(
    (state) => state.logOutModalIsOpen
  );

  const deletePiezoReportModalIsOpen = useConfirmationModalStore(
    (state) => state.deletePiezoReportModalIsOpen
  );

  const deleteIncidentReportModalIsOpen = useConfirmationModalStore(
    (state) => state.deleteIncidentReportModalIsOpen
  );

  const setPiezometersDataAndLastReadings = useMonitoringMapStateStore(
    (s) => s.setPiezometersDataAndLastReadings
  );

  const reportStatus = useOverallReportStateStore((s) => s.reportStatus);
  const setReportStatus = useOverallReportStateStore((s) => s.setReportStatus);

  const PiezoReadingsSetPiezometersDataAndLastReadings =
    usePiezometerLecturesStateStore((s) => s.setPiezometersDataAndLastReadings);

  const { isLoading: piezoDataIsLoading, data: fetchedPiezoData } = useQuery(
    "piezometers",
    fetchPiezometersData,
    {
      refetchOnWindowFocus: false,
    }
  );

  const { isLoading: lastReadingsAreLoading, data: lastReadings } = useQuery(
    "last_readings",
    fetchLastReadings,
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    console.log(reportStatus);
    if (reportStatus === "pending") {
      console.log("REQUESTING2");
      const interval = window.setInterval(async () => {
        const res = await axios.get("/report-status");
        console.log("RES", res);

        setReportStatus(res.data.status);
      }, 5000);

      return () => window.clearInterval(interval);
    }

    if (reportStatus === "ok") console.log("REPORT READY!!!");
  }, [reportStatus]);

  useEffect(() => {
    if (!fetchedPiezoData || !lastReadings) return;

    setPiezometersDataAndLastReadings(fetchedPiezoData, lastReadings);
    PiezoReadingsSetPiezometersDataAndLastReadings(
      fetchedPiezoData,
      lastReadings
    );
  }, [piezoDataIsLoading, lastReadingsAreLoading]);

  if (piezoDataIsLoading || lastReadingsAreLoading) return <h1>Loading...</h1>;

  if (process.env.NODE_ENV === "production") {
    return location.pathname === "/login" ? (
      <ProtectedLogIn>
        <div>
          <Outlet />
        </div>
      </ProtectedLogIn>
    ) : (
      <ProtectedRoute>
        <main className=" flex lg:grid  lg:grid-cols-6 font-openSans ">
          <Sidebar />

          <div className="flex flex-col w-full col-span-5 h-screen">
            <TopBar />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              key={location.pathname}
              // style={{
              //   backgroundColor: location.pathname.startsWith("/operations")
              //     ? "#f5f5f5"
              //     : location.pathname.startsWith("/business")
              //     ? "#f6f4eb"
              //     : "#fef7ed",
              // }}

              style={{
                backgroundImage:
                  "linear-gradient(to bottom, rgb(250, 250, 250), rgb(241, 241, 241) )",
              }}
              className={`text-[#333] overflow-y-scroll px-4 lg:px-0 py-4 md:pb-4 md:py-0 lg:pb-0 grow`}
            >
              <MobileMenu />

              <Outlet />
            </motion.div>
          </div>

          {logOutModalIsOpen ? <LogOutConfirmationModal /> : null}
          {deletePiezoReportModalIsOpen ? (
            <PiezoReportDeleteConfirmationModal />
          ) : null}

          {deleteIncidentReportModalIsOpen ? (
            <IncidentReportDeleteConfirmationModal />
          ) : null}

          <Toaster position="top-right" />
        </main>
      </ProtectedRoute>
    );
  } else
    return location.pathname === "/login" ? (
      <div>
        <Outlet />
      </div>
    ) : (
      <main className=" flex lg:grid  lg:grid-cols-6 font-openSans ">
        <Sidebar />

        <div className="flex flex-col w-full col-span-5 h-screen">
          <TopBar />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            key={location.pathname}
            // style={{
            //   backgroundColor: location.pathname.startsWith("/operations")
            //     ? "#f5f5f5"
            //     : location.pathname.startsWith("/business")
            //     ? "#f6f4eb"
            //     : "#fef7ed",
            // }}

            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgb(250, 250, 250), rgb(241, 241, 241) )",
            }}
            className={`text-[#333] overflow-y-scroll px-4 lg:px-0 py-4 md:pb-4 md:py-0 lg:pb-0 grow`}
          >
            <MobileMenu />

            <Outlet />
          </motion.div>
        </div>

        {logOutModalIsOpen ? <LogOutConfirmationModal /> : null}
        {deletePiezoReportModalIsOpen ? (
          <PiezoReportDeleteConfirmationModal />
        ) : null}

        {deleteIncidentReportModalIsOpen ? (
          <IncidentReportDeleteConfirmationModal />
        ) : null}

        <Toaster position="top-right" />
      </main>
    );
}

export default PageLayout;
