

import Select from "react-tailwindcss-select";

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
    <div className='grid grid-cols-2 gap-x-8 xl:gap-x-10 z-[40]'>

        <div className='flex flex-col gap-y-1'>
            <h3 className='text-[10px] xl:text-xs  font-bold text-[#555]'>Paddock section</h3>

            <Select
                primaryColor='orange'
               
                value={{value: paddock, label: paddock, disabled: false} }
                //@ts-ignore
                onChange={(e)=>  changePaddock(e.value)}
                options={paddockOptions}
                //@ts-ignore
                classNames={{
                    //@ts-ignore
                    menuButton: ({ isDisabled }) =>
                      `flex text-xs sm:text-sm text-gray-500 border border-[#dfdfdf] shadow-sm  rounded-lg h-10 2xl:h-12 items-center   transition-all duration-300 focus:outline-none ${
                        isDisabled
                          ? "bg-gray-200"
                          : "bg-[#f5f5f5] text-[#333] font-semibold focus:border-orange-500 focus:border-opacity-50"
                      }`,
                  }}
            />

        </div>
        <div className='flex flex-col gap-y-1'>
            <h3 className='text-[10px] xl:text-xs  font-bold text-[#555]'>Piezometer ID</h3>

            <Select
                primaryColor='orange'
                //@ts-ignore
                value={{ value: piezo, label: piezo }}
                //@ts-ignore
                onChange={(e)=> changePiezo(e.value)}
                options={piezoOptions}

                //@ts-ignore
                classNames={{
                    //@ts-ignore
                    menuButton: ({ isDisabled }) =>
                      `flex text-xs sm:text-sm text-gray-500 border border-[#dfdfdf] shadow-sm  rounded-lg h-10 2xl:h-12 items-center   transition-all duration-300 focus:outline-none ${
                        isDisabled
                          ? "bg-gray-200"
                          : " bg-[#f5f5f5] text-[#333] font-semibold focus:border-orange-500 focus:border-opacity-50"
                      }`,
                  }}
            />

        </div>
    </div>
  )
}

export default LocationTable