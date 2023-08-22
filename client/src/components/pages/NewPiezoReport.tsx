import MenuNavbar from "../MenuNavbar";
import PiezoReportForm from "../Reports/PiezoReportForm";

import { Link, useNavigate } from "react-router-dom";

import { useNewPiezoReportStateStore } from "../../store/NewPiezoReportStateStore";
import FullPageComps from "../FullPageComps";
import { AiOutlineArrowLeft, AiOutlineLeft } from "react-icons/ai";

function NewPiezoReport() {
  const paddock = useNewPiezoReportStateStore(
    (state) => state.paddock
  ).replaceAll("/", "-");
  const piezo = useNewPiezoReportStateStore((state) => state.piezo);
  const days = useNewPiezoReportStateStore((state) => state.days);
  const chartType = useNewPiezoReportStateStore((state) => state.chartType);

  const resetState = useNewPiezoReportStateStore((state) => state.resetState);

  const navigate = useNavigate();

  const cancelForm = () => {
    resetState();
    navigate("/operations/reports/piezometers");
  };

  // const { isLoading: piezometersAreLoading, data: piezometersData } = useQuery({
  //   queryKey: [`Onepiezometer_${paddock}_${piezo}`],
  //   queryFn: () =>
  //     fetchPiezometerData({
  //       paddock: paddock,
  //       piezo: piezo,
  //     }),
  //   refetchOnWindowFocus: false,
  // });

  // if (piezometersAreLoading) return <h1>Loading...</h1>;

  // const node = piezometersData[0].datalogger;
  // const channel = piezometersData[0]?.channel;

  return (
    <>
      <MenuNavbar />

      <div className="py-4  lg:px-4  border-b border-[#ccc]">
        <div className="flex flex-col gap-y-4">
          <h1 className="flex gap-x-4 items-center ">
            <div onClick={cancelForm} className="cursor-pointer">
              <AiOutlineLeft className="w-4 h-4 " />
            </div>

            <span className="font-bold xl:text-lg">
              Operations - New Report
            </span>
          </h1>
        </div>
      </div>

      <div className="mt-4" />

      <div className="lg:mx-4">
        <PiezoReportForm />
      </div>

      <FullPageComps
        information={{
          paddock,
          piezo,
          days,
          chartType,
        }}
      />
    </>
  );
}

export default NewPiezoReport;
