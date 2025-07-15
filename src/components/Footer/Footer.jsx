import React from "react";
import { Link } from "react-router";
import { useWebsiteInfo } from "../../context/WebsiteContext";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { websiteInfo } = useWebsiteInfo();

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-5">
        <div className="text-center">
          <p className="text-gray-100">
            جميع الحقوق محفوظة &copy; {currentYear} {websiteInfo?.name} | نحن
            نستمع إليك و نعمل علي التطوير
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
