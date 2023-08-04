import React from "react";

const summaryTopics = [
  {
    title: "Previous close",
    value: "64.43",
  },

  {
    title: "Open",
    value: "65.29",
  },

  {
    title: "Bid",
    value: "65.75 x 900",
  },

  {
    title: "Ask",
    value: "65.80 x 1100",
  },

  {
    title: "Day's range",
    value: "65.41 - 66.03",
  },

  {
    title: "52-week range",
    value: "57.56 - 82.17",
  },

  {
    title: "Volume",
    value: "320,258",
  },

  {
    title: "Avg. volume",
    value: "383,959",
  },

  {
    title: "Net assets",
    value: "3.3B",
  },

  {
    title: "NAV",
    value: "64.98",
  },

  {
    title: "PE ratio (TTM)",
    value: "14.65",
  },

  {
    title: "Yield",
    value: "1.12%",
  },

  {
    title: "YTD daily total return",
    value: "10.29%",
  },

  {
    title: "Beta (5Y monthly)",
    value: "1.18",
  },

  {
    title: "Expense ratio (net)",
    value: "0.75%",
  },

  {
    title: "Inception date",
    value: "2010-07-22",
  },
];

function StockInformationSummary() {
  return (
    <div className="flex flex-col gap-y-8">
      <h2 className="font-semibold">Stock Information Summary</h2>

      <div className="px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-x-16 lg:gap-x-20 xl:gap-x-24 2xl:gap-x-36 gap-y-6">
          {summaryTopics.map((topic, i) => (
            <div
              className={`flex items-center justify-between gap-x-4 flex-wrap gap-y-4 pb-2 2xl:pb-3 border-b border-[#f1f1f1]  `}
            >
              <span className="text-sm font-bold">{topic.title}</span>
              <span className="text-sm font-medium ">{topic.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StockInformationSummary;
