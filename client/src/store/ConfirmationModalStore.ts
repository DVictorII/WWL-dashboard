import { create } from "zustand";

interface ConfirmationModalStoreState {
  // LOG OUT CONFIRMATION MODAL
  logOutModalIsOpen: boolean;
  openLogOutModal: () => void;
  closeLogOutModal: () => void;

  // DELETE PIEZO REPORT CONFIRMATION MODAL
  deletePiezoReportModalIsOpen: boolean;
  openDeletePiezoReportModal: (id: string) => void;
  closeDeletePiezoReportModal: () => void;
  reportPiezoIDToDelete: string;

  // DELETE INCIDENT REPORT CONFIRMATION MODAL
  deleteIncidentReportModalIsOpen: boolean;
  openDeleteIncidentReportModal: (id: string) => void;
  closeDeleteIncidentReportModal: () => void;
  incidentPiezoIDToDelete: string;
}

export const useConfirmationModalStore = create<ConfirmationModalStoreState>(
  (set) => ({
    // LOG OUT CONFIRMATION MODAL
    logOutModalIsOpen: false,

    openLogOutModal: () =>
      set((state) => ({ ...state, logOutModalIsOpen: true })),
    closeLogOutModal: () =>
      set((state) => ({ ...state, logOutModalIsOpen: false })),

    // DELETE PIEZO REPORT CONFIRMATION MODAL

    deletePiezoReportModalIsOpen: false,
    reportPiezoIDToDelete: "",
    openDeletePiezoReportModal: (id) =>
      set((state) => ({
        ...state,
        deletePiezoReportModalIsOpen: true,
        reportPiezoIDToDelete: id,
      })),
    closeDeletePiezoReportModal: () =>
      set((state) => ({
        ...state,
        deletePiezoReportModalIsOpen: false,
        reportPiezoIDToDelete: "",
      })),

    // DELETE INCIDENT REPORT CONFIRMATION MODAL

    deleteIncidentReportModalIsOpen: false,
    incidentPiezoIDToDelete: "",
    openDeleteIncidentReportModal: (id) =>
      set((state) => ({
        ...state,
        deleteIncidentReportModalIsOpen: true,
        incidentPiezoIDToDelete: id,
      })),
    closeDeleteIncidentReportModal: () =>
      set((state) => ({
        ...state,
        deleteIncidentReportModalIsOpen: false,
        incidentPiezoIDToDelete: "",
      })),
  })
);
