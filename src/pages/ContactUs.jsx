import React from "react";
import { useWebsiteInfo } from "../context/WebsiteContext";

const ContactUs = () => {
  const { websiteInfo } = useWebsiteInfo();

  const socialLinks = [
    {
      name: "فيسبوك",
      url: websiteInfo?.facebookLink,
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "تويتر",
      url: websiteInfo?.twitterLink,
      color: "bg-sky-500 hover:bg-sky-600",
    },
    {
      name: "إنستجرام",
      url: websiteInfo?.instagramLink,
      color: "bg-pink-600 hover:bg-pink-700",
    },
    {
      name: "لينكد إن",
      url: websiteInfo?.linkedInLink,
      color: "bg-blue-800 hover:bg-blue-900",
    },
    {
      name: "يوتيوب",
      url: websiteInfo?.youTubeLink,
      color: "bg-red-600 hover:bg-red-700",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* معلومات الاتصال */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* العنوان */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm h-full">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mr-3">
                  العنوان
                </h2>
              </div>
              <p className="text-gray-600 text-right">
                {websiteInfo?.governorate}- {websiteInfo?.city}{" "}
              </p>
            </div>

            {/* البريد الإلكتروني */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm h-full">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mr-3">
                  البريد الإلكتروني
                </h2>
              </div>
              <p className="text-gray-600 text-right">
                <a
                  href={`mailto:${websiteInfo?.email}`}
                  className="text-green-600 hover:underline"
                >
                  {websiteInfo?.email}
                </a>
              </p>
            </div>

            {/* رقم الهاتف */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm h-full">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mr-3">
                  اتصل بنا
                </h2>
              </div>
              <div className="text-gray-600 text-right">
                <p>هاتف: {websiteInfo?.phoneNumber}</p>
              </div>
            </div>
          </div>

          {/* روابط التواصل الاجتماعي */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
              تابعنا على وسائل التواصل الاجتماعي
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map(
                (social, index) =>
                  social.url && (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${social.color} text-white px-6 py-3 rounded-lg flex items-center gap-2 transition duration-200 transform hover:scale-105`}
                    >
                      <span className="font-medium">{social.name}</span>
                    </a>
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
