import React from "react";

const EditSignUp = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen py-5">
      {/* <!-- Login Card --> */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* <!-- Title --> */}
        <h1 className="text-2xl font-bold text-green-600 text-center mb-6">
          تعديل حساب
        </h1>

        {/* <!-- Form Fields --> */}
        <div className="space-y-4">
          {/* <!-- Username --> */}
          <div>
            <label
              for="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              اسم بالكامل
            </label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="أدخل الاسم بالكامل"
            />
          </div>

          {/* <!-- email --> */}
          <div>
            <label
              for="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              البريد الالكتروني
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="أدخل البريد الالكتروني"
            />
          </div>

          {/* <!-- رقم الهاتف --> */}
          <div>
            <label
              for="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              رقم الهاتف
            </label>
            <input
              type="text"
              id="phone"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="أدخل رقم هاتفك"
            />
          </div>
          {/* <!-- العنوان --> */}
          <div>
            <label
              for="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              العنوان
            </label>
            <input
              type="text"
              id="address"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="أدخل عنوانك"
            />
          </div>

          {/* <!-- Password --> */}
          <div>
            <label
              for="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              كلمه السر
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="أدخل كلمه السر"
            />
          </div>

          {/* <!-- تأكيد كلمة السر --> */}
          <div>
            <label
              for="confirm-password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              تاكيد كلمه السر
            </label>
            <input
              type="password"
              id="confirm-password"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="تاكيد كلمة السر"
            />
          </div>

          {/* <!-- Login Button --> */}
          <button className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200">
            حفظ
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSignUp;
