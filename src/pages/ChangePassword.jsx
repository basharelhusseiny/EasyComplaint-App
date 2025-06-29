import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const ChangePassword = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;

  const [formData, setFormData] = useState({
    lastPassword: "",
    newPassword: "",
    newPasswordConform: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // التحقق من تطابق كلمتي المرور
    if (formData.newPassword !== formData.newPasswordConform) {
      setMessage({ text: "كلمتا المرور الجديدة غير متطابقتين", type: "error" });
      return;
    }
    
    // التحقق من طول كلمة المرور
    if (formData.newPassword.length < 8) {
      setMessage({ 
        text: "كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل", 
        type: "error" 
      });
      return;
    }
    
    setLoading(true);
    setMessage({ text: "", type: "" });
    
    try {
      await axios.put(
        "https://complain.runasp.net/api/Account/Change-Password",
        formData,
        {
          headers: {
            Authorization: bearerToken,
            "Content-Type": "application/json"
          }
        }
      );
      
      setMessage({ text: "تم تغيير كلمة المرور بنجاح", type: "success" });
      
      // إعادة تعيين النموذج
      setFormData({
        lastPassword: "",
        newPassword: "",
        newPasswordConform: ""
      });
      
      // التوجيه إلى الصفحة الرئيسية بعد فترة قصيرة
      setTimeout(() => {
        navigate("/");
      }, 2000);
      
    } catch (error) {
      console.error("خطأ في تغيير كلمة المرور:", error);
      setMessage({ 
        text: error.response?.data?.message || "حدث خطأ أثناء تغيير كلمة المرور", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-green-600 text-right mb-6">
          تغيير كلمة المرور
        </h1>

        {/* رسالة الحالة */}
        {message.text && (
          <div 
            className={`p-3 mb-4 rounded-md text-right ${
              message.type === "success" 
                ? "bg-green-100 text-green-700" 
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* كلمة المرور الحالية */}
          <div>
            <label
              htmlFor="lastPassword"
              className="block text-sm font-medium text-gray-700 mb-1 text-right"
            >
              كلمة المرور الحالية
            </label>
            <input
              type="password"
              id="lastPassword"
              value={formData.lastPassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
              placeholder="أدخل كلمة المرور الحالية"
              required
            />
          </div>

          {/* كلمة المرور الجديدة */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-1 text-right"
            >
              كلمة المرور الجديدة
            </label>
            <input
              type="password"
              id="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
              placeholder="أدخل كلمة المرور الجديدة"
              required
            />
          </div>

          {/* تأكيد كلمة المرور الجديدة */}
          <div>
            <label
              htmlFor="newPasswordConform"
              className="block text-sm font-medium text-gray-700 mb-1 text-right"
            >
              تأكيد كلمة المرور الجديدة
            </label>
            <input
              type="password"
              id="newPasswordConform"
              value={formData.newPasswordConform}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-right"
              placeholder="أدخل تأكيد كلمة المرور الجديدة"
              required
            />
          </div>

          {/* أزرار التحكم */}
          <div className="flex gap-3 justify-between space-x-4 space-x-reverse">
            <button 
              type="button"
              onClick={() => navigate("/")}
              className="w-1/2 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
            >
              إلغاء
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="w-1/2 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 disabled:bg-green-300"
            >
              {loading ? "جاري المعالجة..." : "تغيير كلمة المرور"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword
