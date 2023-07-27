import { ResponsiveLine } from "@nivo/line";
import { patternDotsDef } from "@nivo/core";
import React from "react";

const data = [
  {
    id: "japan",
    color: "#e4b400",
    data: [
      {
        x: "plane",
        y: 41,
      },
      {
        x: "helicopter",
        y: 177,
      },
      {
        x: "boat",
        y: 151,
      },
      {
        x: "train",
        y: 16,
      },
      {
        x: "subway",
        y: 85,
      },
      {
        x: "bus",
        y: 223,
      },
      {
        x: "car",
        y: 110,
      },
      {
        x: "moto",
        y: 176,
      },
      {
        x: "bicycle",
        y: 129,
      },
      {
        x: "horse",
        y: 165,
      },
      {
        x: "skateboard",
        y: 114,
      },
      {
        x: "others",
        y: 213,
      },
    ],
  },
];

function StockChart() {
  return (
    <div className="overflow-scroll  2xl:overflow-visible">
      <div className="min-w-[36rem] max-w-full">
        <div className={`h-[30vh] 2xl:h-[35vh]  w-full`}>
          <ResponsiveLine
            data={data}
            //@ts-ignore
            keys={["japan"]}
            defs={[
              //   {
              //     id: "gradientC",
              //     type: "linearGradient",
              //     colors: [
              //       { offset: 0, color: "#e4b400" },
              //       { offset: 50, color: "#e4b400" },
              //       { offset: 100, color: "#efd266" },
              //     ],
              //   },

              patternDotsDef("dots", { color: "#e4b400", size: 4, padding: 2 }),
            ]}
            fill={[
              // match using object query
              //   { match: { id: "japan" }, id: "gradientC" },
              { match: { id: "japan" }, id: "dots" },
            ]}
            margin={{ top: 50, right: 20, bottom: 50, left: 50 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: true,
              reverse: false,
            }}
            yFormat=" >-.2f"
            curve="natural"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "",
              legendOffset: 36,
              legendPosition: "middle",
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "",
              legendOffset: -40,
              legendPosition: "middle",
            }}
            enableGridX={false}
            colors="#e4b400"
            lineWidth={3}
            enablePoints={false}
            pointLabelYOffset={-12}
            enableArea={true}
            areaBaselineValue={20}
            areaOpacity={0.5}
            useMesh={true}
            legends={[]}
          />
        </div>
      </div>
    </div>
  );
}

export default StockChart;
