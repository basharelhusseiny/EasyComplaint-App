import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import axios from "axios";

const RecoverPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    token: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // استخراج البريد الإلكتروني والرمز من عنوان URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const email = params.get("email");
    const token = params.get("token");
    
    if (email && token) {
      setFormData(prev => ({ ...prev, email, token }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // التحقق من تطابق كلمتي المرور
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ text: "كلمتا المرور غير متطابقتين", type: "error" });
      return;
    }
    
    setLoading(true);
    
    try {
      await axios.post(
        "https://complain.runasp.net/api/Account/reset-password",
        {
          email: formData.email,
          token: formData.token,
          newPassword: formData.newPassword
        }
      );
      
      setMessage({ text: "تم إعادة تعيين كلمة المرور بنجاح", type: "success" });
      
      // التوجيه إلى صفحة تسجيل الدخول بعد نجاح العملية
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (error) {
      console.error("خطأ في إعادة تعيين كلمة المرور:", error);
      setMessage({ 
        text: error.response?.data?.message || "حدث خطأ أثناء إعادة تعيين كلمة المرور", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/login");
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      {/* <!-- Password Reset Card --> */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* <!-- Title --> */}
        <h1 className="text-3xl font-bold text-green-600 text-right mb-6">
          استعادة كلمة المرور
        </h1>

        <h1 className="text-l font-bold text-gray-400 text-right mb-6">
          يرجي ادخال البيانات التاليه لاستعاده كلمه المرور
        </h1>

        {/* <!-- Status Message --> */}
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

        {/* <!-- Form Fields --> */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <!-- Email --> */}
          <div>
            <label
              htmlFor="email"
              className="block text-xl font-medium text-gray-700 mb-1"
            >
              ادخل بريدك الالكتروني
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder=" اكتب بريدك الالكتروني"
              required
            />
          </div>

          {/* <!-- Password --> */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-xl font-medium text-gray-700 mb-1"
            >
              كلمة السر الجديده
            </label>
            <input
              type="password"
              id="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="أدخل كلمة المرور"
              required
            />
          </div>

          {/* <!-- Confirm Password --> */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-xl font-medium text-gray-700 mb-1"
            >
              تأكيد كلمة السر
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="أدخل كلمة المرور مرة أخرى"
              required
            />
          </div>

          {/* <!-- Buttons --> */}
          <div className="flex justify-between space-x-4 space-x-reverse">
            <button 
              type="button"
              onClick={handleCancel}
              className="w-1/2 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
            >
              الغاء
            </button>
            {/* <!-- Confirm Button --> */}
            <button 
              type="submit"
              disabled={loading}
              className="w-1/2 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 disabled:bg-green-300"
            >
              {loading ? "جاري المعالجة..." : "اعاده تعين"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecoverPassword;
