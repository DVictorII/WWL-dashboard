import Select from "react-tailwindcss-select";
import { useBiannualVisitStateStore } from "../../store/BiannualVisitStateStore";

function BVisitSelector() {
  const updateVisitID = useBiannualVisitStateStore(
    (state) => state.updateVisitID
  );

  const options = [
    { value: "1", label: "Biannual Review - 360 Photos - May 2022" },
  ];

  return (
    <div className="flex flex-col  gap-y-1 ">
      <span className="text-[10px] xl:text-xs 2xl:text-sm font-bold text-[#555] justify-self-end">
        Selected visit
      </span>

      <div className="sz500:col-span-3 md:col-span-2">
        <Select
          primaryColor="orange"
          value={{
            value: "1",
            label: "Biannual Review - 360 Photos - May 2022",
            disabled: false,
          }}
          //@ts-ignore
          onChange={(e) => updateVisitID(e.value)}
          options={options}
          classNames={{
            //@ts-ignore
            menuButton: ({ isDisabled }) =>
              `flex text-xs sm:text-sm text-gray-500 border border-[#dfdfdf] shadow-sm  rounded-lg h-10 2xl:h-12 items-center   transition-all duration-300 focus:outline-none ${
                isDisabled
                  ? "bg-gray-200"
                  : "text-sm bg-[#f5f5f5] text-[#333] font-semibold focus:border-orange-500 focus:border-opacity-50"
              }`,
          }}
        />
      </div>
    </div>
  );
}

export default BVisitSelector;
