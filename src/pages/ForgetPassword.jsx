import React from "react";
import { Link } from "react-router";

const ForgetPassword = () => {
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

        {/* <!-- Form Field --> */}
        <div className="space-y-4">
          {/* <!-- Email --> */}
          <div>
            <input
              type="text"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="اكتب البريد الإلكتروني"
            />
          </div>

          {/* <!-- Reset Link Button --> */}
          <Link
            to="/login"
            className="w-full block text-center py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
          >
            ارسال رابط إعادة التعيين
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
