interface DataI {
  Actual: string;
  Dates: string;
  Frequency: string;
  Highest: string;
  Lowest: string;
  Previous: string;
  Unit: string;
}

function UraniumStockInformation({ data }: { data: DataI }) {
  const summaryTopics = [
    {
      title: "Actual Value",
      value: data.Actual,
    },

    {
      title: "Dates Interval",
      value: data.Dates,
    },

    {
      title: "Frequency",
      value: data.Frequency,
    },

    {
      title: "Highest Value",
      value: data.Highest,
    },

    {
      title: "Lowest Value",
      value: data.Lowest,
    },

    {
      title: "Previous Value",
      value: data.Previous,
    },

    {
      title: "Unit",
      value: data.Unit,
    },
  ];
  return (
    <div className="flex flex-col gap-y-6">
      <h2 className="font-semibold">Uranium currency Information</h2>

      <div className="flex flex-col gap-y-8">
        <div className="grid grid-cols-2">
          {summaryTopics.map((topic, i) => (
            <>
              <span
                style={{
                  backgroundColor:
                    i % 2 === 0 ? "rgba(228,180,0 , 0.05)" : "#fff",
                }}
                className="border-r-2 py-4 text-[#777] px-2 flex justify-center text-center font-semibold text-sm  border-[#f1f1f1] "
              >
                {topic.title}
              </span>
              <span
                style={{
                  backgroundColor:
                    i % 2 === 0 ? "rgba(228,180,0 , 0.05)" : "#fff",
                }}
                className=" flex justify-center items-center font-semibold text-sm"
              >
                {topic.value}
              </span>
            </>
          ))}
        </div>

        <span className="text-xs text-[#999] font-semibold">
          As of June, 2023
        </span>
      </div>
    </div>
  );
}

export default UraniumStockInformation;
