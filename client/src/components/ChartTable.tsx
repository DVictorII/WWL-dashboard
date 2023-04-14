import React from "react";
import { useChartStore } from "../store/ChartStateStore";
// @ts-ignore: Unreachable code error
import { boxShadow, boxShadowSlight } from "../utils/shadow";

interface ChartState {
  paddock: string;
  piezo: string;
  days: number;
}

interface ChartTableProps {
  // handleChange: (
  //   e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  // ) => void;
  chartState: ChartState;
  piezoListDisplay: string[];
  displayingDate: boolean;

}

function ChartTable({
  
  chartState,
  piezoListDisplay,
 
  displayingDate,
  
}: ChartTableProps) {
  // const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   e.preventDefault();
  //   e.stopPropagation();
    
  // };

  const changePaddock = useChartStore(s=>s.changePaddock)
  const changePiezo = useChartStore(s=>s.changePiezo)
  const changeDays = useChartStore(s=>s.changeDays)

  const changeTable = useChartStore(s=>s.changeTable)

  return (
    <div className="mt-16 2xl:mt-20">
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 p-4 sm:px-8 md:px-4 2xl:p-8  gap-x-4 gap-y-10 rounded-[18px] shadow-sm "
        
      >
        <div className="font-semibold text-lg 2xl:text-2xl">Locations</div>
        <div>
          <select
            onChange={(e)=> {
              
              changeTable(e.target.value)
            }}
            value={chartState.paddock}
            name="paddock"
            id="paddock"
            className="pb-2 border-b-2 border-all focus:border-orange-500 2xl:text-xl"
          >
            <option value="CDIII">CDIII</option>
            <option value="CROWN">CROWN</option>
            <option value="E1-E2">E1/E2</option>
            <option value="RDS">RDS</option>
            <option value="SILT-TRAP">SILT-TRAP</option>
            <option value="Y1-Y2">Y1/Y2</option>
            <option value="Y3">Y3</option>
            <option value="Z1">Z1</option>
          </select>
        </div>

        <div>
          <select
            name="piezo"
            value={chartState.piezo}
            id="piezo"
            onChange={(e)=> changePiezo(e.target.value)}
            className="pb-2 border-b-2 border-all focus:border-orange-500 2xl:text-xl"
          >
            {piezoListDisplay.map((piezo) => (
              <option key={piezo} value={piezo}>
                {piezo}
              </option>
            ))}
          </select>
        </div>

        {displayingDate ? (
          <div className="flex gap-x-4 items-center">
            <span className="2xl:text-lg">Last</span>
            <input
              type="number"
              value={chartState.days}
              onChange={(e)=> changeDays(Number(e.target.value))}
              name="days"
              className="pb-1 border-b-2 border-all focus:outline-none focus:border-orange-500 2xl:text-xl w-14 2xl:w-20"
            />
            <span className="2xl:text-lg">days</span>
          </div>
        ) : null}

        
          <button
            // onClick={handleSubmit}
            className="px-4 py-2 bg-orange-500 rounded-[14px] bg-opacity-90 text-white text-lg font-semibold 2xl:text-xl w-full sz450:w-max"
          >
            Apply filters
          </button>
        
      </div>
    </div>
  );
}

export default ChartTable;
