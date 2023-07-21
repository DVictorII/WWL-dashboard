import React from "react";
import { useNewPiezoReportStateStore } from "../../../store/NewPiezoReportStateStore";
import moment from "moment";
import { useMonitoringMapStateStore } from "../../../store/MonitoringMapStateStore";

function ReportInoperativeDatesTable() {
  const lecturesInformation = useNewPiezoReportStateStore(
    (state) => state.lecturesInformation
  );

  const paddock = useNewPiezoReportStateStore((state) => state.paddock);
  const piezo = useNewPiezoReportStateStore((state) => state.piezo);

  const piezometersData = useMonitoringMapStateStore((s) => s.piezometersData);

  const currentPiezometer = piezometersData.find(
    (p) => p.paddock === paddock && p.id === piezo
  );

  console.log("CURRENT", currentPiezometer);

  const { inoperativeDates } = lecturesInformation;

  const timeSpan = useNewPiezoReportStateStore((state) => state.timeSpan);

  console.log(lecturesInformation);

  return (
    <div
      className={`w-full h-[19rem] overflow-y-auto rounded-lg border-2 bg-white border-damaged-dark`}
    >
      <table className="select-none w-full border-collapse bg-white">
        <thead>
          <tr
            className={`w-full flex items-center px-4 xl:px-8  text-xs h-12  font-medium text-white bg-damaged-dark`}
          >
            <th className="flex items-center gap-x-2 ">
              <span className="text-[11px] md:text-xs text-start leading-relaxed">
                Inoperative days ({timeSpan} report)
              </span>
            </th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {currentPiezometer?.status === 4 ? (
            <tr className="w-full h-[16rem] flex items-center px-4 xl:px-8  bg-white ">
              <th className="w-full h-full flex items-center justify-center gap-x-2 ">
                <span className="text-sm">
                  Proposed piezometer. No readings yet!
                </span>
              </th>
            </tr>
          ) : currentPiezometer?.status === 3 ? (
            <tr className="w-full h-[16rem] flex items-center px-4 xl:px-8  bg-white ">
              <th className="w-full h-full flex flex-col gap-y-2 items-center justify-center gap-x-2 ">
                <span className="text-sm">Disconnected piezometer</span>

                <span className="text-sm">
                  Last reading at{" "}
                  {moment(lecturesInformation.lastReading.time).format(
                    "YYYY-MM-DD HH:mm:ss"
                  )}
                </span>
              </th>
            </tr>
          ) : (
            <>
              {inoperativeDates.length > 0 ? (
                <>
                  {inoperativeDates.map((obj, i) => (
                    <tr
                      style={{
                        backgroundColor: i % 2 === 0 ? "#F0D1D1" : "#fff",
                      }}
                      className="w-full flex items-center px-4 xl:px-8  h-12 bg-white "
                    >
                      <th className="w-full flex items-center gap-x-3">
                        <span className="text-[9px] md:text-[10px]">
                          {obj.inoperativeDays} days:
                        </span>
                        <span className="text-[9px] md:text-[10px]">
                          From{" "}
                          {moment(obj.currentDate).format(
                            "MMM DD, YYYY [at] HH:mm"
                          )}
                        </span>
                        <span className="text-[9px] md:text-[10px]">
                          to{" "}
                          {moment(obj.nextDate).format(
                            "MMM DD, YYYY [at] HH:mm"
                          )}
                        </span>
                      </th>
                    </tr>
                  ))}
                </>
              ) : (
                <tr
                  //   style={{
                  //     backgroundColor:
                  //       i % 2 === 0 ? selectedStatus.lightColor : "#fff",
                  //   }}
                  className="w-full h-[16rem] flex items-center px-4 xl:px-8  bg-white "
                >
                  <th className="w-full h-full  flex-col gap-y-2 flex items-center justify-center gap-x-2 ">
                    <span className="text-sm">Everything ok!</span>

                    <span className="text-sm">
                      No inoperative days for the current days span.
                    </span>
                  </th>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ReportInoperativeDatesTable;
