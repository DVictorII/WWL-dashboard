//@ts-ignore
import axios from "../utils/axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { IoSaveOutline } from "react-icons/io5";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { useGloblalUserStore } from "../store/GlobalUserStore";
import { chartPiezoList } from "../utils/piezoList";

// @ts-ignore: Unreachable code error
import { boxShadowSlight } from "../utils/shadow";
// @ts-ignore:
import { getInoperativeDates } from "../utils/getInoperativeDates";

// @ts-ignore: Unreachable code error
import BarChart from "./BarChart";
import ChartTable from "./ChartTable";
import ChartTypeSelection from "./ChartTypeSelection";
import Legend from "./Legend";
import { useChartStore } from "../store/ChartStateStore";

interface reportState {
  title: string;
  paddock: string;
  piezo: string;
  date: string;
  description: string;
}

interface PiezoReportFormProps {
  handleChange: (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => void;
  reportState: reportState;
  piezoListDisplay: string[];
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function PiezoReportForm() {
  const [chartType, setChartType] = useState("pressure");
  const changeChartType = (type: string) => setChartType(type);
  const userID = useGloblalUserStore((state) => state.userID);
  const navigate = useNavigate();

  const [reportState, setReportState] = useState({
    from_user: userID,
    title: "",
    paddock: "CDIII",
    piezo: "VW-CD3-01",
    days: 15,
    date: moment(Date.now()).format("YYYY-MM-DD"),
    description: "",
  });

  const [reportStateDisplay, setReportStateDisplay] = useState({
    paddock: "CDIII",
    piezo: "VW-CD3-01",
    days: 15,
  });

  const [piezoListDisplay, setPiezoListDisplay] = useState<string[]>(
    chartPiezoList["CDIII"]
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setReportState((s) => {
      return {
        ...s,
        [e.target.name]: e.target.value,
      };
    });
  };

  const applyFilters = () => {
    setReportStateDisplay({
      paddock: reportState.paddock,
      piezo: reportState.piezo,
      days: reportState.days,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await toast.promise(
        axios.post("/new-piezometer-report", {
          from_user: reportState.from_user,
          title: reportState.title,
          paddock: reportStateDisplay.paddock,
          piezo: reportStateDisplay.piezo,
          date: reportState.date,
          description: reportState.description,
        }),
        {
          loading: "Creating report...",
          success: (data) => `Piezometer report created!`,
          error: (err) => `There was an error, please try again`,
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

      navigate("/reports/piezometers");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const filter = reportState.paddock;
    // @ts-ignore: Unreachable code error
    setPiezoListDisplay((s) => chartPiezoList[filter]);
  }, [reportState.paddock]);

  useEffect(() => {
    setReportState((s) => {
      return {
        ...s,
        piezo: piezoListDisplay[0],
      };
    });
  }, [piezoListDisplay]);

  // GET LECTURES
  const fetchPiezometerData = async () => {
    try {
      const result = await axios.get(
        `/piezometers-data/${reportStateDisplay.paddock}/${reportStateDisplay.piezo}`
      );

      return result.data.piezos[0];
    } catch (err) {
      console.log("ERROR1", err);
    }
  };

  const { isLoading: piezometersAreLoading, data: piezometersData } = useQuery(
    `ReportPiezo-${reportStateDisplay.paddock}-${reportStateDisplay.piezo}`,
    fetchPiezometerData,
    {
      refetchOnWindowFocus: false,
    }
  );

  let datalogger = piezometersData?.datalogger;
  let channel = piezometersData?.channel;

  //@ts-ignore
  const fetchChartLectures = async (datalogger, channel) => {
    try {
      const result = await axios.get(
        `/lectures/node_${datalogger}_${channel}/${reportStateDisplay.days}`
      );

      return result.data.lectures;
    } catch (err) {
      console.log(err);
    }
  };

  const { isLoading: lecturesAreLoading, data: lecturesData } = useQuery({
    queryKey: [
      `lecturesReportData-node_${datalogger}_${channel}-${reportStateDisplay.days}`,
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

  const changePiezo = useChartStore((s) => s.changePiezo);

  const inoperativeDates = lecturesDates
    ? getInoperativeDates(lecturesDates)
    : undefined;

  if (piezometersAreLoading || lecturesAreLoading)
    return (
      <div className="w-full   h-full relative z-[10] flex justify-center items-center">
        <FadeLoader
          color="#BD9C45"
          loading={piezometersAreLoading || lecturesAreLoading}
          radius={50}
        />
      </div>
    );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-y-20">
      <fieldset className="flex flex-col sm:flex-row gap-x-4 gap-y-2 sm:items-center ">
        <label htmlFor="title" className="font-semibold text-lg 2xl:text-2xl">
          Title:
        </label>
        <input
          value={reportState.title}
          name="title"
          onChange={handleChange}
          className="px-4 py-3 2xl:px-6 2xl:py-4 2xl:text-xl rounded-[14px] border-2 border-[#cedae7] w-full focus:border-bluePrimary focus:outline-none"
          type="text"
          placeholder="Report title..."
          required
        />
      </fieldset>
      <div className="flex flex-col ">
        <span className="font-semibold text-lg 2xl:text-2xl">
          Piezo. information:
        </span>

        <ChartTable
          // handleChange={handleChange}
          chartState={{
            paddock: reportState.paddock,
            piezo: reportState.piezo,
            days: reportState.days,
          }}
          piezoListDisplay={piezoListDisplay}
          // applyFilters={applyFilters}
          displayingDate={true}
        />

        <div className="mt-16 flex flex-col gap-x-10  gap-y-12 w-full ">
          <div className="flex gap-x-4 items-center">
            <span className="font-semibold text-lg 2xl:text-2xl">
              Paddock section:
            </span>
            <span className="lg:text-lg 2xl:text-xl">
              {reportStateDisplay.paddock}
            </span>
          </div>

          <div className="flex gap-x-4 items-center">
            <span className="font-semibold text-lg 2xl:text-2xl">
              Piezometer ID:
            </span>
            <span className="lg:text-lg 2xl:text-xl">
              {reportStateDisplay.piezo}
            </span>
          </div>

          {lecturesPressure && lecturesDates && lecturesDates.length !== 0 ? (
            <div className="flex flex-col gap-y-8 ">
              <span className="font-semibold text-lg 2xl:text-2xl">
                Average PWP ( from {lecturesDates[0]} to{" "}
                {lecturesDates[lecturesDates.length - 1]} )
              </span>

              <span className="lg:text-lg 2xl:text-xl">
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
                No recent lectures for {reportStateDisplay.days} days span
              </span>
            </div>
          )}

          {inoperativeDates && inoperativeDates.length > 0 ? (
            <div className="flex flex-col gap-y-8 ">
              <span className="font-semibold text-lg 2xl:text-2xl">
                Inoperative dates (from{" "}
                {lecturesDates ? inoperativeDates[0].currentDate : ""} to{" "}
                {lecturesDates[lecturesDates.length - 1]})
              </span>

              <span className=" flex flex-col gap-y-4">
                {lecturesDates &&
                  //@ts-ignore
                  inoperativeDates.map((obj) => (
                    <div className="flex gap-x-2">
                      <span className="font-medium lg:text-lg 2xl:text-xl">
                        {obj.inoperativeDays} days:
                      </span>
                      <span className="lg:text-lg 2xl:text-xl">
                        from {obj.currentDate}
                      </span>
                      <span className="lg:text-lg 2xl:text-xl">
                        to {obj.nextDate}
                      </span>
                    </div>
                  ))}
              </span>
            </div>
          ) : null}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold 2xl:text-2xl">
          Latest piezometer lectures (Last {reportStateDisplay.days} days)
        </h2>

        <div className="mt-4">
          <ChartTypeSelection changeChartType={changeChartType} />
        </div>

        <div
          className=" mt-12 rounded-lg pb-4"
          style={{
            boxShadow: boxShadowSlight,
          }}
        >
          <BarChart chartType={chartType} chartState={reportStateDisplay} />
        </div>
      </div>

      <div className="mt-16 2xl:mt-24">
        <h2 className="text-lg 2xl:text-2xl font-semibold">Section Graph</h2>

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
              {piezometersData.section && piezometersData.section !== "?" ? (
                <img src={`/img/sections/${piezometersData.section}.png`} />
              ) : (
                <div className="font-semibold flex justify-center items-center py-10">
                  Piezometer don't belong to any section
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <fieldset className="flex flex-col sm:flex-row gap-x-4 gap-y-2 sm:items-start mt-4 ">
        <label
          className="font-semibold text-lg 2xl:text-2xl"
          htmlFor="description"
        >
          Description:
        </label>
        <textarea
          value={reportState.description}
          onChange={handleChange}
          className="px-4 2xl:px-6 2xl:py-4 2xl:text-xl  w-full py-2 rounded-[14px] border-2 border-[#cedae7]  focus:border-bluePrimary focus:outline-none"
          name="description"
          id="description"
          placeholder="Report description..."
          cols={30}
          rows={5}
        ></textarea>
      </fieldset>

      <button className=" self-center w-full sm:w-1/2 py-4 2xl:py-5 bg-[#333] rounded-[14px] text-white font-semibold text-xl 2xl:text-3xl flex items-center justify-center gap-x-3">
        <IoSaveOutline className="w-6 h-6 2xl:w-8 2xl:h-8" />
        <span>Save</span>
      </button>
      <Toaster position="top-right" />
    </form>
  );
}

export default PiezoReportForm;
