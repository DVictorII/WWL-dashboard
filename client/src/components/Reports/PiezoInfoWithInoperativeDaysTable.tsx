import InoperativeDaysSpanTable from "./InoperativeDaysSpanTable";
import InoperativeDaysTable from "./InoperativeDaysTable";
import { QueryClient, useQuery, useQueryClient } from "react-query";

import {
  fetchChartLectures,
  fetchPiezometerData,
} from "../../utils/reportsFetchFunctions";
import { useReportInfoTablesDaysSpanStore } from "../../store/ReportInfoTablesDaysSpanStore";
import moment from "moment";

//@ts-ignore
import { getInoperativeDates } from "../../utils/getInoperativeDates";
import { FadeLoader } from "react-spinners";
import ReportPiezoInformationTable from "./form/ReportPiezoInformationTable";
import SkeletonPiezoInfoWithInoperativeDaysTable from "../Skeletons/Reports/SkeletonPiezoInfoWithInoperativeDaysTable";

function PiezoInfoWithInoperativeDaysTable({
  paddock,
  piezo,
}: {
  paddock: string;
  piezo: string;
}) {
  const queryClient = useQueryClient();
  const daysSpan = useReportInfoTablesDaysSpanStore((state) => state.daysSpan);

  const { isLoading: piezometersAreLoading, data: piezometersData } = useQuery({
    queryKey: [`ReportPiezo-${paddock}-${piezo}`, paddock, piezo],
    queryFn: () => fetchPiezometerData({ paddock, piezo }),
    // The query will not execute until the userId exists
    enabled: !!paddock,
    refetchOnWindowFocus: false,
  });

  let datalogger = piezometersData?.datalogger;
  let channel = piezometersData?.channel;

  const { isLoading: lecturesAreLoading, data: lecturesData } = useQuery({
    queryKey: [
      `lecturesReportData-node_${datalogger}_${channel}`,
      datalogger,
      channel,
      daysSpan,
    ],
    queryFn: () => fetchChartLectures({ datalogger, channel, days: daysSpan }),
    // The query will not execute until the userId exists
    enabled: !!datalogger,
    refetchOnWindowFocus: false,
  });

  // useEffect(() => {
  //   console.log("lectures", lecturesData);
  // }, [lecturesData]);

  //@ts-ignore
  const lecturesDates = lecturesData?.map((lecture) => {
    return moment(lecture.time).format("YYYY-MM-DD HH:mm:ss");
  });

  //@ts-ignore
  const lecturesPressure = lecturesData?.map((lecture) => {
    return lecture.pressure;
  });

  const inoperativeDates = lecturesDates
    ? getInoperativeDates(lecturesDates)
    : undefined;

  if (piezometersAreLoading || lecturesAreLoading)
    return <SkeletonPiezoInfoWithInoperativeDaysTable />;

  return (
    <div className="flex flex-col gap-y-8 md:gap-y-4">
      <h2 className="font-bold text-sm 2xl:text-base">Report details</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 xl:gap-x-10 gap-y-8 md:gap-y-0 lg:gap-y-8 xl:gap-y-10">
        <div className=" md:px-4 md:py-8 flex flex-col gap-y-4 ">
          <h2
            className="text-sm md:text-base font-semibold"
            key={`${paddock}${piezo}`}
          >
            {paddock} / {piezo}
          </h2>
          <ReportPiezoInformationTable paddock={paddock} piezo={piezo} />
        </div>

        <div className=" md:px-4 md:pb-8 md:pt-7 flex flex-col gap-y-4 ">
          <InoperativeDaysSpanTable />
          <InoperativeDaysTable inoperativeDates={inoperativeDates} />
        </div>
      </div>
    </div>
  );
}

export default PiezoInfoWithInoperativeDaysTable;
