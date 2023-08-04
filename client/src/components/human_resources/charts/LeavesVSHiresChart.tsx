import React from "react";

import { ResponsivePie } from "@nivo/pie";

const data = [
  {
    id: "leaves",
    label: "Leaves",
    value: 3,
  },
  {
    id: "hires",
    label: "Hires",
    value: 1,
  },
];

function LeavesVSHiresChart() {
  return (
    <ResponsivePie
      colors={["#999", "#d9d926"]}
      data={data}
      enableArcLinkLabels={false}
      margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
      sortByValue={true}
      innerRadius={0.6}
      padAngle={2}
      cornerRadius={1}
      activeOuterRadiusOffset={8}
      borderWidth={2}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      //   valueFormat={function (e) {
      //     return String(e);
      //   }}
      arcLabel="value"
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "ruby",
          },
          id: "dots",
        },
        {
          match: {
            id: "c",
          },
          id: "dots",
        },
        {
          match: {
            id: "go",
          },
          id: "dots",
        },
        {
          match: {
            id: "python",
          },
          id: "dots",
        },
        {
          match: {
            id: "scala",
          },
          id: "lines",
        },
        {
          match: {
            id: "lisp",
          },
          id: "lines",
        },
        {
          match: {
            id: "elixir",
          },
          id: "lines",
        },
        {
          match: {
            id: "javascript",
          },
          id: "lines",
        },
      ]}
      legends={[]}
    />
  );
}

export default LeavesVSHiresChart;
