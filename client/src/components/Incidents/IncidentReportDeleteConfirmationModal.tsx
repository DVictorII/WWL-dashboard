import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { deleteIncidentReport } from "../../utils/reportsMutations";
import { useConfirmationModalStore } from "../../store/ConfirmationModalStore";

function IncidentReportDeleteConfirmationModal() {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deleteIncidentReport, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      closeDeleteIncidentReportModal();
    },
  });

  const incidentPiezoIDToDelete = useConfirmationModalStore(
    (s) => s.incidentPiezoIDToDelete
  );

  const closeDeleteIncidentReportModal = useConfirmationModalStore(
    (s) => s.closeDeleteIncidentReportModal
  );

  const handleDelete = async () => {
    deleteMutation.mutate(incidentPiezoIDToDelete);
  };

  return (
    <div className="px-4 sm:px-0 fixed top-0 left-0 right-0 w-full h-screen z-[2000] flex justify-center items-center">
      <div
        className="bg-stone-900 bg-opacity-70 w-full h-full absolute left-0 top-0 cursor-pointer backdrop-blur-[2px]"
        onClick={closeDeleteIncidentReportModal}
      />

      <div className=" relative  w-full sm:w-2/3 lg:w-1/2 h-1/3 md:h-1/2 bg-white rounded-xl overflow-hidden flex flex-col ">
        <div className="w-full h-28 lg:h-32 2xl:h-36">
          <img
            src="/media/img/photos/Rossing_mine.jpg"
            alt="Rossing mine photo banner"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-y-6 md:gap-y-10 lg:gap-y-12 h-full justify-center items-center border-b-4 px-4 border-t-4 border-[#831B1B]">
          <div className="text-xl md:text-2xl font-semibold 2xl:text-3xl text-center">
            Are you sure you want delete this report?
          </div>

          <div className="flex gap-x-6 md:gap-x-8 lg:gap-x-10">
            <button
              onClick={handleDelete}
              className="px-8 lg:px-10 2xl:px-12 py-1 2xl:py-2  border-2 border-[#831B1B] text-white rounded-lg bg-[#831B1B] hover:bg-[#622323] transition-all text-lg xl:text-xl font-semibold"
            >
              Delete
            </button>
            <button
              onClick={closeDeleteIncidentReportModal}
              className="px-8 lg:px-10 2xl:px-12 py-1 2xl:py-2  border-2 border-[#333] text-[#333] rounded-lg bg-white hover:bg-[#333] hover:text-white transition-all text-lg xl:text-xl font-semibold"
            >
              Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IncidentReportDeleteConfirmationModal;
