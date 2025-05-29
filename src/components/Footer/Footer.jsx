import React from "react";
import { Link } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-5">
        {/* <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold text-green-400 mb-2">كلية العلوم</h2>
            <p className="text-gray-300">بوابتك لعالم المعرفة والتجربة</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-6 md:mb-0">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-green-400">روابط سريعة</h3>
              <ul className="space-y-2">
                <li><Link className="text-gray-300 hover:text-white transition-colors">الرئيسية</Link></li>
                <li><Link className="text-gray-300 hover:text-white transition-colors">من نحن</Link></li>
                <li><Link className="text-gray-300 hover:text-white transition-colors">الخدمات</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 text-green-400">الخدمات</h3>
              <ul className="space-y-2">
                <li><Link className="text-gray-300 hover:text-white transition-colors">تقديم شكوى</Link></li>
                <li><Link className="text-gray-300 hover:text-white transition-colors">متابعة شكوى</Link></li>
                <li><Link className="text-gray-300 hover:text-white transition-colors">الاقتراحات</Link></li>
              </ul>
            </div>
          </div>
        </div> */}

        <div className="text-center">
          <p className="text-gray-100">
             جميع الحقوق محفوظة &copy; {currentYear} كلية العلوم | نحن نستمع إليك و نعمل علي التطوير
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
