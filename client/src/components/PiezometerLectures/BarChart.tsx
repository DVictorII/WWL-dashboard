import React from "react";
import { ResponsiveLine } from "@nivo/line";

const data = [
  {
    id: "japan",
    color: "hsl(83, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 123,
      },
      {
        x: "helicopter",
        y: 262,
      },
      {
        x: "boat",
        y: 53,
      },
      {
        x: "train",
        y: 218,
      },
      {
        x: "subway",
        y: 285,
      },
      {
        x: "bus",
        y: 7,
      },
      {
        x: "car",
        y: 55,
      },
      {
        x: "moto",
        y: 119,
      },
      {
        x: "bicycle",
        y: 154,
      },
      {
        x: "horse",
        y: 143,
      },
      {
        x: "skateboard",
        y: 3,
      },
      {
        x: "others",
        y: 55,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(184, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 286,
      },
      {
        x: "helicopter",
        y: 60,
      },
      {
        x: "boat",
        y: 34,
      },
      {
        x: "train",
        y: 170,
      },
      {
        x: "subway",
        y: 40,
      },
      {
        x: "bus",
        y: 33,
      },
      {
        x: "car",
        y: 239,
      },
      {
        x: "moto",
        y: 93,
      },
      {
        x: "bicycle",
        y: 272,
      },
      {
        x: "horse",
        y: 157,
      },
      {
        x: "skateboard",
        y: 118,
      },
      {
        x: "others",
        y: 36,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(179, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 107,
      },
      {
        x: "helicopter",
        y: 73,
      },
      {
        x: "boat",
        y: 197,
      },
      {
        x: "train",
        y: 149,
      },
      {
        x: "subway",
        y: 209,
      },
      {
        x: "bus",
        y: 186,
      },
      {
        x: "car",
        y: 292,
      },
      {
        x: "moto",
        y: 288,
      },
      {
        x: "bicycle",
        y: 7,
      },
      {
        x: "horse",
        y: 118,
      },
      {
        x: "skateboard",
        y: 81,
      },
      {
        x: "others",
        y: 51,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(134, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 15,
      },
      {
        x: "helicopter",
        y: 166,
      },
      {
        x: "boat",
        y: 228,
      },
      {
        x: "train",
        y: 152,
      },
      {
        x: "subway",
        y: 47,
      },
      {
        x: "bus",
        y: 21,
      },
      {
        x: "car",
        y: 298,
      },
      {
        x: "moto",
        y: 263,
      },
      {
        x: "bicycle",
        y: 213,
      },
      {
        x: "horse",
        y: 243,
      },
      {
        x: "skateboard",
        y: 28,
      },
      {
        x: "others",
        y: 125,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(342, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 10,
      },
      {
        x: "helicopter",
        y: 212,
      },
      {
        x: "boat",
        y: 168,
      },
      {
        x: "train",
        y: 232,
      },
      {
        x: "subway",
        y: 272,
      },
      {
        x: "bus",
        y: 1,
      },
      {
        x: "car",
        y: 206,
      },
      {
        x: "moto",
        y: 170,
      },
      {
        x: "bicycle",
        y: 34,
      },
      {
        x: "horse",
        y: 181,
      },
      {
        x: "skateboard",
        y: 7,
      },
      {
        x: "others",
        y: 175,
      },
    ],
  },
];

function BarChart() {
  return (
    //@ts-ignore
    <ResponsiveLine
      data={data}
      margin={{ top: 30, right: 40, bottom: 50, left: 60 }}
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
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "transportation",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      lineWidth={3}
      pointSize={5}
      pointColor={{ theme: "background" }}
      pointBorderWidth={1}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableArea={true}
      useMesh={true}
      legends={[]}
    />
  );
}

export default BarChart;
