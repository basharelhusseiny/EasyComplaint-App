import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useWebsiteInfo } from "../context/WebsiteContext";

const WebsiteManagement = () => {
  const navigate = useNavigate();
  const { websiteInfo } = useWebsiteInfo();
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    logo: "",
    description: "",
    governorate: "",
    city: "",
    facebookLink: "",
    twitterLink: "",
    instagramLink: "",
    linkedInLink: "",
    youTubeLink: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    if (websiteInfo) {
      setFormData({
        name: websiteInfo.name || "",
        email: websiteInfo.email || "",
        phoneNumber: websiteInfo.phoneNumber || "",
        logo: websiteInfo.logo || "",
        description: websiteInfo.description || "",
        governorate: websiteInfo.governorate || "",
        city: websiteInfo.city || "",
        facebookLink: websiteInfo.facebookLink || "",
        twitterLink: websiteInfo.twitterLink || "",
        instagramLink: websiteInfo.instagramLink || "",
        linkedInLink: websiteInfo.linkedInLink || "",
        youTubeLink: websiteInfo.youTubeLink || "",
      });
    }
  }, [websiteInfo]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await axios.put(
        "https://complain.runasp.net/UpdateWebInfo",
        formData,
        {
          headers: {
            Authorization: bearerToken,
          },
        }
      );

      setMessage({ text: "تم تحديث معلومات الموقع بنجاح", type: "success" });
      setTimeout(() => {
        navigate("/", { replace: true });
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("API Error:", error.response?.data || error.message);
      setMessage({
        text: error.response?.data?.message || "حدث خطأ أثناء تحديث المعلومات",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen py-5">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-green-600 text-center mb-6">
          إدارة معلومات الموقع
        </h1>

        {message.text && (
          <div
            className={`p-3 mb-4 rounded-md ${
              message.type === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                اسم الموقع <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="أدخل اسم الموقع"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                البريد الإلكتروني <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="أدخل البريد الإلكتروني"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                رقم الهاتف <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="أدخل رقم الهاتف"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                رابط الشعار
              </label>
              <input
                type="text"
                name="logo"
                value={formData.logo}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="أدخل رابط الشعار"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                المحافظة <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="governorate"
                value={formData.governorate}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="أدخل المحافظة"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                المدينة <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="أدخل المدينة"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الوصف
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="أدخل وصف الموقع"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                رابط فيسبوك
              </label>
              <input
                type="url"
                name="facebookLink"
                value={formData.facebookLink}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="أدخل رابط فيسبوك"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                رابط تويتر
              </label>
              <input
                type="url"
                name="twitterLink"
                value={formData.twitterLink}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="أدخل رابط تويتر"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                رابط إنستجرام
              </label>
              <input
                type="url"
                name="instagramLink"
                value={formData.instagramLink}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="أدخل رابط إنستجرام"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                رابط لينكد إن
              </label>
              <input
                type="url"
                name="linkedInLink"
                value={formData.linkedInLink}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="أدخل رابط لينكد إن"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                رابط يوتيوب
              </label>
              <input
                type="url"
                name="youTubeLink"
                value={formData.youTubeLink}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="أدخل رابط يوتيوب"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white rounded-md transition duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-200"
          >
            العودة
          </button>
        </form>
      </div>
    </div>
  );
};

export default WebsiteManagement;
