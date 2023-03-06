import { useState, useEffect } from "react";

export const useWindowDimensions = () => {
  const [width, setWidth] = useState(
    typeof window !== "undefined" && window.innerWidth
  );
  const [height, setHeight] = useState(
    typeof window !== "undefined" && window.innerHeight
  );
  const isMobile = width < 769;

  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    typeof window !== "undefined" &&
      window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return { width, height, isMobile };
};
