import React from "react";
import { BsArrowDownUp } from "react-icons/bs";
import { monitoringMapStatusInfo } from "../../utils/monitoringMapStatusInfo";
import { useMonitoringMapStateStore } from "../../store/MonitoringMapStateStore";
import { useQuery } from "react-query";
import { fetchLastReadings, fetchPiezometersData } from "../../utils/map";

function PiezoListTable() {
  const status = useMonitoringMapStateStore((s) => s.status);
  //@ts-ignore
  const selectedStatus = monitoringMapStatusInfo[status];

  const paddock = useMonitoringMapStateStore((s) => s.paddock);
  const piezo = useMonitoringMapStateStore((s) => s.piezo);

  const { isLoading: piezometersAreLoading, data: piezometersData } = useQuery(
    "piezometers",
    fetchPiezometersData,
    {
      refetchOnWindowFocus: false,
    }
  );

  const { isLoading: lastReadingsAreLoading, data: lastReadings } = useQuery(
    "last_readings",
    fetchLastReadings,
    {
      refetchOnWindowFocus: false,
    }
  );

  //@ts-ignore
  const filterPiezometers = (fullPiezoList) => {
    let filtered = [];

    if (status === 0 || status === 6) {
      if (paddock === "All") {
        filtered = fullPiezoList;
      } else {
        if (piezo === "All") {
          //@ts-ignore
          filtered = fullPiezoList.filter((p) => p.paddock === paddock);
        } else {
          filtered = fullPiezoList.filter(
            //@ts-ignore
            (p) => p.paddock === paddock && p.id === piezo
          );
        }
      }
    } else {
      if (paddock === "All") {
        //@ts-ignore
        filtered = fullPiezoList.filter((p) => p.status == status);
      } else {
        filtered = fullPiezoList.filter(
          //@ts-ignore
          (p) => p.status == status && p.paddock === paddock
        );
      }
    }

    return filtered;
  };

  const filteredPiezoList = filterPiezometers(piezometersData);

  if (piezometersAreLoading || !filteredPiezoList || lastReadingsAreLoading)
    return <h1>Loading...</h1>;

  return (
    <div
      style={{
        borderColor: selectedStatus.darkColor,
      }}
      className={`max-w-[1000vh] h-[24rem] overflow-x-auto rounded-lg border-2 bg-white`}
    >
      <table className="   select-none w-full border-collapse bg-white">
        <thead>
          <tr
            style={{
              backgroundColor: selectedStatus.darkColor,
            }}
            className={`w-full flex items-center px-8 whitespace-nowrap  gap-x-16 justify-evenly   text-xs h-12  font-medium text-white`}
          >
            <th className="flex items-center gap-x-2 w-20 justify-center ">
              <span>VW-YB-01</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center">
              <span>Paddock</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center">
              <span>Section</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th className="flex items-center gap-x-2 w-28 justify-center">
              <span>Coordinates</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th className="flex items-center gap-x-2 w-20 justify-center">
              <span>Depth</span>
              <BsArrowDownUp className="w-2" />
            </th>

            <th className="flex items-center gap-x-2 w-28 justify-center">
              <span>Current PWP</span>
              <BsArrowDownUp className="w-2" />
            </th>
          </tr>
        </thead>

        <tbody className="bg-white">
          {
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
                  style={{
                    backgroundColor:
                      i % 2 === 0 ? selectedStatus.lightColor : "#fff",
                  }}
                  className="w-full flex items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12  "
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
          }
          {/* <tr className='w-full flex items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12 bg-white '>
                <th className='flex items-center gap-x-2 w-20 justify-center'>
                <span>VW-YB-01</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-20 justify-center'>
                <span>Y1/Y2</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-20 justify-center'>
                <span>Section-17</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-28 justify-center'>
                <span>-22.29382918,<br/>
    -15.82938212</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-20 justify-center'>
                <span>14.0 m</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-28 justify-center'>
                <span className="text-2xl">-</span>
                    
                </th>
                
                
                
                
            </tr>




            <tr style={{
                backgroundColor:selectedStatus.lightColor,
            }} className={`w-full flex items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12  bg-opacity-30  `}>
                <th className='flex items-center gap-x-2 w-20 justify-center'>
                <span>VW-YB-01</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-20 justify-center'>
                <span>Y1/Y2</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-20 justify-center'>
                <span>Section-17</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-28 justify-center'>
                <span>-22.29382918,<br/>
    -15.82938212</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-20 justify-center'>
                <span>14.0 m</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-28 justify-center'>
                <span className="text-2xl">-</span>
                    
                </th>
                
                
                
                
            </tr>




            <tr className='w-full flex items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12 bg-white  '>
                <th className='flex items-center gap-x-2 w-20 justify-center'>
                <span>VW-YB-01</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-20 justify-center'>
                <span>Y1/Y2</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-20 justify-center'>
                <span>Section-17</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-28 justify-center'>
                <span>-22.29382918,<br/>
    -15.82938212</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-20 justify-center'>
                <span>14.0 m</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-28 justify-center'>
                <span className="text-2xl">-</span>
                    
                </th>
                
                
                
                
            </tr>





            <tr style={{
                backgroundColor:selectedStatus.lightColor,
            }} className={`w-full flex items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12  bg-opacity-30  `}>
                <th className='flex items-center gap-x-2 w-20 justify-center'>
                <span>VW-YB-01</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-20 justify-center'>
                <span>Y1/Y2</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-20 justify-center'>
                <span>Section-17</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-28 justify-center'>
                <span>-22.29382918,<br/>
    -15.82938212</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-20 justify-center'>
                <span>14.0 m</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-28 justify-center'>
                <span className="text-2xl">-</span>
                    
                </th>
                
                
                
                
            </tr>





            <tr className='w-full flex items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12 bg-white  '>
                <th className='flex items-center gap-x-2 w-20 justify-center'>
                <span>VW-YB-01</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-20 justify-center'>
                <span>Y1/Y2</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-20 justify-center'>
                <span>Section-17</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-28 justify-center'>
                <span>-22.29382918,<br/>
    -15.82938212</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-20 justify-center'>
                <span>14.0 m</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-28 justify-center'>
                <span className="text-2xl">-</span>
                    
                </th>
                
                
                
                
            </tr>





            <tr style={{
                backgroundColor:selectedStatus.lightColor,
            }} className={`w-full flex items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12  bg-opacity-30  `}>
                <th className='flex items-center gap-x-2 w-20 justify-center'>
                <span>VW-YB-01</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-20 justify-center'>
                <span>Y1/Y2</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-20 justify-center'>
                <span>Section-17</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-28 justify-center'>
                <span>-22.29382918,<br/>
    -15.82938212</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-20 justify-center'>
                <span>14.0 m</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-28 justify-center'>
                <span className="text-2xl">-</span>
                    
                </th>
                
                
                
                
            </tr>





            <tr className='w-full flex items-center whitespace-nowrap gap-x-16 px-8 text-[10px] h-12 bg-white  '>
                <th className='flex items-center gap-x-2 w-20 justify-center'>
                <span>VW-YB-01</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-20 justify-center'>
                <span>Y1/Y2</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-20 justify-center'>
                <span>Section-17</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-28 justify-center'>
                <span>-22.29382918,<br/>
    -15.82938212</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-20 justify-center'>
                <span>14.0 m</span>
                    
                </th>

                <th className='flex items-center gap-x-2 w-28 justify-center'>
                <span className="text-2xl">-</span>
                    
                </th>
                
                
                
                
            </tr> */}
        </tbody>
      </table>
    </div>
  );
}

export default PiezoListTable;
