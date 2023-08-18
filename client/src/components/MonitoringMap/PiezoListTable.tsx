import { useMemo, useReducer, useState } from "react";
import { BsArrowDown, BsArrowDownUp, BsArrowUp } from "react-icons/bs";
import { monitoringMapStatusInfo } from "../../utils/monitoringMapStatusInfo";
import { useMonitoringMapStateStore } from "../../store/MonitoringMapStateStore";

import SkeletonPiezoListTable from "../Skeletons/MonitoringMap/SkeletonPiezoListTable";
import { PiezoDataListI, PiezometerDataI } from "../../types";

import { convertFloodDate } from "../../utils/convertFloodDate";
import {
  useReactTable,
  flexRender,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";

const options = {
  0: "All piezometers",
  1: "Active piezometers",
  2: "Damaged piezometers",
  3: "Disconnected piezometers",
  4: "Proposed piezometers",
  5: "TARPS",
};

//@ts-ignore
function PiezoListTable({ filteredPiezoList }) {
  const rerender = useReducer(() => ({}), {})[1];

  const [sorting, setSorting] = useState<SortingState>([]);

  const status = useMonitoringMapStateStore((s) => s.status);
  const lastReadings = useMonitoringMapStateStore((s) => s.lastReadings);

  const section = useMonitoringMapStateStore((s) => s.section);

  //@ts-ignore
  const selectedStatus = monitoringMapStatusInfo[status];

  const paddock = useMonitoringMapStateStore((s) => s.paddock);
  const piezo = useMonitoringMapStateStore((s) => s.piezo);

  const changePaddockAndPiezo = useMonitoringMapStateStore(
    (s) => s.changePaddockAndPiezo
  );

  const tableData = useMemo(() => {
    if (status === 5)
      //@ts-ignore
      return filteredPiezoList.map((piezo) => {
        const lastReading = lastReadings.find(
          //@ts-ignore
          (reading) =>
            reading.node === piezo.datalogger &&
            reading.channel === piezo.channel
        );

        const floodTime = convertFloodDate(piezo.time_threshold_wrong);

        return {
          id: piezo.id,
          paddock: piezo.paddock,
          section: piezo.section,
          reading: lastReading?.pressure ? Number(lastReading.pressure) : 0,
          pressureLimit: piezo.tarps_value,
          floodTime: floodTime,
          depth: piezo.depth || 0,
          status: piezo.status,
          coordinates: [piezo.lat, piezo.lon],
        };
      });

    // @ts-ignore
    return filteredPiezoList.map((piezo) => {
      const lastReading = lastReadings.find(
        //@ts-ignore
        (reading) =>
          reading.node === piezo.datalogger && reading.channel === piezo.channel
      );

      return {
        id: piezo.id,
        paddock: piezo.paddock,
        section: piezo.section,
        reading: lastReading?.pressure ? Number(lastReading.pressure) : 0,
        depth: piezo.depth || 0,
        status: piezo.status,
        coordinates: [piezo.lat, piezo.lon],
      };
    });
  }, []);

  const columnHelper = createColumnHelper<PiezoDataListI>();

  const columns = useMemo(() => {
    if (status === 5)
      return [
        columnHelper.accessor("id", {
          header: () => (
            <span className="text-[11px] md:text-xs lg:text-sm ">
              Piezo. ID
            </span>
          ),
          cell: (info) => {
            const value = info.getValue();
            const originals = info.row.original;
            return (
              <button
                style={{
                  color:
                    //@ts-ignore
                    monitoringMapStatusInfo[originals.status].normalColor,
                }}
                onClick={() => {
                  changePaddockAndPiezo(originals.paddock, originals.id);
                }}
                className={`text-[9px] md:text-[10px] lg:text-[11px] flex justify-center w-full items-center font-bold  hover:scale-105 transition-all`}
              >
                {originals.id}
              </button>
            );
          },
        }),

        columnHelper.accessor("paddock", {
          header: () => (
            <span className="text-[11px] md:text-xs lg:text-sm ">Paddock</span>
          ),
          cell: (info) => {
            const value = info.getValue();

            return (
              <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-semibold">
                {value}
              </span>
            );
          },
        }),

        columnHelper.accessor("section", {
          header: () => (
            <span className="text-[11px] md:text-xs lg:text-sm ">Section</span>
          ),
          cell: (info) => {
            const value = info.getValue();

            return (
              <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-semibold">
                {value}
              </span>
            );
          },
        }),

        columnHelper.accessor("reading", {
          header: () => (
            <span className="text-[11px] md:text-xs lg:text-sm ">
              Current PWP
            </span>
          ),
          cell: (info) => {
            const value = info.getValue();

            return (
              <span
                className={`${
                  value != 0
                    ? "text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-bold"
                    : "text-2xl flex justify-center items-center font-bold"
                }`}
              >
                {value != 0 ? `${Number(value).toFixed(3)} Kpa` : "-"}
              </span>
            );
          },
        }),

        columnHelper.accessor("pressureLimit", {
          header: () => (
            <span className="text-[11px] md:text-xs lg:text-sm ">
              Pressure Limit
            </span>
          ),
          cell: (info) => {
            const value = info.getValue();

            return (
              <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-bold">
                {Number(value).toFixed(2)} KPa
              </span>
            );
          },
        }),

        columnHelper.accessor("floodTime", {
          header: () => (
            <span className="text-[11px] md:text-xs lg:text-sm ">
              Flood time
            </span>
          ),
          cell: (info) => {
            const value = info.getValue();

            return (
              <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-semibold">
                {value}
              </span>
            );
          },
        }),

        columnHelper.accessor("depth", {
          header: () => (
            <span className="text-[11px] md:text-xs lg:text-sm ">Depth</span>
          ),
          cell: (info) => {
            const value = info.getValue();

            return (
              <span
                className={`${
                  Number(value) === 0
                    ? "text-2xl flex justify-center items-center font-semibold"
                    : "text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-semibold"
                }`}
              >
                {Number(value) === 0 ? "-" : `${Number(value).toFixed(2)} m`}{" "}
              </span>
            );
          },
        }),

        columnHelper.accessor("status", {
          header: () => (
            <span className="text-[11px] md:text-xs lg:text-sm ">Status</span>
          ),
          cell: (info) => {
            const value = info.getValue();

            return (
              <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-semibold">
                {/* @ts-ignore */}
                {monitoringMapStatusInfo[value].name}
              </span>
            );
          },
        }),

        columnHelper.accessor("coordinates", {
          header: () => (
            <span className="text-[11px] md:text-xs lg:text-sm ">
              Coordinates
            </span>
          ),
          cell: (info) => {
            const value = info.getValue();

            return (
              <div className="flex flex-col gap-y-1 items-center">
                <span className="text-[9px] md:text-[10px] lg:text-[11px] font-semibold">
                  {Number(value[0]).toFixed(6)},
                </span>
                <span className="text-[9px] md:text-[10px] lg:text-[11px] font-semibold">
                  {Number(value[1]).toFixed(6)}
                </span>
              </div>
            );
          },
        }),
      ];

    return [
      columnHelper.accessor("id", {
        header: () => (
          <span className="text-[11px] md:text-xs lg:text-sm ">Piezo. ID</span>
        ),
        cell: (info) => {
          const value = info.getValue();
          const originals = info.row.original;
          return (
            <button
              style={{
                color:
                  //@ts-ignore
                  monitoringMapStatusInfo[originals.status].normalColor,
              }}
              onClick={() => {
                changePaddockAndPiezo(originals.paddock, originals.id);
              }}
              className={`text-[9px] md:text-[10px] lg:text-[11px] flex justify-center w-full items-center font-bold  hover:scale-105 transition-all`}
            >
              {originals.id}
            </button>
          );
        },
      }),

      columnHelper.accessor("paddock", {
        header: () => (
          <span className="text-[11px] md:text-xs lg:text-sm ">Paddock</span>
        ),
        cell: (info) => {
          const value = info.getValue();

          return (
            <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-semibold">
              {value}
            </span>
          );
        },
      }),

      columnHelper.accessor("section", {
        header: () => (
          <span className="text-[11px] md:text-xs lg:text-sm ">Section</span>
        ),
        cell: (info) => {
          const value = info.getValue();

          return (
            <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-semibold">
              {value}
            </span>
          );
        },
      }),

      columnHelper.accessor("reading", {
        header: () => (
          <span className="text-[11px] md:text-xs lg:text-sm ">
            {status === 3 ? "Last PWP" : "Current PWP"}
          </span>
        ),
        cell: (info) => {
          const value = info.getValue();

          return (
            <span
              className={`${
                value != 0
                  ? "text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-bold"
                  : "text-2xl flex justify-center items-center font-bold"
              }`}
            >
              {value != 0 ? `${Number(value).toFixed(3)} Kpa` : "-"}
            </span>
          );
        },
      }),

      columnHelper.accessor("depth", {
        header: () => (
          <span className="text-[11px] md:text-xs lg:text-sm ">Depth</span>
        ),
        cell: (info) => {
          const value = info.getValue();

          return (
            <span
              className={`${
                Number(value) === 0
                  ? "text-2xl flex justify-center items-center font-semibold"
                  : "text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-semibold"
              }`}
            >
              {Number(value) === 0 ? "-" : `${Number(value).toFixed(2)} m`}{" "}
            </span>
          );
        },
      }),

      columnHelper.accessor("status", {
        header: () => (
          <span className="text-[11px] md:text-xs lg:text-sm ">Status</span>
        ),
        cell: (info) => {
          const value = info.getValue();

          return (
            <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-semibold">
              {/* @ts-ignore */}
              {monitoringMapStatusInfo[value].name}
            </span>
          );
        },
      }),

      columnHelper.accessor("coordinates", {
        header: () => (
          <span className="text-[11px] md:text-xs lg:text-sm ">
            Coordinates
          </span>
        ),
        cell: (info) => {
          const value = info.getValue();

          return (
            <div className="flex flex-col gap-y-1 items-center">
              <span className="text-[9px] md:text-[10px] lg:text-[11px] font-semibold">
                {Number(value[0]).toFixed(6)},
              </span>
              <span className="text-[9px] md:text-[10px] lg:text-[11px] font-semibold">
                {Number(value[1]).toFixed(6)}
              </span>
            </div>
          );
        },
      }),
    ];
  }, []);

  const tableInstance = useReactTable({
    columns,
    data: tableData,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  return (
    <>
      <div className={`${status !== 6 ? "mt-8" : "mt-4"}`} />

      <div className="flex flex-col gap-y-1 2xl:gap-y-3">
        {status !== 6 && (
          <div className=" flex items-end md:items-center gap-x-8 md:gap-x-16 lg:gap-x-8">
            <div className="flex gap-x-3 md:flex-col lg:flex-row md:gap-y-2">
              {paddock !== "All" && (
                <div className="flex gap-x-3">
                  <span className="font-semibold text-sm sm:text-base  2xl:text-lg">
                    {paddock}
                  </span>
                  <span className="font-semibold text-sm sm:text-base  2xl:text-lg">
                    /
                  </span>
                </div>
              )}

              {section !== "All" && (
                <div className="flex gap-x-3">
                  <span className="font-semibold text-sm sm:text-base  2xl:text-lg">
                    {section}
                  </span>
                  <span className="font-semibold text-sm sm:text-base  2xl:text-lg">
                    /
                  </span>
                </div>
              )}

              <span className="font-semibold text-sm sm:text-base  2xl:text-lg">
                {/* @ts-ignore */}
                {options[status]}
              </span>
            </div>
            <span
              style={{
                //@ts-ignore
                color: monitoringMapStatusInfo[status].normalColor,
              }}
              className="text-xl sm:text-2xl lg:text-3xl font-semibold"
            >
              {filteredPiezoList.length}
            </span>
          </div>
        )}

        <div className=" max-w-full max-h-fit ">
          <div
            style={{
              borderColor: selectedStatus.darkColor,
            }}
            className={` overflow-y-scroll overflow-x-scroll h-fit max-h-96 mt-5 mb-4    pb-5  `}
          >
            <table className="min-w-max border-separate border-spacing-0">
              <thead>
                {tableInstance.getHeaderGroups().map((headerGroup) => {
                  return (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="sticky top-0 text-center px-4 py-2 lg:px-6 lg:py-3 bg-white border-b border-[#ccc] text-[#777] "
                        >
                          {header.isPlaceholder ? null : (
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? "cursor-pointer select-none flex gap-x-2 justify-center items-center"
                                  : "flex gap-x-2 justify-center items-center",
                                onClick:
                                  header.column.getToggleSortingHandler(),
                              }}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}

                              {{
                                asc: (
                                  <div>
                                    <BsArrowUp className="w-[10px] h-[10px]" />
                                  </div>
                                ),
                                desc: (
                                  <div>
                                    <BsArrowDown className="w-[10px] h-[10px]" />
                                  </div>
                                ),
                              }[header.column.getIsSorted() as string] ?? (
                                <div>
                                  <BsArrowDownUp className="w-[10px] h-[10px]" />
                                </div>
                              )}
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  );
                })}
              </thead>

              <tbody className="bg-white text-[#444]">
                {tableInstance.getRowModel().rows.map((row, i) => (
                  <tr
                    key={row.id}
                    style={{
                      backgroundColor:
                        i % 2 === 0 ? selectedStatus.lightColor : "#fff",
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td className="px-4 py-2 lg:px-6 lg:py-3" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>

    // <>
    //   <div className={`${status !== 6 ? "mt-8" : "mt-4"}`} />

    //   <div className="flex flex-col gap-y-1 2xl:gap-y-3">
    //     {status !== 6 && (
    //       <div className=" flex items-end md:items-center gap-x-8 md:gap-x-16 lg:gap-x-8">
    //         <div className="flex gap-x-3 md:flex-col lg:flex-row md:gap-y-2">
    //           {paddock !== "All" && (
    //             <div className="flex gap-x-3">
    //               <span className="font-semibold text-sm sm:text-base  2xl:text-lg">
    //                 {paddock}
    //               </span>
    //               <span className="font-semibold text-sm sm:text-base  2xl:text-lg">
    //                 /
    //               </span>
    //             </div>
    //           )}

    //           {section !== "All" && (
    //             <div className="flex gap-x-3">
    //               <span className="font-semibold text-sm sm:text-base  2xl:text-lg">
    //                 {section}
    //               </span>
    //               <span className="font-semibold text-sm sm:text-base  2xl:text-lg">
    //                 /
    //               </span>
    //             </div>
    //           )}

    //           <span className="font-semibold text-sm sm:text-base  2xl:text-lg">
    //             {/* @ts-ignore */}
    //             {options[status]}
    //           </span>
    //         </div>
    //         <span
    //           style={{
    //             //@ts-ignore
    //             color: monitoringMapStatusInfo[status].normalColor,
    //           }}
    //           className="text-xl sm:text-2xl lg:text-3xl font-semibold"
    //         >
    //           {filteredPiezoList.length}
    //         </span>
    //       </div>
    //     )}

    //     <div className=" max-w-full max-h-fit ">
    //       <div
    //         style={{
    //           borderColor: selectedStatus.darkColor,
    //         }}
    //         className={` overflow-y-scroll overflow-x-scroll h-fit max-h-96 mt-5 mb-4    pb-5  `}
    //       >
    //         <table className="min-w-max border-separate border-spacing-0">
    //           <thead className="">
    //             <tr>
    //               <th className="sticky top-0 text-center px-4 py-2 lg:px-6 lg:py-3 bg-white border-b border-[#999] ">
    //                 <div className="flex gap-x-2 justify-center items-center">
    //                   <span className="text-[11px] md:text-xs lg:text-sm ">
    //                     Piezo. ID
    //                   </span>
    //                   <BsArrowDownUp className="w-2 h-2 lg:w-3 lg:h-3" />
    //                 </div>
    //               </th>

    //               <th className="sticky top-0 text-center px-4 py-2 lg:px-6 lg:py-3 bg-white border-b border-[#999] ">
    //                 <div className="flex gap-x-2 justify-center items-center">
    //                   <span className="text-[11px] md:text-xs lg:text-sm ">
    //                     Paddock
    //                   </span>
    //                   <BsArrowDownUp className="w-2 h-2 lg:w-3 lg:h-3" />
    //                 </div>
    //               </th>

    //               <th className="sticky top-0 text-center px-4 py-2 lg:px-6 lg:py-3 bg-white border-b border-[#999] ">
    //                 <div className="flex gap-x-2 justify-center items-center">
    //                   <span className="text-[11px] md:text-xs lg:text-sm ">
    //                     Section
    //                   </span>
    //                   <BsArrowDownUp className="w-2 h-2 lg:w-3 lg:h-3" />
    //                 </div>
    //               </th>

    //               <th className="sticky top-0 text-center px-4 py-2 lg:px-6 lg:py-3 bg-white border-b border-[#999] ">
    //                 <div className="flex gap-x-2 justify-center items-center">
    //                   <span className="text-[11px] md:text-xs lg:text-sm ">
    //                     Current PWP
    //                   </span>
    //                   <BsArrowDownUp className="w-2 h-2 lg:w-3 lg:h-3" />
    //                 </div>
    //               </th>

    //               {status === 5 && (
    //                 <th className="sticky top-0 text-center px-4 py-2 lg:px-6 lg:py-3 bg-white border-b border-[#999] ">
    //                   <div className="flex gap-x-2 justify-center items-center">
    //                     <span className="text-[11px] md:text-xs lg:text-sm ">
    //                       Pressure limit
    //                     </span>
    //                     <BsArrowDownUp className="w-2 h-2 lg:w-3 lg:h-3" />
    //                   </div>
    //                 </th>
    //               )}

    //               {status === 5 && (
    //                 <th className="sticky top-0 text-center px-4 py-2 lg:px-6 lg:py-3 bg-white border-b border-[#999] ">
    //                   <div className="flex gap-x-2 justify-center items-center">
    //                     <span className="text-[11px] md:text-xs lg:text-sm ">
    //                       Flood time
    //                     </span>
    //                     <BsArrowDownUp className="w-2 h-2 lg:w-3 lg:h-3" />
    //                   </div>
    //                 </th>
    //               )}

    //               <th className="sticky top-0 text-center px-4 py-2 lg:px-6 lg:py-3 bg-white border-b border-[#999] ">
    //                 <div className="flex gap-x-2 justify-center items-center">
    //                   <span className="text-[11px] md:text-xs lg:text-sm ">
    //                     Depth
    //                   </span>
    //                   <BsArrowDownUp className="w-2 h-2 lg:w-3 lg:h-3" />
    //                 </div>
    //               </th>

    //               <th className="sticky top-0 text-center px-4 py-2 lg:px-6 lg:py-3 bg-white border-b border-[#999] ">
    //                 <div className="flex gap-x-2 justify-center items-center">
    //                   <span className="text-[11px] md:text-xs lg:text-sm ">
    //                     Status
    //                   </span>
    //                   <BsArrowDownUp className="w-2 h-2 lg:w-3 lg:h-3" />
    //                 </div>
    //               </th>

    //               <th className="sticky top-0 text-center px-4 py-2 lg:px-6 lg:py-3 bg-white border-b border-[#999] ">
    //                 <div className="flex gap-x-2 justify-center items-center">
    //                   <span className="text-[11px] md:text-xs lg:text-sm ">
    //                     Coordinates
    //                   </span>
    //                   <BsArrowDownUp className="w-2 h-2 lg:w-3 lg:h-3" />
    //                 </div>
    //               </th>
    //             </tr>
    //           </thead>

    //           <tbody className="bg-white text-[#444]">
    //             {
    //               //@ts-ignore
    //               filteredPiezoList.map((piezometer, i) => {
    //                 const lastReading = lastReadings.find(
    //                   //@ts-ignore
    //                   (reading) =>
    //                     reading.node === piezometer.datalogger &&
    //                     reading.channel === piezometer.channel
    //                 );

    //                 const lastReadingExists =
    //                   lastReading &&
    //                   lastReading.pressure &&
    //                   Number(lastReading.pressure);

    //                 const depthIsZero = Number(piezometer.depth) == 0;

    //                 const floodTime = convertFloodDate(
    //                   piezometer.time_threshold_wrong
    //                 );

    //                 return (
    //                   <tr
    //                     style={{
    //                       backgroundColor:
    //                         i % 2 === 0 ? selectedStatus.lightColor : "#fff",
    //                     }}
    //                     key={piezometer.id}
    //                   >
    //                     <td className="px-4 py-2 lg:px-6 lg:py-3">
    //                       <button
    //                         style={{
    //                           color:
    //                             //@ts-ignore
    //                             monitoringMapStatusInfo[piezometer.status]
    //                               .normalColor,
    //                         }}
    //                         onClick={() => {
    //                           changePaddockAndPiezo(
    //                             piezometer.paddock,
    //                             piezometer.id
    //                           );
    //                         }}
    //                         className={`text-[9px] md:text-[10px] lg:text-[11px] flex justify-center w-full items-center font-bold  hover:scale-105 transition-all`}
    //                       >
    //                         {piezometer.id}
    //                       </button>
    //                     </td>

    //                     <td className="px-4 py-2 lg:px-6 lg:py-3">
    //                       <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-semibold">
    //                         {piezometer.paddock}
    //                       </span>
    //                     </td>

    //                     <td className="px-4 py-2 lg:px-6 lg:py-3">
    //                       <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-semibold">
    //                         {piezometer.section}
    //                       </span>
    //                     </td>

    //                     <td className="px-4 py-2 lg:px-6 lg:py-3">
    //                       <span
    //                         className={`${
    //                           lastReadingExists
    //                             ? "text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-bold"
    //                             : "text-2xl flex justify-center items-center font-bold"
    //                         }`}
    //                       >
    //                         {lastReadingExists
    //                           ? `${Number(lastReading.pressure).toFixed(3)} Kpa`
    //                           : "-"}
    //                       </span>
    //                     </td>

    //                     {status === 5 && (
    //                       <td className="px-4 py-2 lg:px-6 lg:py-3">
    //                         <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-bold">
    //                           {Number(piezometer.tarps_value).toFixed(2)} KPa
    //                         </span>
    //                       </td>
    //                     )}

    //                     {status === 5 && (
    //                       <td className="px-4 py-2 lg:px-6 lg:py-3">
    //                         <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-semibold">
    //                           {floodTime as string}
    //                         </span>
    //                       </td>
    //                     )}

    //                     <td className="px-4 py-2 lg:px-6 lg:py-3">
    //                       <span
    //                         className={`${
    //                           depthIsZero
    //                             ? "text-2xl flex justify-center items-center font-semibold"
    //                             : "text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-semibold"
    //                         }`}
    //                       >
    //                         {depthIsZero
    //                           ? "-"
    //                           : `${Number(piezometer.depth).toFixed(2)} m`}{" "}
    //                       </span>
    //                     </td>

    //                     <td className="px-4 py-2 lg:px-6 lg:py-3">
    //                       <span className="text-[9px] md:text-[10px] lg:text-[11px] flex justify-center items-center font-semibold">
    //                         {/* @ts-ignore */}
    //                         {monitoringMapStatusInfo[piezometer.status].name}
    //                       </span>
    //                     </td>

    //                     <td className="px-4 py-2 lg:px-6 lg:py-3">
    //                       <div className="flex flex-col gap-y-1 items-center">
    //                         <span className="text-[9px] md:text-[10px] lg:text-[11px] font-semibold">
    //                           {Number(piezometer.lat).toFixed(6)},
    //                         </span>
    //                         <span className="text-[9px] md:text-[10px] lg:text-[11px] font-semibold">
    //                           {Number(piezometer.lon).toFixed(6)}
    //                         </span>
    //                       </div>
    //                     </td>
    //                   </tr>
    //                 );
    //               })
    //             }
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>
    //   </div>
    // </>
  );
}

export default PiezoListTable;
