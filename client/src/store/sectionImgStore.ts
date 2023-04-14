import { create } from "zustand";

interface SectionImgStore {
  sectionImgIsOpen: boolean;
  imgURL:string | undefined;
  fullPageBarChartIsOpen:boolean;
  openSectionImg: (url:string) => void;
  closeSectionImg: () => void;

  openFullPageBarChart: () => void;
  closeFullPageBarChart: () => void;
}

export const useSectionImgStore = create<SectionImgStore>((set) => ({
  sectionImgIsOpen: false,
  fullPageBarChartIsOpen: false,
  imgURL:undefined,

  openSectionImg: (url:string) => {
    console.log("OPENING")
    return set((state) => ({ ...state, sectionImgIsOpen: true, imgURL: url}))},
  closeSectionImg: () =>
    {
        console.log("CLOSING")
        return set((state) => ({ ...state, sectionImgIsOpen: false, imgURL: undefined }))},

  openFullPageBarChart: () =>{
    return set((state) => ({ ...state, fullPageBarChartIsOpen: true }))
  },
  
    closeFullPageBarChart: () =>{
      return set((state) => ({ ...state,  fullPageBarChartIsOpen: false}))
    }
}));