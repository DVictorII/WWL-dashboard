import React from "react";
import { IoSaveOutline } from "react-icons/io5";

// @ts-ignore: Unreachable code error
import { boxShadowSlight } from "../utils/shadow";
import landscape from "../assets/loginLandscape.jpg";

interface IncidentState {
  photo: File | undefined;
  title: string;
  paddock: string;
  date: string;

  latitude: number;
  longitude: number;
  elevation: number;
  description: string;

  supervisor2: string;
  supervisor3: string;
}
interface IncidentReportFormProps {
  handleChange: (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => void;
  incidentState: IncidentState;
  handlePhotoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function IncidentReportForm({
  handleChange,
  handleSubmit,
  incidentState,
  handlePhotoChange,
}: IncidentReportFormProps) {
  return (
    <form
      encType="multipart/form-data"
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-16"
    >
      <fieldset className="flex flex-col  gap-y-2  ">
        <label htmlFor="photo" className="font-semibold text-lg 2xl:text-2xl">
          Upload photo:
        </label>
        <div
          className="relative w-full h-64 rounded-[14px] overflow-hidden flex justify-center items-center bg-cover"
          style={{
            boxShadow: boxShadowSlight,
            backgroundImage: `url("/img/Rossing.jpg")`,
          }}
        >
          <div className="bg-stone-900 bg-opacity-80 absolute top-0 left-0 w-full h-full" />
          <input
            type="file"
            accept="image/*"
            name="photo"
            id="photo"
            onChange={(e) => {
              handlePhotoChange(e);
            }}
            className="z-10 text-white text-xs sm:text-base 2xl:text-lg file:px-4 file:py-1 file:rounded-md file:border-none file:mr-4 "
          />
        </div>
      </fieldset>

      <fieldset className="flex flex-col  gap-y-2  ">
        <label htmlFor="title" className="font-semibold text-lg 2xl:text-2xl">
          Title:
        </label>
        <input
          name="title"
          value={incidentState.title}
          onChange={handleChange}
          className="font-semibold px-4 py-3 2xl:px-6 2xl:py-4 2xl:text-xl rounded-[14px] border-2 border-[#cedae7] w-full focus:border-bluePrimary focus:outline-none"
          type="text"
          placeholder="Incident title..."
          required
        />
      </fieldset>

      <div className="flex flex-col gap-y-12">
        <h2 className="font-semibold text-lg 2xl:text-2xl">
          Incident location:
        </h2>

        <div className="flex  flex-wrap gap-x-8 gap-y-8 ">
          <fieldset className="flex flex-col gap-y-2 flex-grow  w-full  sm:w-max sm:justify-start gap-x-4">
            <label
              className="text-sm font-semibold 2xl:text-base"
              htmlFor="paddock"
            >
              Paddock section
            </label>
            <select
              value={incidentState.paddock}
              onChange={handleChange}
              name="paddock"
              id="paddock"
              className="font-semibold flex-grow px-4 py-3 2xl:px-6 2xl:py-4 2xl:text-xl rounded-[14px] border-2 border-[#cedae7]  focus:border-bluePrimary focus:outline-none"
            >
              <option value="CDIII">CDIII</option>
              <option value="CROWN">CROWN</option>
              <option value="E1/E2">E1/E2</option>
              <option value="RDS">RDS</option>
              <option value="SILT-TRAP">SILT-TRAP</option>
              <option value="Y1/Y2">Y1/Y2</option>
              <option value="Y3">Y3</option>
              <option value="Z1">Z1</option>
            </select>
          </fieldset>

          <fieldset className="flex flex-col gap-y-2 flex-grow  w-full  sm:w-max sm:justify-start gap-x-4">
            <label
              className="text-sm font-semibold 2xl:text-base"
              htmlFor="date"
            >
              Report date
            </label>
            <input
              name="date"
              value={incidentState.date}
              onChange={handleChange}
              type="date"
              className="font-semibold flex-grow px-4 py-3 2xl:px-6 2xl:py-4 2xl:text-xl rounded-[14px] border-2 border-[#cedae7]  focus:border-bluePrimary focus:outline-none"
              required
            />
          </fieldset>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 ">
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="latitude"
              className="text-sm font-semibold 2xl:text-base"
            >
              Latitude
            </label>
            <div className="relative  ">
              <span className="absolute top-4 right-4">°</span>
              <input
                value={incidentState.latitude}
                onChange={handleChange}
                type="number"
                id="latitude"
                name="latitude"
                placeholder="latitude"
                className="font-semibold w-full px-4 py-3 2xl:px-6 2xl:py-4 2xl:text-xl rounded-[14px] border-2 border-[#cedae7]  focus:border-bluePrimary focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="longitude"
              className="text-sm font-semibold 2xl:text-base"
            >
              Longitude
            </label>
            <div className="relative">
              <span className="absolute top-4 right-4">°</span>
              <input
                value={incidentState.longitude}
                onChange={handleChange}
                name="longitude"
                id="longitude"
                type="number"
                placeholder="longitude"
                className="font-semibold w-full px-4 py-3 2xl:px-6 2xl:py-4 2xl:text-xl rounded-[14px] border-2 border-[#cedae7]  focus:border-bluePrimary focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="Elevation"
              className="text-sm font-semibold 2xl:text-base"
            >
              Elevation
            </label>
            <div className="relative  ">
              <span className="absolute top-4 right-4">m</span>
              <input
                value={incidentState.elevation}
                onChange={handleChange}
                type="number"
                name="elevation"
                id="elevation"
                placeholder="elevation"
                className="font-semibold w-full px-4 py-3 2xl:px-6 2xl:py-4 2xl:text-xl rounded-[14px] border-2 border-[#cedae7]  focus:border-bluePrimary focus:outline-none"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <fieldset className="flex flex-col  gap-y-2  mt-4 ">
        <label
          className="font-semibold text-lg 2xl:text-2xl"
          htmlFor="description"
        >
          Description:
        </label>
        <textarea
          value={incidentState.description}
          onChange={handleChange}
          className="font-semibold px-4 w-full py-2 2xl:px-6 2xl:py-4 2xl:text-xl rounded-[14px] border-2 border-[#cedae7]  focus:border-bluePrimary focus:outline-none"
          name="description"
          id="description"
          placeholder="Report description..."
          cols={30}
          rows={5}
          required
        ></textarea>
      </fieldset>

      <div>
        <h2 className="font-semibold text-lg 2xl:text-2xl">
          Supervisors Email:
        </h2>

        <p className="mt-4 text-sm 2xl:text-base">
          These emails will receive a detailed report of the incident
        </p>

        <div className="mt-10 flex flex-col gap-y-8">
          <fieldset className="flex gap-x-8 items-center">
            <label
              htmlFor="sup1"
              className="shrink-0 font-semibold 2xl:text-xl"
            >
              Supervisor 1
            </label>
            <span className="px-4 w-full py-2 2xl:px-6 2xl:py-4 2xl:text-xl rounded-[14px] font-medium ">
              rugaz@wwlengineering.com
            </span>
          </fieldset>

          <fieldset className="flex gap-x-8 items-center ">
            <label
              htmlFor="supervisor2"
              className="shrink-0 font-semibold 2xl:text-xl"
            >
              Supervisor 2
            </label>

            <input
              value={incidentState.supervisor2}
              onChange={handleChange}
              type="text"
              name="supervisor2"
              id="supervisor2"
              className="font-semibold px-4 w-full py-2 2xl:px-6 2xl:py-4 2xl:text-xl rounded-[14px] border-2 border-[#cedae7]  focus:border-bluePrimary focus:outline-none"
              required
            />
          </fieldset>

          <fieldset className="flex gap-x-8 items-center">
            <label
              htmlFor="supervisor3"
              className="shrink-0 font-semibold 2xl:text-xl"
            >
              Supervisor 3
            </label>

            <input
              value={incidentState.supervisor3}
              onChange={handleChange}
              type="text"
              name="supervisor3"
              id="supervisor3"
              className="font-semibold px-4 w-full py-2 2xl:px-6 2xl:py-4 2xl:text-xl rounded-[14px] border-2 border-[#cedae7]  focus:border-bluePrimary focus:outline-none"
            />
          </fieldset>
        </div>
      </div>

      <button className=" self-center w-full sm:w-1/2 py-4 2xl:py-5 bg-[#333] rounded-[14px] text-white font-semibold text-xl 2xl:text-3xl flex items-center justify-center gap-x-3">
        <IoSaveOutline className="w-6 h-6 2xl:w-8 2xl:h-8" />
        <span>Save</span>
      </button>
    </form>
  );
}

export default IncidentReportForm;
