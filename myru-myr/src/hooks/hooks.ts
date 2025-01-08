import { useEffect } from "react";

export const useEscapeKey = (callback: () => void, active: boolean) => {
  useEffect(() => {
    const handleEscapeClick = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        callback();
      }
    };

    if (active) {
      document.addEventListener("keydown", handleEscapeClick);
    } else {
      document.removeEventListener("keydown", handleEscapeClick);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeClick);
    };
  }, [callback, active]);
};
