import { useState, useEffect } from "react";

const useRandomNumber = () => {
  const [number, setNumber] = useState(null);

  useEffect(() => {
    const generateNumber = () => Math.floor(1000000000 + Math.random() * 9000000000);
    setNumber(generateNumber());
  }, []);

  return number;
};

export default useRandomNumber;
