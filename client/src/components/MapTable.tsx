import moment from "moment";
import React from "react";
import { useIndexMapStore } from "../store/IndexMapStore";

// @ts-ignore: Unreachable code error
import { boxShadowSlight } from "../utils/shadow";

interface MapState {
  paddock: string;
  piezo: string;
  date: string;
}

interface MapTableProps {
  
  mapState: MapState;
  piezoListDisplay: string[];
  refreshMap:()=>void
  changeMapType: (type: string) => void;
}

function MapTable({
  refreshMap,
  mapState,


  changeMapType,
}: MapTableProps) {
  

  const changeStatus = useIndexMapStore(s=>s.changeStatus)
  const changePaddock = useIndexMapStore(s=>s.changePaddock)
  const changePiezo = useIndexMapStore(s=>s.changePiezo)
  const changeDate = useIndexMapStore(s=>s.changeDate)
  const piezoListDisplay = useIndexMapStore(s=>s.piezoList)

  return (
    <div className="mt-16 2xl:mt-20">
      <div
        // onSubmit={handleSubmit}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 p-4 sm:px-8 md:px-4  gap-x-4 gap-y-10 rounded-[18px] "
        style={{ boxShadow: boxShadowSlight }}
      >
        <div className="font-semibold text-lg 2xl:text-2xl">Locations</div>
        <div>
          <select
            onChange={e=>{changePaddock(e.target.value);refreshMap()}}
            value={mapState.paddock}
            name="paddock"
            id="paddock"
            className="pb-2 border-b-2 border-bluePrimary focus:border-orangeSecondary 2xl:text-xl"
          >
            <option value="All">All</option>
            <option value="CDIII">CDIII</option>
            <option value="CROWN">CROWN</option>
            <option value="E1/E2">E1/E2</option>
            <option value="RDS">RDS</option>
            <option value="SILT-TRAP">SILT-TRAP</option>
            <option value="Y1/Y2">Y1/Y2</option>
            <option value="Y3">Y3</option>
            <option value="Z1">Z1</option>
          </select>
        </div>

        <div>
          <select
            name="piezo"
            value={mapState.piezo}
            id="piezo"
            onChange={e=>{changePiezo(e.target.value);refreshMap()}}
            className="pb-2 border-b-2 border-bluePrimary focus:border-orangeSecondary 2xl:text-xl"
          >
            
            {piezoListDisplay.map((piezo:string) => (
              <option key={piezo} value={piezo}>
                {piezo}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-x-4 ">
          <input
            type="date"
            value={mapState.date}
            onChange={e=>{
              console.log("CHANGING", e.target.value)
              changeDate(moment(e.target.value).format("YYYY-MM-DD"));refreshMap()}}
            name="date"
            id="date"
            className="pb-2 border-b-2 border-bluePrimary focus:outline-none focus:border-orangeSecondary 2xl:text-xl "
          />
        </div>

        <div className="col-span-2 sz450:col-span-1">
          <button
            
            className="px-4 py-2 bg-orangeSecondary rounded-[14px] bg-opacity-90 text-white text-lg font-semibold 2xl:text-xl w-full sz450:w-max"
          >
            Apply filters
          </button>
        </div>
      </div>
    </div>
  );
}

export default MapTable;
