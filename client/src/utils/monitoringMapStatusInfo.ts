export const monitoringMapStatusInfo = {
  0: {
    name: "all",
    number: 92,
    normalColor: "#18212f",
    darkColor: "#0c1018",
    lightColor: "rgba(24, 33, 47, 0.1)",
  },
  1: {
    name: "active",
    number: 49,
    normalColor: "#477C9A",
    lightColor: "rgba(71, 124, 154, 0.1)",
    darkColor: "#1c394a",
  },
  2: {
    name: "damaged",
    number: 14,
    normalColor: "#B41818",
    lightColor: "rgba(180, 24, 24, 0.1)",
    darkColor: "#7f2121",
  },
  3: {
    name: "disconnected",
    number: 17,
    normalColor: "#C5B317",
    lightColor: "rgba(197, 179, 23, 0.1)",
    darkColor: "#C0AD00",
  },
  4: {
    name: "proposed",
    number: 12,
    normalColor: "#7B8831",
    lightColor: "rgba(123, 136, 49, 0.1)",
    darkColor: "#69742C",
  },
  5: {
    name: "tarp",
    number: 0,
    normalColor: "#2C8A5D",
    lightColor: "rgba(44, 138, 93, 0.1)",
    darkColor: "#206845",
  },
  6: {
    name: "incident",
    number: 1,
    normalColor: "#831B1B",
    lightColor: "rgba(131, 27, 27, 0.1)",
    darkColor: "#622323",
  },
};

export const capitalizeName = (name: string) => {
  const arr = name.split("");
  const newArr = arr.map((w, i) => {
    if (i === 0) return w.toUpperCase();
    return w;
  });
  return newArr.join("");
};
