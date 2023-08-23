export const monitoringMapStatusInfo = [
  {
    name: "all",
    normalColor: "#18212f",
    intermediateColor: "#babcc1",
    darkColor: "#0c1018",
    lightColor: "#d1d3d5",
    washedColor: "#e8e9ea",
  },
  {
    name: "active",
    normalColor: "#477C9A",
    lightColor: "#dae5eb",
    intermediateColor: "#c8d8e1",
    darkColor: "#1c394a",
    washedColor: "#edf2f5",
  },
  {
    name: "damaged",

    normalColor: "#B41818",
    lightColor: "#f0d1d1",
    intermediateColor: "#e9baba",
    darkColor: "#7f2121",
    washedColor: "#f8e8e8",
  },
  {
    name: "disconnected",

    normalColor: "#C5B317",
    lightColor: "#f3f0d1",
    intermediateColor: "#eee8b9",
    darkColor: "#9e8f12",
    washedColor: "#f9f7e8",
  },
  {
    name: "proposed",
    normalColor: "#7B8831",
    lightColor: "#e5e7d6",
    intermediateColor: "#d7dbc1",
    darkColor: "#69742C",
    washedColor: "#f2f3ea",
  },
  {
    name: "tarp",

    normalColor: "#2C8A5D",
    lightColor: "#d5e8df",
    intermediateColor: "#c0dcce",
    darkColor: "#206845",
    washedColor: "#eaf3ef",
  },
  {
    name: "incident",

    normalColor: "#831B1B",
    lightColor: "#e6d1d1",
    intermediateColor: "#dabbbb",
    darkColor: "#622323",
    washedColor: "#f3e8e8",
  },
];

export const capitalizeName = (name: string) => {
  const arr = name.split("");
  const newArr = arr.map((w, i) => {
    if (i === 0) return w.toUpperCase();
    return w;
  });
  return newArr.join("");
};
