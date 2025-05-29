import { createContext, useContext, useState } from "react";

const MobileMenuContext = createContext();

const MobileMenuProvider = ({ children }) => {
  const [isMobMenuOpen, setIsMobMenuOpen] = useState(false);
  return (
    <MobileMenuContext.Provider value={{ isMobMenuOpen, setIsMobMenuOpen }}>
      {children}
    </MobileMenuContext.Provider>
  );
};

export default MobileMenuProvider;
export const useMobileMenuContext = () => useContext(MobileMenuContext);