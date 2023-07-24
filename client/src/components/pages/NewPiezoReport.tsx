import MenuNavbar from "../MenuNavbar";
import PiezoReportForm from "../Reports/PiezoReportForm";

import { useNavigate } from "react-router-dom";

import { useNewPiezoReportStateStore } from "../../store/NewPiezoReportStateStore";
import FullPageComps from "../FullPageComps";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useQuery } from "react-query";
import { fetchPiezometerData } from "../../utils/map";

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
    navigate("/reports/piezometers");
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

      <div className="mt-12 md:hidden" />

      <div className="flex items-center gap-x-1 pb-px border-b w-max border-transparent hover:border-[#666] transition-all">
        <AiOutlineArrowLeft />
        <span onClick={cancelForm} className="cursor-pointer font-semibold">
          back
        </span>
      </div>

      <div className="mt-4" />

      <div className="flex items-center justify-between gap-x-8 gap-y-8 flex-wrap bg-white p-4 rounded-xl shadow-sm">
        <h1 className="md:text-lg 2xl:text-xl font-bold">New Report</h1>
      </div>

      <div className="mt-4" />

      <PiezoReportForm />

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
