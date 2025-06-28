import { createContext, useContext, useState } from "react";

const IdOfComplaintDetails = createContext();

const IdOfComplaintDetailsProvider = ({ children }) => {
  const [CompDetailsId, setCompDetailsId] = useState(1);

  return (
    <IdOfComplaintDetails.Provider value={{ CompDetailsId, setCompDetailsId }}>
      {children}
    </IdOfComplaintDetails.Provider>
  );
};

export default IdOfComplaintDetailsProvider;
export const useComplaintIdDetailsContext = () => useContext(IdOfComplaintDetails);
