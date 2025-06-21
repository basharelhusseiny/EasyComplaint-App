import React, { useState } from "react";
import { Link } from "react-router";
import axios from "axios";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    if (!email.trim()) return;
    
    setLoading(true);
    try {
      await axios.post(
        "https://complain.runasp.net/api/Account/forgot-password",
        { email }
      );
      setMessage("تم إرسال رابط إعادة التعيين إلى بريدك الإلكتروني");
    } catch (error) {
      console.error("خطأ:", error);
      setMessage("حدث خطأ أثناء إرسال الطلب");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      {/* <!-- Forget Password Card --> */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* <!-- Title --> */}
        <h1 className="text-2xl font-bold text-green-600 text-center mb-4">
          نسيت كلمة المرور
        </h1>
        {/* <!-- Description --> */}
        <p className="text-center text-gray-400 mb-6">
          أدخل بريدك الإلكتروني لإعادة تعيين كلمة المرور
        </p>

        {message && (
          <p className="text-center text-green-600 mb-4">{message}</p>
        )}

        {/* <!-- Form Field --> */}
        <div className="space-y-4">
          {/* <!-- Email --> */}
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="اكتب البريد الإلكتروني"
              disabled={loading}
            />
          </div>

          {/* <!-- Reset Link Button --> */}
          <button
            onClick={handleResetPassword}
            disabled={loading}
            className="w-full block text-center py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
          >
            {loading ? "جاري الإرسال..." : "ارسال رابط إعادة التعيين"}
          </button>
          
          <Link
            to="/login"
            className="block text-center text-green-600 hover:underline mt-4"
          >
            العودة إلى تسجيل الدخول
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
