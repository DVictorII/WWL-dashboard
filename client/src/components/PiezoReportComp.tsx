import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiTwotoneCalendar } from "react-icons/ai";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

// @ts-ignore: Unreachable code error
import { boxShadow, boxShadowSlight } from "../utils/shadow";

interface Report {
  id: string;
  from_user: number;
  title: string;
  paddock: string;
  piezo: string;
  date: string;
  description: string;
}

function PiezoReportComp({ report }: { report: Report }) {
  const statusColors = {
    1: "#477C9A",
    2: "#E11E1E",
    3: "#DBC719",
    4: "#849A47",
    5: "#37AC74",
  };

  const [status, setStatus] = useState(1);

  const fetchPiezometerData = async () => {
    const result = await axios.get(
      `/api/v1/piezometers-data/${report.paddock}/${report.piezo}`
    );

    return result.data.piezos;
  };

  const { isLoading: piezometersAreLoading, data: piezometersData } = useQuery(
    `Onepiezometer_${report.paddock}_${report.piezo}`,
    fetchPiezometerData,
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (piezometersData) setStatus(piezometersData[0].status);
  }, [piezometersData]);

  if (piezometersAreLoading) return <div>.</div>;

  return (
    <Link to={`/reports/piezometers/${report.id}`}>
      <div
        className="relative p-4 sm:p-8 pr-12 sm:pr-20 rounded-[14px] overflow-hidden cursor-pointer shadow-sm"
        
      >
        <span className="text-xl 2xl:text-2xl font-semibold">
          {report.title}
        </span>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 sm:mt-8 md:mt-10 gap-y-4 gap-x-6">
          <div className="2xl:text-xl">
            <span>{report.paddock}</span> / <span>{report.piezo}</span>
          </div>

          <div className="flex items-center gap-x-4 2xl:text-xl">
            <span>{report.date}</span>
            <AiTwotoneCalendar className="w-6 h-6 2xl:w-7 2xl:h-7" />
          </div>
        </div>

        <div
          className="absolute top-0 right-0 h-full w-[20px] 2xl:w-[22px]"
          style={{
            //@ts-ignore
            backgroundColor: statusColors[status],
          }}
        />
      </div>
    </Link>
  );
}

export default PiezoReportComp;
