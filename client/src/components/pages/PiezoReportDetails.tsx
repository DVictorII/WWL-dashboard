// @ts-ignore: Unreachable code error
import BarChart from "../BarChart";

import MenuNavbar from "../MenuNavbar";
import ChartTypeSelection from "../ChartTypeSelection";

import React, { useState } from "react";
import { BsDownload } from "react-icons/bs";

// @ts-ignore: Unreachable code error
import { boxShadowSlight } from "../../utils/shadow";

import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
//@ts-ignore: Unreachable code error
import axios from "../../utils/axios";
import { useQuery } from "react-query";

import FadeLoader from "react-spinners/FadeLoader";
import moment from "moment";
//@ts-ignore
import { getInoperativeDates } from "../../utils/getInoperativeDates";
import DaysTable from "../DaysTable";
import { toast, Toaster } from "react-hot-toast";

function PiezoReportDetails() {
  const [chartType, setChartType] = useState("pressure");
  const changeChartType = (type: string) => setChartType(type);

  const [daysState, setDaysState] = useState(15);
  const [daysStateDisplay, setDaysStateDisplay] = useState(15);

  const handleChangeDays = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDaysState(Number(e.target.value));
  };

  const applyFilters = () => {
    setDaysStateDisplay(daysState);
  };

  const { id } = useParams();

  // FETCH INFO OF ONE PIEZOMETER
  const fetchPiezoReports = async () => {
    const result = await axios.get(`/piezometer-reports/${id}`);
    return result.data.reports[0];
  };

  const { isLoading, data: report } = useQuery(
    `piezoReport-${id}`,
    fetchPiezoReports,
    {
      refetchOnWindowFocus: false,
    }
  );

  const paddock = report?.paddock;
  const piezo = report?.piezo;

  const fetchPiezometerData = async () => {
    try {
      const result = await axios.get(
        `/piezometers-data/${paddock}/${piezo}`
      );

      return result.data.piezos[0];
    } catch (err) {
      console.log("ERROR1", err);
    }
  };

  const { isLoading: piezometersAreLoading, data: piezometersData } = useQuery({
    queryKey: [`ReportPiezo-${paddock}-${piezo}`, paddock, piezo],
    queryFn: () => fetchPiezometerData(),
    // The query will not execute until the userId exists
    enabled: !!paddock,
    refetchOnWindowFocus: false,
  });

  let datalogger = piezometersData?.datalogger;
  let channel = piezometersData?.channel;

  //@ts-ignore
  const fetchChartLectures = async (datalogger, channel) => {
    try {
      const result = await axios.get(
        `/lectures/node_${datalogger}_${channel}/${daysStateDisplay}`
      );

      return result.data.lectures;
    } catch (err) {
      console.log(err);
    }
  };

  const { isLoading: lecturesAreLoading, data: lecturesData } = useQuery({
    queryKey: [
      `lecturesReportData-node_${datalogger}_${channel}-${daysStateDisplay}`,
      datalogger,
      channel,
    ],
    queryFn: () => fetchChartLectures(datalogger, channel),
    // The query will not execute until the userId exists
    enabled: !!datalogger,
    refetchOnWindowFocus: false,
  });

  //@ts-ignore
  const lecturesDates = lecturesData?.map((lecture) => {
    return moment(lecture.time).format("YYYY-MM-DD HH:mm:ss");
  });

  //@ts-ignore
  const lecturesPressure = lecturesData?.map((lecture) => {
    return lecture.pressure;
  });

  console.log("LECTURES DATES", lecturesDates);
  console.log("LECTURES PRESSURE", lecturesPressure);

  const inoperativeDates = lecturesDates
    ? getInoperativeDates(lecturesDates)
    : undefined;

  console.log("INOPERATIVE DATES", inoperativeDates);

  if (isLoading || piezometersAreLoading || lecturesAreLoading)
    return (
      <div className="w-full   h-full relative z-[10] flex justify-center items-center">
        <FadeLoader
          color="#BD9C45"
          loading={isLoading || piezometersAreLoading || lecturesAreLoading}
          radius={50}
        />
      </div>
    );

  const downloadReport = async () => {
    try {
      const res = await toast.promise(
        axios.post("/create-pdf", {
          title: report.title || "",
          description: report.description || "",
          paddock: report.paddock || "",
          piezo: report.piezo || "",
          date: report.date || "",
          days: daysStateDisplay || 0,
          averagePWP: lecturesPressure
            ? Number(
                lecturesPressure.reduce(
                  //@ts-ignore
                  (acc, val) => acc + Number(val) / lecturesPressure.length,
                  0
                )
              ).toFixed(3)
            : 0,
          inoperativeDates: inoperativeDates || [],
          lecturesDates: lecturesDates || [],
          lecturesPressure: lecturesPressure || [],
          sectionURL: `/img/sections/${piezometersData.section}.png` || "None",
        }),
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

      // //@ts-ignore
      // const filename = res.data.filename;

      // const aTag = document.createElement("a");
      // aTag.href = filename;
      // aTag.target = "_blank";
      // // aTag.setAttribute(
      // //   "download",
      // //   `report_${moment(Date.now()).format("YYYY_MM_DD_hh_mm_ss")}.xlsx`
      // // );

      // document.body.appendChild(aTag);
      // aTag.click();
      // aTag.remove();
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  return (
    <>
      <MenuNavbar />

      <div className="mt-12 md:mt-0 flex flex-col gap-y-12">

        <div className="flex items-center justify-between gap-x-8 gap-y-8 flex-wrap">
          <h1 className="md:text-lg 2xl:text-xl font-bold">{report.title}</h1>

          <div className="flex items-center gap-x-12 flex-wrap gap-y-8">

            <button
              onClick={downloadReport}
              className="flex items-center gap-x-2 md:gap-x-3 lg:gap-x-4 px-4 py-2 bg-[#333] text-white rounded-xl"
            >
              <BsDownload className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">
                Download report on PDF
              </span>
            </button>

            <Link to="/reports/piezometers">
              <span className="cursor-pointer text-bluePrimary pb-1 border-b-2 border-[#777] border-bluePrimary w-max sz450:justify-self-end md:text-lg  font-semibold ">
                &larr; Back
              </span>
            </Link>

          </div>
        </div>
        <div className="text-sm font-medium">{report.description}</div>
      </div>


      <div className="py-12">
        

        

        <div className="mt-16 flex flex-col gap-y-8">
          <h2 className="text-lg font-semibold 2xl:text-2xl">
            Piezo. information
          </h2>

          <div className="mt-16 flex flex-col gap-x-10  gap-y-12 w-full ">
            <div className="flex gap-x-4 items-center">
              <span className="font-semibold text-lg 2xl:text-2xl">
                Paddock section:
              </span>
              <span className="2xl:text-lg">{report.paddock}</span>
            </div>

            <div className="flex gap-x-4 items-center">
              <span className="font-semibold text-lg 2xl:text-2xl">
                Piezo name:
              </span>
              <span className="2xl:text-lg">{report.piezo}</span>
            </div>

            <div className="flex gap-x-4 items-center">
              <span className="font-semibold text-lg 2xl:text-2xl">
                Inspection date:
              </span>
              <span className="2xl:text-lg">{report.date}</span>
            </div>

            {lecturesPressure && lecturesDates && lecturesDates.length !== 0 ? (
              <div className="flex flex-col gap-y-8 ">
                <span className="font-semibold text-lg 2xl:text-2xl">
                  Average PWP ( from {lecturesDates[0]} to{" "}
                  {lecturesDates[lecturesDates.length - 1]} )
                </span>

                <span className="2xl:text-lg">
                  {Number(
                    lecturesPressure.reduce(
                      //@ts-ignore
                      (acc, val) => acc + Number(val) / lecturesPressure.length,
                      0
                    )
                  ).toFixed(3)}{" "}
                  KPa
                </span>
              </div>
            ) : (
              <div className="flex flex-col gap-y-8 ">
                <span className="font-semibold text-lg 2xl:text-2xl">
                  No recent lectures for {daysStateDisplay} days span
                </span>
              </div>
            )}

            {inoperativeDates && inoperativeDates.length > 0 ? (
              <div className="flex flex-col gap-y-8 ">
                <span className="font-semibold text-lg 2xl:text-2xl">
                  Inoperative dates (from{" "}
                  {lecturesDates ? inoperativeDates[0].currentDate : ""} to{" "}
                  {lecturesDates[lecturesDates.length - 1]} )
                </span>

                <span className=" flex flex-col gap-y-4">
                  {lecturesDates &&
                    //@ts-ignore
                    inoperativeDates.map((obj) => (
                      <div className="flex flex-col sm:flex-row gap-x-3 gap-y-3">
                        <span className="font-medium lg:text-lg 2xl:text-xl">
                          {obj.inoperativeDays} days:
                        </span>
                        <span className=" lg:text-lg 2xl:text-xl">
                          from {obj.currentDate}
                        </span>
                        <span className=" lg:text-lg 2xl:text-xl">
                          to {obj.nextDate}
                        </span>
                      </div>
                    ))}
                </span>
              </div>
            ) : null}
          </div>

          <div className="mt-16">
            <DaysTable
              applyFilters={applyFilters}
              handleChangeDays={handleChangeDays}
              daysState={daysState}
            />
          </div>

          <div className="mt-16">
            <h2 className="text-lg font-semibold 2xl:text-2xl">
              Latest piezometer lectures (Last {daysStateDisplay} days)
            </h2>
            <div className="mt-16">
              <ChartTypeSelection changeChartType={changeChartType} />
            </div>

            <div
              className={`mt-12  rounded-lg  ${
                piezometersData?.status === 4
                  ? "flex items-center justify-center h-32"
                  : "pb-4"
              }`}
              style={{
                boxShadow: boxShadowSlight,
              }}
            >
              {/* {piezometersData?.status !== 4 ? (
                <BarChart
                  chartType={chartType}
                  chartState={{
                    paddock: report.paddock.replace("/", "-"),
                    piezo: report.piezo,
                    days: daysStateDisplay,
                  }}
                />
              ) : (
                <span className="text-lg font-semibold 2xl:text-xl 3xl:text-2xl py-10">
                  Proposed piezometer. No lectures yet
                </span>
              )} */}
            </div>

            <div className="mt-16 2xl:mt-24">
              <h2 className="text-lg 2xl:text-2xl font-semibold">
                Section Graph
              </h2>

              <div className=" w-full  rounded-[14px] overflow-hidden shadow-md mt-16">
                {piezometersAreLoading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <FadeLoader
                      color="#BD9C45"
                      loading={piezometersAreLoading}
                      radius={50}
                    />
                  </div>
                ) : (
                  <>
                    {piezometersData.section &&
                    piezometersData.section !== "?" ? (
                      <img
                        src={`/img/sections/${piezometersData.section}.png`}
                      />
                    ) : (
                      <div className="font-semibold flex justify-center items-center py-10">
                        Piezometer don't belong to any section
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default PiezoReportDetails;
