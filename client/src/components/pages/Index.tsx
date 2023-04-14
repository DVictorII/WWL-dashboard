import { useState, useEffect } from "react";

import { BsDownload } from "react-icons/bs";
import { motion } from "framer-motion";
import moment from "moment";
import { mapPiezoList } from "../../utils/piezoList";
import MenuNavbar from "../MenuNavbar";
import PiezoOverview from "../PiezoOverview";
import MapTable from "../MapTable";
import MapWrapper from "../MapWrapper";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import MapTypeSelection from "../MapTypeSelection";
import IncidentMapMultiple from "../IncidentMapMultiple";
//@ts-ignore: Unreachable code error
import axios from "../../utils/axios";
import { useIndexMapStore } from "../../store/IndexMapStore";
import { useChartStore } from "../../store/ChartStateStore";
import Sidebar from "../NavBars/Sidebar";
import { AiOutlineDownload } from "react-icons/ai";
import PiezoListTable from "../MonitoringMap/PiezoListTable";
import PiezoFilterComp from "../MonitoringMap/MapFiltering/PiezoFilterComp";
import StateShowing from "../MonitoringMap/StateShowing";
import { useMonitoringMapStateStore } from "../../store/MonitoringMapStateStore";
import LogOutConfirmationModal from "../LogOutConfirmationModal";
import { useLogOutStore } from "../../store/LogOutStore";
import {
  capitalizeName,
  monitoringMapStatusInfo,
} from "../../utils/monitoringMapStatusInfo";
import MobileMenu from "../MobileMenu";

interface GlobalMapState {
  status: string | number;
  paddock: string;
  piezo: string;
  date: string;
}

