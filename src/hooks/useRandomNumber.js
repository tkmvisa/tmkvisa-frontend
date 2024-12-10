import { useState, useEffect } from "react";

const useRandomID = (length = 10) => {
  const [randomString, setRandomString] = useState("");

  useEffect(() => {
    const generateRandomString = () => {
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Capital letters and numbers
      let result = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
      }
      return result;
    };

    setRandomString(generateRandomString());
  }, [length]);

  return randomString;
};

export default useRandomID;
