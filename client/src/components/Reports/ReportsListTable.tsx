import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BsArrowDownUp, BsTrash } from "react-icons/bs";

function ReportsListTable() {
  return (
    <div
      className={`max-w-[1000vh] h-[21rem] sm:h-[24.5rem] md:h-[28rem] overflow-x-auto rounded-lg border-2 bg-white border-[#333]`}
    >
      <table className=" select-none w-full border-collapse bg-white">
        <thead>
          <tr
            className={`w-full flex items-center px-8 whitespace-nowrap  gap-x-14 md:gap-x-16 justify-evenly  h-14  font-medium text-white bg-[#333]`}
          >
            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center ">
              <span className="text-[11px] md:text-xs">Created by</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span className="text-[11px] md:text-xs">Report title</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span className="text-[11px] md:text-xs">Report description</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span className="text-[11px] md:text-xs">Piezo. location</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center"></th>

            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center"></th>
            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center"></th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {/* {
            //@ts-ignore
            filteredPiezoList.map((piezometer, i) => {
              const lastReading = lastReadings.find(
                //@ts-ignore
                (reading) =>
                  reading.node === piezometer.datalogger &&
                  reading.channel === piezometer.channel
              );

              const lastReadingExists = lastReading && lastReading.pressure;

              const depthIsZero = Number(piezometer.depth) == 0;

              console.log(lastReadingExists, depthIsZero);

              return (
                <tr
                  
                    backgroundColor:
                      i % 2 === 0 ? "#333" : "#fff",
                  
                  className="w-full flex items-center whitespace-nowrap gap-x-14 md:gap-x-16 px-8  text-[9px] md:text-[10px] h-14  "
                >
                  <th className="flex items-center gap-x-2 w-20 justify-center">
                    <span>{piezometer.id}</span>
                  </th>

                  <th className="flex items-center gap-x-2 w-20 justify-center">
                    <span>{piezometer.paddock}</span>
                  </th>

                  <th className="flex items-center gap-x-2 w-20 justify-center">
                    <span>{piezometer.section}</span>
                  </th>

                  <th className="flex items-center gap-x-2 w-28 justify-center">
                    <span>
                      {piezometer.lat},<br />
                      {piezometer.lon}
                    </span>
                  </th>

                  <th
                    className="flex items-center gap-x-2 
                              w-20 justify-center"
                  >
                    <span className={`${depthIsZero ? "text-2xl" : ""}`}>
                      {depthIsZero
                        ? "-"
                        : `${Number(piezometer.depth).toFixed(2)} m`}{" "}
                    </span>
                  </th>

                  <th className="flex items-center gap-x-2 w-28 justify-center">
                    <span className={`${lastReadingExists ? "" : "text-2xl"}`}>
                      {lastReadingExists
                        ? `${Number(lastReading.pressure).toFixed(3)} Kpa`
                        : "-"}
                    </span>
                  </th>
                </tr>
              );
            })
          } */}
          <tr className="w-full flex items-center justify-evenly whitespace-nowrap gap-x-14 md:gap-x-16 px-8  text-[9px] md:text-[10px] h-14 bg-white ">
            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <div className="w-6 h-6 border border-[#333] rounded-full flex items-center justify-center">
                <AiOutlineUser className="w-3 h-3" />
              </div>
              <span>Aaron Smith</span>
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span>Section Inspection</span>
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span>Jan 01 2023</span>
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span>
                -22.29382918,
                <br />
                -15.82938212
              </span>
            </th>

            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center">
              <span className="text-[11px] md:text-xs text-cyan-600 border-b-2 border-cyan-600  hover:text-cyan-800 hover:border-cyan-800 transition-all cursor-pointer">
                View
              </span>
            </th>

            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center">
              <span className="text-[11px] md:text-xs text-cyan-600 border-b-2 border-cyan-600  hover:text-cyan-800 hover:border-cyan-800 transition-all cursor-pointer">
                Edit
              </span>
            </th>
            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center">
              <div className=" w-7 h-7 md:w-9 md:h-9 bg-damaged-normal hover:bg-opacity-40 transition-all cursor-pointer  bg-opacity-30 rounded-full flex items-center justify-center">
                <BsTrash className="h-3 w-3 md:w-4 md:h-4 text-damaged-dark" />
              </div>
            </th>
          </tr>

          <tr className="w-full flex items-center justify-evenly whitespace-nowrap gap-x-14 md:gap-x-16 px-8  text-[9px] md:text-[10px] h-14 bg-[#333] bg-opacity-10 ">
            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <div className="w-6 h-6 border border-[#333] rounded-full flex items-center justify-center">
                <AiOutlineUser className="w-3 h-3" />
              </div>
              <span>Aaron Smith</span>
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span>Section Inspection</span>
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span>Jan 01 2023</span>
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span>
                -22.29382918,
                <br />
                -15.82938212
              </span>
            </th>

            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center">
              <span className="text-[11px] md:text-xs text-cyan-600 border-b-2 border-cyan-600  hover:text-cyan-800 hover:border-cyan-800 transition-all cursor-pointer">
                View
              </span>
            </th>

            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center">
              <span className="text-[11px] md:text-xs text-cyan-600 border-b-2 border-cyan-600  hover:text-cyan-800 hover:border-cyan-800 transition-all cursor-pointer">
                Edit
              </span>
            </th>
            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center">
              <div className=" w-7 h-7 md:w-9 md:h-9 bg-damaged-normal hover:bg-opacity-40 transition-all cursor-pointer  bg-opacity-30 rounded-full flex items-center justify-center">
                <BsTrash className="h-3 w-3 md:w-4 md:h-4 text-damaged-dark" />
              </div>
            </th>
          </tr>

          <tr className="w-full flex items-center justify-evenly whitespace-nowrap gap-x-14 md:gap-x-16 px-8  text-[9px] md:text-[10px] h-14 bg-white ">
            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <div className="w-6 h-6 border border-[#333] rounded-full flex items-center justify-center">
                <AiOutlineUser className="w-3 h-3" />
              </div>
              <span>Aaron Smith</span>
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span>Section Inspection</span>
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span>Jan 01 2023</span>
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span>
                -22.29382918,
                <br />
                -15.82938212
              </span>
            </th>

            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center">
              <span className="text-[11px] md:text-xs text-cyan-600 border-b-2 border-cyan-600  hover:text-cyan-800 hover:border-cyan-800 transition-all cursor-pointer">
                View
              </span>
            </th>

            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center">
              <span className="text-[11px] md:text-xs text-cyan-600 border-b-2 border-cyan-600  hover:text-cyan-800 hover:border-cyan-800 transition-all cursor-pointer">
                Edit
              </span>
            </th>
            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center">
              <div className=" w-7 h-7 md:w-9 md:h-9 bg-damaged-normal hover:bg-opacity-40 transition-all cursor-pointer  bg-opacity-30 rounded-full flex items-center justify-center">
                <BsTrash className="h-3 w-3 md:w-4 md:h-4 text-damaged-dark" />
              </div>
            </th>
          </tr>

          <tr className="w-full flex items-center justify-evenly whitespace-nowrap gap-x-14 md:gap-x-16 px-8  text-[9px] md:text-[10px] h-14 bg-[#333] bg-opacity-10 ">
            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <div className="w-6 h-6 border border-[#333] rounded-full flex items-center justify-center">
                <AiOutlineUser className="w-3 h-3" />
              </div>
              <span>Aaron Smith</span>
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span>Section Inspection</span>
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span>Jan 01 2023</span>
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span>
                -22.29382918,
                <br />
                -15.82938212
              </span>
            </th>

            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center">
              <span className="text-[11px] md:text-xs text-cyan-600 border-b-2 border-cyan-600  hover:text-cyan-800 hover:border-cyan-800 transition-all cursor-pointer">
                View
              </span>
            </th>

            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center">
              <span className="text-[11px] md:text-xs text-cyan-600 border-b-2 border-cyan-600  hover:text-cyan-800 hover:border-cyan-800 transition-all cursor-pointer">
                Edit
              </span>
            </th>
            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center">
              <div className=" w-7 h-7 md:w-9 md:h-9 bg-damaged-normal hover:bg-opacity-40 transition-all cursor-pointer  bg-opacity-30 rounded-full flex items-center justify-center">
                <BsTrash className="h-3 w-3 md:w-4 md:h-4 text-damaged-dark" />
              </div>
            </th>
          </tr>

          <tr className="w-full flex items-center justify-evenly whitespace-nowrap gap-x-14 md:gap-x-16 px-8  text-[9px] md:text-[10px] h-14 bg-white ">
            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <div className="w-6 h-6 border border-[#333] rounded-full flex items-center justify-center">
                <AiOutlineUser className="w-3 h-3" />
              </div>
              <span>Aaron Smith</span>
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span>Section Inspection</span>
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span>Jan 01 2023</span>
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span>
                -22.29382918,
                <br />
                -15.82938212
              </span>
            </th>

            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center">
              <span className="text-[11px] md:text-xs text-cyan-600 border-b-2 border-cyan-600  hover:text-cyan-800 hover:border-cyan-800 transition-all cursor-pointer">
                View
              </span>
            </th>

            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center">
              <span className="text-[11px] md:text-xs text-cyan-600 border-b-2 border-cyan-600  hover:text-cyan-800 hover:border-cyan-800 transition-all cursor-pointer">
                Edit
              </span>
            </th>
            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center">
              <div className=" w-7 h-7 md:w-9 md:h-9 bg-damaged-normal hover:bg-opacity-40 transition-all cursor-pointer  bg-opacity-30 rounded-full flex items-center justify-center">
                <BsTrash className="h-3 w-3 md:w-4 md:h-4 text-damaged-dark" />
              </div>
            </th>
          </tr>

          <tr className="w-full flex items-center justify-evenly whitespace-nowrap gap-x-14 md:gap-x-16 px-8  text-[9px] md:text-[10px] h-14 bg-[#333] bg-opacity-10 ">
            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <div className="w-6 h-6 border border-[#333] rounded-full flex items-center justify-center">
                <AiOutlineUser className="w-3 h-3" />
              </div>
              <span>Aaron Smith</span>
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span>Section Inspection</span>
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span>Jan 01 2023</span>
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span>
                -22.29382918,
                <br />
                -15.82938212
              </span>
            </th>

            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center">
              <span className="text-[11px] md:text-xs text-cyan-600 border-b-2 border-cyan-600  hover:text-cyan-800 hover:border-cyan-800 transition-all cursor-pointer">
                View
              </span>
            </th>

            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center">
              <span className="text-[11px] md:text-xs text-cyan-600 border-b-2 border-cyan-600  hover:text-cyan-800 hover:border-cyan-800 transition-all cursor-pointer">
                Edit
              </span>
            </th>
            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center">
              <div className=" w-7 h-7 md:w-9 md:h-9 bg-damaged-normal hover:bg-opacity-40 transition-all cursor-pointer  bg-opacity-30 rounded-full flex items-center justify-center">
                <BsTrash className="h-3 w-3 md:w-4 md:h-4 text-damaged-dark" />
              </div>
            </th>
          </tr>

          <tr className="w-full flex items-center justify-evenly whitespace-nowrap gap-x-14 md:gap-x-16 px-8  text-[9px] md:text-[10px] h-14 bg-white ">
            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <div className="w-6 h-6 border border-[#333] rounded-full flex items-center justify-center">
                <AiOutlineUser className="w-3 h-3" />
              </div>
              <span>Aaron Smith</span>
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span>Section Inspection</span>
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span>Jan 01 2023</span>
            </th>

            <th className="flex items-center gap-x-2 w-36 md:w-40 justify-center">
              <span>
                -22.29382918,
                <br />
                -15.82938212
              </span>
            </th>

            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center">
              <span className="text-[11px] md:text-xs text-cyan-600 border-b-2 border-cyan-600  hover:text-cyan-800 hover:border-cyan-800 transition-all cursor-pointer">
                View
              </span>
            </th>

            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center">
              <span className="text-[11px] md:text-xs text-cyan-600 border-b-2 border-cyan-600  hover:text-cyan-800 hover:border-cyan-800 transition-all cursor-pointer">
                Edit
              </span>
            </th>
            <th className="flex items-center gap-x-2 w-8 md:w-10 justify-center">
              <div className=" w-7 h-7 md:w-9 md:h-9 bg-damaged-normal hover:bg-opacity-40 transition-all cursor-pointer  bg-opacity-30 rounded-full flex items-center justify-center">
                <BsTrash className="h-3 w-3 md:w-4 md:h-4 text-damaged-dark" />
              </div>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ReportsListTable;
