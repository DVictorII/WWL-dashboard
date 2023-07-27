import React, { useState } from "react";
import Select from "react-tailwindcss-select";

function StockSelector() {
  const [stock, setStock] = useState("Rossing");

  const stockOptions = [
    {
      value: "Rossing",
      label: "Rossing",
    },
    {
      value: "Uranium",
      label: "Uranium",
    },
  ];

  return (
    <div className="w-full sm:w-1/3 lg:w-1/4 2xl:w-1/5">
      <Select
        primaryColor="orange"
        value={{ value: stock, label: stock, disabled: false }}
        //@ts-ignore
        onChange={(e) => setStock(e.value)}
        options={stockOptions}
        //@ts-ignore
        classNames={{
          //@ts-ignore
          menuButton: ({ isDisabled }) =>
            `  flex text-xs sm:text-sm text-gray-500 border border-[#dfdfdf] shadow-sm  rounded-full  items-center   transition-all duration-300 focus:outline-none ${
              isDisabled
                ? "bg-gray-200"
                : "bg-white text-[#333] font-semibold focus:border-orange-500 focus:border-opacity-50"
            }`,
        }}
      />
    </div>
  );
}

export default StockSelector;
