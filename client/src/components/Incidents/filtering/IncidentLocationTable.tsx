import React from 'react'
import { useNewIncidentReportStateStore } from '../../../store/NewIncidentReportStateStore';
import { chartPiezoList } from '../../../utils/piezoList';
import Select from 'react-tailwindcss-select';
import { TfiMapAlt } from 'react-icons/tfi';
import { toast } from 'react-hot-toast';

function IncidentLocationTable({refreshMap}:{refreshMap:()=>void}) {
  const paddock = useNewIncidentReportStateStore((state) => state.paddock);
  const latitude = useNewIncidentReportStateStore((state) => state.latitude);
  const longitude = useNewIncidentReportStateStore((state) => state.longitude);
  const elevation = useNewIncidentReportStateStore((state) => state.elevation);

  const changePaddock = useNewIncidentReportStateStore((state) => state.changePaddock);
  const changeLatitude = useNewIncidentReportStateStore((state) => state.changeLatitude);
  const changeLongitude = useNewIncidentReportStateStore((state) => state.changeLongitude);
  const changeElevation = useNewIncidentReportStateStore((state) => state.changeElevation);

  const paddockOptions = Object.keys(chartPiezoList).map((paddock) => {
    return { value: paddock, label: paddock };
  });

  
  return (
    <div className="flex flex-col gap-y-8 ">
      <div className="flex flex-col sz500:w-4/5 md:w-5/6 lg:w-full sz500:self-center sz500:grid sz500:grid-cols-4 md:grid-cols-3  gap-y-1 sz500:gap-y-8 gap-x-8">
        <span className="text-[10px] xl:text-xs 2xl:text-sm font-bold text-[#555] justify-self-end">
          Paddock section
        </span>

        <div className="sz500:col-span-3 md:col-span-2">
          <Select
            primaryColor="orange"
            value={{ value: paddock, label: paddock, disabled: false }}
            //@ts-ignore
            onChange={(e) => changePaddock(e.value)}
            options={paddockOptions}
            classNames={{
              //@ts-ignore
              menuButton: ({ isDisabled }) =>
                `flex text-sm text-gray-500 border border-[#dfdfdf] shadow-sm  rounded-lg h-10 2xl:h-12 items-center   transition-all duration-300 focus:outline-none ${
                  isDisabled
                    ? "bg-gray-200"
                    : "text-sm bg-[#f5f5f5] text-[#333] font-semibold focus:border-orange-500 focus:border-opacity-50"
                }`,
            }}
          />
        </div>
      </div>
      <div className="flex flex-col sz500:w-4/5 md:w-5/6 lg:w-full sz500:self-center sz500:grid sz500:grid-cols-4 md:grid-cols-3  gap-y-1 sz500:gap-y-8 gap-x-8">
        <span className="text-[10px] xl:text-xs 2xl:text-sm font-bold text-[#555] justify-self-end">
          Latitude (°)
        </span>
        <input
          type="text"
          name="latitude"
          value={latitude}
          onChange={(e) => changeLatitude(e.target.value)}
          className="sz500:col-span-3 md:col-span-2 text-sm bg-[#f5f5f5] text-[#333] font-semibold placeholder:text-[#dfdfdf] px-3 h-10 2xl:h-12 rounded-lg shadow-sm border border-[#dfdfdf]  focus:outline-none focus:border-orange-500 focus:border-opacity-50 transition-all"
          placeholder="Latitude..."
        />
      </div>

      <div className="flex flex-col sz500:w-4/5 md:w-5/6 lg:w-full sz500:self-center sz500:grid sz500:grid-cols-4 md:grid-cols-3  gap-y-1 sz500:gap-y-8 gap-x-8">
        <span className="text-[10px] xl:text-xs 2xl:text-sm font-bold text-[#555] justify-self-end w-max">
          Longitude (°)
        </span>
        <input
          type="text"
          name="longitude"
          value={longitude}
          onChange={(e) => changeLongitude(e.target.value)}
          className="sz500:col-span-3 md:col-span-2 text-sm bg-[#f5f5f5] text-[#333] font-semibold placeholder:text-[#dfdfdf] px-3 h-10 2xl:h-12 rounded-lg shadow-sm border border-[#dfdfdf]  focus:outline-none focus:border-orange-500 focus:border-opacity-50 transition-all"
          placeholder="Longitude..."
        />
      </div>

      <button onClick={(e)=>{
        e.preventDefault()
        e.stopPropagation()

        refreshMap()
        toast.success('Incident position refreshed!', {
            style: {
                
                fontWeight: "500",
                border: "2px solid #65a30d",
                padding: "8px 16px",
                color: "#1c1917",
              },
          });
      }} className='flex items-center self-end gap-x-2 md:gap-x-3 lg:gap-x-4 px-4 py-2 bg-all-normal hover:bg-orange-800 transition-all text-white rounded-lg shadow-sm
      '>
        <TfiMapAlt className="w-4 h-4 "/>
        <span className='text-xs md:text-sm'>Check incident position</span>
      </button>

      <div className="flex flex-col sz500:w-4/5 md:w-5/6 lg:w-full sz500:self-center sz500:grid sz500:grid-cols-4 md:grid-cols-3  gap-y-1 sz500:gap-y-8 gap-x-8">
        <span className="text-[10px] xl:text-xs 2xl:text-sm font-bold text-[#555] justify-self-end w-max">
          Elevation (m)
        </span>
        <input
          type="text"
          name="elevation"
          value={elevation}
          onChange={(e) => changeElevation(e.target.value)}
          className="sz500:col-span-3 md:col-span-2 text-sm bg-[#f5f5f5] text-[#333] font-semibold placeholder:text-[#dfdfdf] px-3 h-10 2xl:h-12 rounded-lg shadow-sm border border-[#dfdfdf]  focus:outline-none focus:border-orange-500 focus:border-opacity-50 transition-all"
          placeholder="Elevation..."
        />
      </div>

      
    </div>
  )
}

export default IncidentLocationTable