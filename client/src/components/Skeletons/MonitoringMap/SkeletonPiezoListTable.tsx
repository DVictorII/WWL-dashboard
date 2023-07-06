import React from "react";
import { BsArrowDownUp } from "react-icons/bs";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SkeletonPiezoListTable() {
  return (
    <>
      <div className="mt-8" />

      <div className="flex flex-col gap-y-1">
        <div className=" flex items-end gap-x-8">
          <Skeleton height={20} width={60} />
          <Skeleton height={20} width={60} />
        </div>

        <div className=" max-w-full max-h-fit ">
          <div
            className={` overflow-y-scroll overflow-x-scroll h-fit max-h-96 mt-5 mb-4 mx-4 md:mx-0  pb-5  `}
          >
            <table className="min-w-max border-separate border-spacing-0">
              <thead>
                <th className="sticky top-0 text-center px-4 py-2 lg:px-8 lg:py-3 bg-white border-b border-[#999] ">
                  <div className="flex gap-x-2 justify-center items-center">
                    <span className="text-[11px] md:text-xs lg:text-sm ">
                      Piezo. ID
                    </span>
                    <BsArrowDownUp className="w-2 h-2 lg:w-3 lg:h-3" />
                  </div>
                </th>

                <th className="sticky top-0 text-center px-4 py-2 lg:px-8 lg:py-3 bg-white border-b border-[#999] ">
                  <div className="flex gap-x-2 justify-center items-center">
                    <span className="text-[11px] md:text-xs lg:text-sm ">
                      Paddock
                    </span>
                    <BsArrowDownUp className="w-2 h-2 lg:w-3 lg:h-3" />
                  </div>
                </th>

                <th className="sticky top-0 text-center px-4 py-2 lg:px-8 lg:py-3 bg-white border-b border-[#999] ">
                  <div className="flex gap-x-2 justify-center items-center">
                    <span className="text-[11px] md:text-xs lg:text-sm ">
                      Section
                    </span>
                    <BsArrowDownUp className="w-2 h-2 lg:w-3 lg:h-3" />
                  </div>
                </th>

                <th className="sticky top-0 text-center px-4 py-2 lg:px-8 lg:py-3 bg-white border-b border-[#999] ">
                  <div className="flex gap-x-2 justify-center items-center">
                    <span className="text-[11px] md:text-xs lg:text-sm ">
                      Current PWP
                    </span>
                    <BsArrowDownUp className="w-2 h-2 lg:w-3 lg:h-3" />
                  </div>
                </th>

                <th className="sticky top-0 text-center px-4 py-2 lg:px-8 lg:py-3 bg-white border-b border-[#999] ">
                  <div className="flex gap-x-2 justify-center items-center">
                    <span className="text-[11px] md:text-xs lg:text-sm ">
                      Depth
                    </span>
                    <BsArrowDownUp className="w-2 h-2 lg:w-3 lg:h-3" />
                  </div>
                </th>

                <th className="sticky top-0 text-center px-4 py-2 lg:px-8 lg:py-3 bg-white border-b border-[#999] ">
                  <div className="flex gap-x-2 justify-center items-center">
                    <span className="text-[11px] md:text-xs lg:text-sm ">
                      Coordinates
                    </span>
                    <BsArrowDownUp className="w-2 h-2 lg:w-3 lg:h-3" />
                  </div>
                </th>
              </thead>

              <tbody className="bg-white">
                {
                  //@ts-ignore
                  Array(7)
                    .fill(0)
                    .map((_, i) => {
                      return (
                        <tr
                          style={{
                            backgroundColor: i % 2 === 0 ? "#E7E8EA" : "#fff",
                          }}
                          key={i}
                        >
                          <td className="px-4 py-2 lg:px-8 lg:py-3">
                            <span className="text-[9px] md:text-[10px]">
                              <Skeleton width={60} height={20} />
                            </span>
                          </td>

                          <td className="px-4 py-2 lg:px-8 lg:py-3">
                            <span className="text-[9px] md:text-[10px]">
                              <Skeleton width={60} height={20} />
                            </span>
                          </td>

                          <td className="px-4 py-2 lg:px-8 lg:py-3">
                            <span className="text-[9px] md:text-[10px]">
                              <Skeleton width={60} height={20} />
                            </span>
                          </td>

                          <td className="px-4 py-2 lg:px-8 lg:py-3">
                            <span className="text-[9px] md:text-[10px]">
                              <Skeleton width={60} height={20} />
                            </span>
                          </td>

                          <td className="px-4 py-2 lg:px-8 lg:py-3">
                            <span className={"text-[9px] md:text-[10px]"}>
                              <Skeleton width={60} height={20} />
                            </span>
                          </td>

                          <td className="px-4 py-2 lg:px-8 lg:py-3">
                            <span className="text-[9px] md:text-[10px]">
                              <Skeleton width={60} height={20} />
                            </span>
                          </td>
                        </tr>
                      );
                    })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default SkeletonPiezoListTable;
