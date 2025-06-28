import { createContext, useContext, useState } from "react";

const ComplaintIdContext = createContext();

const ComplaintIdProvider = ({ children }) => {
  const [CompId, setCompId] = useState(1);

  return (
    <ComplaintIdContext.Provider value={{ CompId, setCompId }}>
      {children}
    </ComplaintIdContext.Provider>
  );
};

export default ComplaintIdProvider;
export const useComplaintIdContext = () => useContext(ComplaintIdContext);
