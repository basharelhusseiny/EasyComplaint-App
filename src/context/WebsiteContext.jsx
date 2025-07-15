// context/WebsiteContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const WebsiteContext = createContext();

export const WebsiteProvider = ({ children }) => {
  const [websiteInfo, setWebsiteInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://complain.runasp.net/GetWebInfo");
      setWebsiteInfo(res.data);
    };
    fetchData();
  }, []);
  console.log(websiteInfo)

  return (
    <WebsiteContext.Provider value={{websiteInfo}}>
      {children}
    </WebsiteContext.Provider>
  );
};

export const useWebsiteInfo = () => useContext(WebsiteContext);