const Index = () => {
  const status = useMonitoringMapStateStore((s) => s.status);
  const paddock = useMonitoringMapStateStore((s) => s.paddock);
  const piezo = useMonitoringMapStateStore((s) => s.piezo);
  const date = useMonitoringMapStateStore((s) => s.date);

  const logOutModalIsOpen = useLogOutStore((state) => state.logOutModalIsOpen);

  // const mapState = {
  //   status,
  //   paddock,
  //   piezo,
  //   date
  // }

  const changeStatus = useMonitoringMapStateStore((s) => s.changeStatus);
  const changePaddock = useMonitoringMapStateStore((s) => s.changePaddock);
  const changePiezo = useMonitoringMapStateStore((s) => s.changePiezo);

  const [mapType, setMapType] = useState("piezometers");
  const changeMapType = (type: string) => setMapType(type);

  const [mapKey, setMapKey] = useState(0);
  const refreshMap = () => {
    setMapKey((k) => k + 1);
  };

  // const [globalMapStateDisplay, setGlobalMapStateDisplay] =
  //   useState<GlobalMapState>({
  //     status: "All",
  //     paddock: "All",
  //     piezo: "All",
  //     date: moment(Date.now()).format("YYYY-MM-DD"),
  //   });

  const [piezoListDisplay, setPiezoListDisplay] = useState<string[]>(
    mapPiezoList["CDIII"]
  );

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  // ) => {
  //   setGlobalMapState((s) => {
  //     return {
  //       ...s,
  //       [e.target.name]: e.target.value,
  //     };
  //   });
  // };

  const setGlobalStateStatus = (newStatus: string | number) => {
    // changeStatus(String(newStatus))
    // changePaddock("All")
    // changePiezo("All")
    // refreshMap();
    // setGlobalMapState((s) => {
    //   return {
    //     ...s,
    //     paddock: "All",
    //     piezo: "All",
    //     status: newStatus,
    //   };
    // });
    // setGlobalMapStateDisplay((s) => {
    //   return {
    //     ...s,
    //     paddock: "All",
    //     piezo: "All",
    //     status: newStatus,
    //   };
    // });
    // refreshMap();
  };

  // const applyFilters = () => {
  //   if (piezo === "All") {
  //     setGlobalMapStateDisplay(globalMapState);
  //   } else {
  //     setGlobalMapStateDisplay((s) => {
  //       return {
  //         status: "All",
  //         paddock: globalMapState.paddock,
  //         piezo: globalMapState.piezo,
  //         date: globalMapState.date,
  //       };
  //     });
  //   }

  //   // refreshMap();
  // };

  // useEffect(() => {
  //   // @ts-ignore: Unreachable code error
  //   setPiezoListDisplay((s) => mapPiezoList[paddock]);
  // }, [paddock]);

  // useEffect(() => {
  //   changePiezo(piezoListDisplay[0])

  //   // setGlobalMapState((s) => {
  //   //   return {
  //   //     ...s,
  //   //     piezo: piezoListDisplay[0],
  //   //   };
  //   // });
  // }, [piezoListDisplay]);

  const downloadReport = async () => {
    try {
      await toast.promise(
        axios.post("/modify_excel"),
        {
          loading: "Generating report...",
          success: (data) => {
            return `Generated! Downloading...`;
          },
          error: (err) => `There was an error!`,
        },
        {
          success: {
            duration: 3000,

            style: {
              fontWeight: "500",
              border: "2px solid #65a30d",
              padding: "8px 16px",
              color: "#1c1917",
            },
          },
          error: {
            duration: 3000,

            style: {
              fontWeight: "500",
              border: "2px solid #b91c1c",
              padding: "8px 16px",
              color: "#1c1917",
            },
          },
        }
      );

      const filename = "/pyreport/report2.xlsx";

      const aTag = document.createElement("a");
      aTag.href = filename;
      aTag.target = "_blank";
      aTag.setAttribute(
        "download",
        `report_${moment(Date.now()).format("YYYY_MM_DD_hh_mm_ss")}.xlsx`
      );

      document.body.appendChild(aTag);
      aTag.click();
      aTag.remove();
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  //@ts-ignore

  const selectedStatus = monitoringMapStatusInfo[status];

  return (
    <main className="flex font-openSans">
      <Sidebar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        key="dashboard"
        className="md:ml-20 lg:ml-24 2xl:ml-28 px-4 py-12 md:px-8  lg:p-12  2xl:p-16 "
      >
        <MenuNavbar />

        <div className="flex items-center justify-between gap-x-8 gap-y-8 flex-wrap mt-12 md:mt-0">
          <h1 className=" md:text-lg 2xl:text-xl font-bold">
            Monitoring Map (92 Piezometers)
          </h1>
          <button
            onClick={downloadReport}
            className="flex items-center gap-x-2 md:gap-x-3 lg:gap-x-4 px-4 py-2 bg-[#222] text-white rounded-xl"
          >
            <AiOutlineDownload className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 " />
            <span className="text-sm md:text-base lg:text-lg">
              Generate report
            </span>
          </button>
        </div>

        {/* <PiezoOverview
          globalMapStateDisplay={mapState}
          setGlobalStateStatus={setGlobalStateStatus}
          changeMapType={changeMapType}
          mapType={mapType}
        />

        <MapTable
        refreshMap={refreshMap}
          mapState={mapState}
          piezoListDisplay={piezoListDisplay}
          
          changeMapType={changeMapType}
        />

        <div className="mt-16">
          <MapTypeSelection changeMapType={changeMapType} mapType={mapType} />
        </div>

        {mapType === "piezometers" ? (
          <div className="mt-16" key={mapKey}>
            <MapWrapper
              status={status}
              paddock={paddock}
              piezo={piezo}
              date={date}
            />
          </div>
        ) : (
          <div className="mt-16">
            <IncidentMapMultiple />
          </div>
        )} */}

        <div className="md:bg-[#f5f5f5] bg-white   md:px-8 md:py-10  rounded-2xl mt-12 flex flex-col gap-y-12">
          <h2 className="font-semibold flex gap-x-12 items-end">
            <span className="md:text-lg 2xl:text-xl">
              {selectedStatus.name === "incident"
                ? "Incidents"
                : selectedStatus.name === "tarp"
                ? "TARPS"
                : `${capitalizeName(selectedStatus.name)} piezometers`}
            </span>
            <span
              style={{
                color: selectedStatus.normalColor,
              }}
              className={`text-2xl lg:text-3xl 2xl:text-4xl `}
            >
              {selectedStatus.number}
            </span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 xl:gap-x-10 gap-y-8 xl:gap-y-10">
            <PiezoListTable />

            <PiezoFilterComp />
          </div>

          <StateShowing/>

          <div
            className="flex flex-col gap-y-4"
            key={`${piezo}${paddock}${status}${date}`}
          >
            <h2 className="md:text-lg 2xl:text-xl font-semibold">
              {status !== 6
                ? "Piezometers interactive map"
                : "Incidents interactive map"}
            </h2>
            {status !== 6 ? <MapWrapper /> : <IncidentMapMultiple />}
          </div>
        </div>

        <Toaster position="top-right" />
        {logOutModalIsOpen ? <LogOutConfirmationModal /> : null}
        <MobileMenu />
      </motion.div>
    </main>
  );
};

export default Index;
