
import React,{useState} from 'react'
import Select from "react-tailwindcss-select";
import { SelectValue } from 'react-tailwindcss-select/dist/components/type';
import { useMonitoringMapStateStore } from '../../../store/MonitoringMapStateStore';
import { mapPiezoList } from '../../../utils/piezoList';

const options = [
    { value: "fox", label: "🦊 Fox" },
    { value: "Butterfly", label: "🦋 Butterfly" },
    { value: "Honeybee", label: "🐝 Honeybee" }
];



function LocationTable() {

    const piezoList = useMonitoringMapStateStore((state) => state.piezoList);
    const paddock = useMonitoringMapStateStore((state) => state.paddock);
    const piezo = useMonitoringMapStateStore((state) => state.piezo);

    const changePaddock = useMonitoringMapStateStore((state) => state.changePaddock);
    const changePiezo = useMonitoringMapStateStore((state) => state.changePiezo);


    const paddockOptions = Object.keys(mapPiezoList).map((paddock)=>{
        return { value: paddock, label: paddock }
    })
    
    const piezoOptions = piezoList.map((piezo)=>{
        return { value: piezo, label: piezo }
    })



  return (
    <div className='grid grid-cols-2 gap-x-8 xl:gap-x-10'>

        <div className='flex flex-col gap-y-1'>
            <h3 className='text-xs font-semibold'>Paddock section</h3>

            <Select
                primaryColor='orange'
               
                value={{value: paddock, label: paddock, disabled: false} }
                //@ts-ignore
                onChange={(e)=>  changePaddock(e.value)}
                options={paddockOptions}
                //@ts-ignore
                classNames={{menuButton: ({ isDisabled }) => (
                    `flex text-sm text-gray-500 border border-gray-300 rounded-xl py-1 shadow-sm  transition-all duration-300 focus:outline-none ${
                        isDisabled
                            ? "bg-gray-200"
                            : "bg-white hover:border-gray-400 focus:border-[#F97316] focus:ring focus:ring-[#F97316]/20"
                    }`
                ),}}
            />

        </div>
        <div className='flex flex-col gap-y-1'>
            <h3 className='text-xs font-semibold'>Piezometer ID</h3>

            <Select
                primaryColor='orange'
                //@ts-ignore
                value={{ value: piezo, label: piezo }}
                //@ts-ignore
                onChange={(e)=> changePiezo(e.value)}
                options={piezoOptions}

                //@ts-ignore
                classNames={{menuButton: ({ isDisabled }) => (
                    `flex text-sm text-gray-500 border border-gray-300 rounded-xl py-1 shadow-sm  transition-all duration-300 focus:outline-none ${
                        isDisabled
                            ? "bg-gray-200"
                            : "bg-white hover:border-gray-400 focus:border-[#F97316] focus:ring focus:ring-[#F97316]/20"
                    }`
                ),}}
            />

        </div>
    </div>
  )
}

export default LocationTable