import { useEffect, useState } from "react";

export const useDebounce = ({ title, delay = 1500 }) => {
  const [delayTerm, setDelayTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayTerm(title);
    }, delay);
    return () => clearTimeout(timer);
  }, [title, delay]);

  return { delayTerm };
};
