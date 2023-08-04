import React from "react";
import { ResponsivePie } from "@nivo/pie";

const data = [
  {
    id: "elixir",
    label: "elixir",
    value: 377,
    color: "hsl(331, 70%, 50%)",
  },
  {
    id: "javascript",
    label: "javascript",
    value: 31,
    color: "hsl(355, 70%, 50%)",
  },
  {
    id: "stylus",
    label: "stylus",
    value: 175,
    color: "hsl(60, 70%, 50%)",
  },
  {
    id: "hack",
    label: "hack",
    value: 416,
    color: "hsl(190, 70%, 50%)",
  },
  {
    id: "c",
    label: "c",
    value: 324,
    color: "hsl(38, 70%, 50%)",
  },
];

function HiresTimeTypeChart() {
  return (
    <></>
    // <ResponsivePie
    //   data={data}
    //   margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
    //   sortByValue={true}
    //   innerRadius={0.6}
    //   padAngle={1}
    //   cornerRadius={1}
    //   activeOuterRadiusOffset={8}
    //   borderWidth={2}
    //   borderColor={{
    //     from: "color",
    //     modifiers: [["darker", 0.2]],
    //   }}
    //   arcLinkLabelsSkipAngle={10}
    //   arcLinkLabelsTextColor="#333333"
    //   arcLinkLabelsThickness={2}
    //   arcLinkLabelsColor={{ from: "color" }}
    //   arcLabel="value"
    //   arcLabelsSkipAngle={10}
    //   arcLabelsTextColor={{
    //     from: "color",
    //     modifiers: [["darker", 2]],
    //   }}
    //   defs={[
    //     {
    //       id: "dots",
    //       type: "patternDots",
    //       background: "inherit",
    //       color: "rgba(255, 255, 255, 0.3)",
    //       size: 4,
    //       padding: 1,
    //       stagger: true,
    //     },
    //     {
    //       id: "lines",
    //       type: "patternLines",
    //       background: "inherit",
    //       color: "rgba(255, 255, 255, 0.3)",
    //       rotation: -45,
    //       lineWidth: 6,
    //       spacing: 10,
    //     },
    //   ]}
    //   fill={[
    //     {
    //       match: {
    //         id: "ruby",
    //       },
    //       id: "dots",
    //     },
    //     {
    //       match: {
    //         id: "c",
    //       },
    //       id: "dots",
    //     },
    //     {
    //       match: {
    //         id: "go",
    //       },
    //       id: "dots",
    //     },
    //     {
    //       match: {
    //         id: "python",
    //       },
    //       id: "dots",
    //     },
    //     {
    //       match: {
    //         id: "scala",
    //       },
    //       id: "lines",
    //     },
    //     {
    //       match: {
    //         id: "lisp",
    //       },
    //       id: "lines",
    //     },
    //     {
    //       match: {
    //         id: "elixir",
    //       },
    //       id: "lines",
    //     },
    //     {
    //       match: {
    //         id: "javascript",
    //       },
    //       id: "lines",
    //     },
    //   ]}
    //   legends={[]}
    // />
  );
}

export default HiresTimeTypeChart;
