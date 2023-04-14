import React, { useState, useEffect } from "react";

export function useWindowSize() {
  const [size, setSize] = useState(
    typeof window !== "undefined"
      ? [window.innerWidth, window.innerHeight]
      : undefined
  );

  const detectSize = () => {
    setSize([window.innerWidth, window.innerHeight]);
  };

  useEffect(() => {
    window.addEventListener("resize", detectSize);

    return () => {
      window.removeEventListener("resize", detectSize);
    };
  }, [size]);

  if (size) {
    return size;
  } else {
    return [undefined, undefined];
  }
}
