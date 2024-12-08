
import React, { createContext, useState } from "react";

export const SettingContext = createContext();

const SettingsProvider = ({ children }) => {
  const [mobileNav, setMobileNav] = useState(false);


  return (
    <SettingContext.Provider
      value={{
        mobileNav,
        setMobileNav,
      }}
    >
      {children}
    </SettingContext.Provider>
  );
};

export default SettingsProvider;
