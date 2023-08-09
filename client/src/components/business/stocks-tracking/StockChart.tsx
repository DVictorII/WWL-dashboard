import { ResponsiveLine } from "@nivo/line";
import { patternDotsDef } from "@nivo/core";
import React, { useState, useEffect } from "react";

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

function StockChart({ data: hist }: { data: any[] }) {
  const dataFormatted = [
    {
      id: "stockHistory",
      color: "#e4b400",
      data: [
        ...hist.map((arr) => {
          return {
            x: arr[0],
            y: arr[6] / 1000000,
          };
        }),
      ],
    },
  ];

  const maxLimit = Math.max(...hist.map((arr) => arr[6] / 1000000));
  const minLimit = Math.min(...hist.map((arr) => arr[6] / 1000000));

  const chartMargin = (maxLimit - minLimit) / 5;

  return (
    <div className="overflow-scroll  2xl:overflow-visible">
      <div className="min-w-[36rem] max-w-full">
        <div className={`h-[40vh] 2xl:h-[40vh]  w-full`}>
          <ResponsiveLine
            data={dataFormatted}
            //@ts-ignore
            keys={["stockHistory"]}
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
              //   { match: { id: "stockHistory" }, id: "gradientC" },
              { match: { id: "stockHistory" }, id: "dots" },
            ]}
            margin={{ top: 50, right: 20, bottom: 50, left: 50 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: minLimit - chartMargin,
              max: maxLimit + chartMargin,
              stacked: false,
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
              legend: "Dates",
              legendOffset: 36,

              legendPosition: "middle",
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Volume (millions)",
              legendOffset: -40,
              legendPosition: "middle",
            }}
            enableGridX={false}
            colors="#e4b400"
            lineWidth={3}
            enablePoints={false}
            pointLabelYOffset={-12}
            enableArea={true}
            areaBaselineValue={minLimit - chartMargin}
            areaOpacity={0.5}
            useMesh={true}
            legends={[]}
            theme={{
              axis: {
                legend: {
                  text: {
                    fontWeight: 600,
                    letterSpacing: 0.3,
                    fill: "#777",
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default StockChart;
