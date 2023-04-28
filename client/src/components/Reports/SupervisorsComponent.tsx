import React from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { useNewPiezoReportStateStore } from "../../store/NewPiezoReportStateStore";

function SupervisorsComponent() {
  const supervisors = useNewPiezoReportStateStore((state) => state.supervisors);

  const addSupervisor = useNewPiezoReportStateStore(
    (state) => state.addSupervisor
  );
  const deleteSupervisor = useNewPiezoReportStateStore(
    (state) => state.deleteSupervisor
  );
  const changeSupervisor = useNewPiezoReportStateStore(
    (state) => state.changeSupervisor
  );

  return (
    <div className="mt-12 flex flex-col gap-y-6">
      {supervisors.length > 0 ? (
        <div className="flex flex-col gap-y-8 w-full md:w-3/4 lg:w-1/2">
          {supervisors.map((sup, i) => (
            <div
              key={i}
              className="flex items-start gap-x-8 flex-wrap gap-y-4 "
            >
              <span className="text-sm font-semibold">Supervisor {i + 1}:</span>

              <div className="flex items-center gap-x-8 grow">
                <input
                  type="text"
                  name="supervisor"
                  value={sup}
                  onChange={(e) => changeSupervisor(i, e.target.value)}
                  placeholder="Supervisor Email..."
                  className="grow text-xs sm:text-sm bg-[#f9f9f9] text-[#333] font-medium placeholder:text-gray-300 px-3 h-10 2xl:h-12 rounded-xl shadow-sm border border-gray-300 focus:outline-none focus:border-orange-500 focus:border-opacity-50 transition-all"
                />
                <div
                  onClick={() => deleteSupervisor(i)}
                  className="w-8 h-8 bg-damaged-light flex items-center justify-center rounded-full cursor-pointer"
                >
                  <BsTrash className="w-4 h-4 text-damaged-normal" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      <div>
        <div
          onClick={addSupervisor}
          className="w-8 h-8 2xl:w-10 2xl:h-10 bg-all-light flex items-center justify-center rounded-full cursor-pointer"
        >
          <AiOutlinePlus className="w-4 h-4 2xl:w-5 2xl:h-5" />
        </div>
      </div>
    </div>
  );
}

export default SupervisorsComponent;
