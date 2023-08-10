import React from "react";
//@ts-ignore
import SectionChart from "../Charts/SectionChart";
import LecturesLocationTable from "../PiezometerLectures/LecturesLocationTable";
import { usePiezometerLecturesStateStore } from "../../store/PiezometerLecturesStateStore";
import { useQuery } from "react-query";
import axios from "../../utils/axios";
import { fetchPiezometerData } from "../../utils/reportsFetchFunctions";

const fetchSectionByPiezometer = async ({
  node,
  channel,
}: {
  node: number;
  channel: number;
}) => {
  try {
    const res = await axios.get(`/get_graphics_${node}-${channel}`);

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

function Chart() {
  const paddock = usePiezometerLecturesStateStore((s) => s.paddock).replaceAll(
    "/",
    "-"
  );
  const piezo = usePiezometerLecturesStateStore((s) => s.piezo);

  const { isLoading: piezoInfoIsLoading, data: piezoInfo } = useQuery({
    queryKey: [`Onepiezometer_${paddock}_${piezo}`],
    queryFn: () =>
      fetchPiezometerData({
        paddock: paddock,
        piezo: piezo,
      }),
    refetchOnWindowFocus: false,
  });

  const { isLoading: sectionDataIsLoading, data: sectionData } = useQuery({
    queryKey: [`Section-data-${paddock}-${piezo}`],
    queryFn: () =>
      fetchSectionByPiezometer({
        node: piezoInfo.datalogger,
        channel: piezoInfo.channel,
      }),
    enabled: !!piezoInfo && !!piezoInfo.section && piezoInfo.section !== "?",
    refetchOnWindowFocus: false,
  });

  if (piezoInfoIsLoading || sectionDataIsLoading)
    return (
      <div className="flex flex-col justify-center  gap-y-8  px-2 sm:px-8 md:px-0 ">
        <div className="grid grid-cols-1 lg:grid-cols-3   ">
          <LecturesLocationTable />
        </div>

        <h1>Loading...</h1>
      </div>
    );

  if (!sectionData)
    return (
      <div className="flex flex-col justify-center  gap-y-8  px-2 sm:px-8 md:px-0 ">
        <div className="grid grid-cols-1 lg:grid-cols-3   ">
          <LecturesLocationTable />
        </div>

        <h1>Piezometer dont belong to any section!!</h1>
      </div>
    );

  //@ts-ignore
  const chartPiezometers = sectionData.data.map((arr) => {
    const fixedXCoordinate = Math.round(arr[2] / 5) * 5;

    return [arr[0], arr[1], fixedXCoordinate, arr[3], arr[4]];
  });

  const chartCoordinates = sectionData.name;

  return (
    <div className="flex flex-col justify-center  gap-y-8  px-2 sm:px-8 md:px-0 ">
      <div className="grid grid-cols-1 lg:grid-cols-3   ">
        <LecturesLocationTable />
      </div>

      <div className="h-[30vh] sm:h-[40vh] lg:h-[60vh] w-full  border p-4">
        <SectionChart
          chartCoordinates={chartCoordinates}
          chartPiezometers={chartPiezometers}
        />
      </div>
    </div>
  );
}

export default Chart;
