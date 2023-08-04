import { BsArrowDownUp, BsTrash } from "react-icons/bs";
import { ReportDetails } from "../../types";
import moment from "moment";
import { Link } from "react-router-dom";
//@ts-ignore
import axios from "../../utils/axios";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { useDeletePiezoReport } from "../../hooks/reportHooks";
import { useConfirmationModalStore } from "../../store/ConfirmationModalStore";

function ReportsListTable({ reports }: { reports: ReportDetails[] }) {
  const openDeletePiezoReportModal = useConfirmationModalStore(
    (s) => s.openDeletePiezoReportModal
  );

  return (
    <div className=" max-w-full max-h-fit ">
      <div
        className={` overflow-y-scroll overflow-x-scroll h-fit max-h-96 min-h-[18rem] mt-5 mb-4   pb-5  rounded-sm border-b border-active-normal `}
      >
        <table className="min-w-max border-separate border-spacing-0">
          <thead className="bg-active-dark text-white">
            <th className="sticky top-0 text-center px-4 py-2 lg:px-8 lg:py-3  border-b border-[#999] ">
              <div className="flex gap-x-2 justify-center items-center">
                <span className="text-[11px] md:text-xs lg:text-sm ">N°</span>
                <BsArrowDownUp className="w-2 h-2 lg:w-3 lg:h-3" />
              </div>
            </th>

            <th className="sticky top-0 text-center px-4 py-2 lg:px-8 lg:py-3  border-b border-[#999] ">
              <div className="flex gap-x-2 justify-center items-center">
                <span className="text-[11px] md:text-xs lg:text-sm ">
                  Created by
                </span>
                <BsArrowDownUp className="w-2 h-2 lg:w-3 lg:h-3" />
              </div>
            </th>

            <th className="sticky top-0 text-center px-4 py-2 lg:px-8 lg:py-3  border-b border-[#999] ">
              <div className="flex gap-x-2 justify-center items-center">
                <span className="text-[11px] md:text-xs lg:text-sm ">
                  Report title
                </span>
                <BsArrowDownUp className="w-2 h-2 lg:w-3 lg:h-3" />
              </div>
            </th>

            <th className="sticky top-0 text-center px-4 py-2 lg:px-8 lg:py-3  border-b border-[#999] ">
              <div className="flex gap-x-2 justify-center items-center">
                <span className="text-[11px] md:text-xs lg:text-sm ">
                  Report date
                </span>
                <BsArrowDownUp className="w-2 h-2 lg:w-3 lg:h-3" />
              </div>
            </th>

            <th className="sticky top-0 text-center px-4 py-2 lg:px-8 lg:py-3  border-b border-[#999] ">
              <div className="flex gap-x-2 justify-center items-center">
                <span className="text-[11px] md:text-xs lg:text-sm ">
                  Piezo. location
                </span>
                <BsArrowDownUp className="w-2 h-2 lg:w-3 lg:h-3" />
              </div>
            </th>

            <th className="sticky top-0 text-center px-8 py-2  lg:py-3  border-b border-[#999] "></th>

            {/* <th className="sticky top-0 text-center px-8 py-2  lg:py-3  border-b border-[#999] "></th> */}
            <th className="sticky top-0 text-center px-8 py-2  lg:py-3  border-b border-[#999] "></th>
          </thead>

          <tbody className="bg-white text-[#444]">
            {reports.map((report, i) => (
              <tr
                key={report.report_id}
                style={{
                  backgroundColor: i % 2 === 0 ? "#d2d4d8" : "white",
                }}
              >
                <td className="px-4 py-2 lg:px-8 lg:py-3">
                  <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-bold">
                    {String(i + 1).padStart(2, "0")}.
                  </span>
                </td>

                <td className="px-4 py-2 lg:px-8 lg:py-3">
                  <div className="flex items-center gap-x-2 justify-center">
                    <div className="w-6 h-6 border border-[#333] rounded-full flex items-center justify-center">
                      <img src={`/media/img/photos/${report.user_picture}`} />
                    </div>
                    <span className="text-[9px] md:text-[10px] lg:text-[11px]  font-semibold">
                      {report.user_name}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-2 lg:px-8 lg:py-3">
                  <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-bold">
                    {report.report_title}
                  </span>
                </td>

                <td className="px-4 py-2 lg:px-8 lg:py-3">
                  <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-semibold">
                    {moment(report.report_date).format("MMM DD, YYYY")}
                  </span>
                </td>

                <td className="px-4 py-2 lg:px-8 lg:py-3">
                  <div className="flex items-center gap-x-2 justify-center">
                    <span className="text-[9px] md:text-[10px] lg:text-[11px]  font-semibold">
                      {report.report_paddock}
                    </span>
                    <span className="text-[9px] md:text-[10px] lg:text-[11px]  font-semibold">
                      /
                    </span>

                    <span className="text-[9px] md:text-[10px] lg:text-[11px]  font-semibold">
                      {report.report_piezo}
                    </span>
                  </div>
                </td>

                <td className="px-8 py-2  lg:py-3">
                  <Link
                    to={`/operations/reports/piezometers/${report.report_id}`}
                  >
                    <div className="flex items-center">
                      <span className="text-[9px] md:text-[10px] lg:text-[11px]  font-bold text-orange-600  border-b border-orange-600  hover:text-orange-800 hover:border-orange-800 transition-all cursor-pointer">
                        View
                      </span>
                    </div>
                  </Link>
                </td>

                {/* <td className="px-8 py-2  lg:py-3">
                  <span className="text-[9px] md:text-[10px] lg:text-[11px]  font-semibold text-orange-600 border-b border-orange-600  hover:text-orange-800 hover:border-orange-800 transition-all cursor-pointer">
                    Edit
                  </span>
                </td> */}
                <td className="px-8 py-2  lg:py-3">
                  <div
                    onClick={() => openDeletePiezoReportModal(report.report_id)}
                    className=" w-7 h-7 md:w-9 md:h-9 bg-damaged-normal hover:bg-opacity-30 transition-all cursor-pointer  bg-opacity-20 rounded-full flex items-center justify-center"
                  >
                    <BsTrash className="h-3 w-3 md:w-4 md:h-4 text-damaged-dark" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReportsListTable;
