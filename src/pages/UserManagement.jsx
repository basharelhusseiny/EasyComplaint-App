import React from "react";
import { useNavigate } from "react-router";

const UserManagement = () => {
  const navigate = useNavigate()
  return (
    <div className="bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-md shadow-md">
        {/* <!-- العنوان --> */}
        <h1 className="text-center text-green-700 text-2xl font-bold mb-6">
          إدارة المستخدمين
        </h1>

        {/* <!-- الصف العلوي: تم تبديل الترتيب --> */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          {/* <!-- القائمة المنسدلة على اليمين --> */}
          <select className="border border-gray-300 rounded-md px-3 py-2">
            <option>جميع الأقسام</option>
            <option>قسم 1</option>
            <option>قسم 2</option>
          </select>

          {/* <!-- زر الإضافة على اليسار --> */}
          <button onClick={()=>navigate("/signUpPage")} className="bg-green-700 hover:bg-green-800 transition duration-200 text-white font-semibold px-5 py-2 rounded-lg shadow flex items-center gap-2">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span>إضافة مستخدم جديد</span>
          </button>
        </div>

        {/* <!-- الجدول --> */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-right">
            <thead>
              <tr className="bg-green-700 text-white text-sm">
                <th className="py-2 px-4">الاسم</th>
                <th className="py-2 px-4">البريد الإلكتروني</th>
                <th className="py-2 px-4">رقم القسم</th>
                <th className="py-2 px-4">الدور</th>
                <th className="py-2 px-4">الحالة</th>
                <th className="py-2 px-4 text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {/* <!-- صف 1 --> */}
              <tr className="border-t">
                <td className="py-2 px-4">محمد أحمد</td>
                <td className="py-2 px-4">mohamed@example.com</td>
                <td className="py-2 px-4">1</td>
                <td className="py-2 px-4">مدير</td>
                <td className="py-2 px-4 text-green-700 font-medium">مفعل</td>
                <td className="py-2 px-4 flex flex-wrap gap-2">
                  <button className="bg-green-600 text-white text-xs px-3 py-1 rounded mr-12">
                    تعديل
                  </button>
                  <button className="bg-red-500 text-white text-xs px-3 py-1 rounded">
                    حذف
                  </button>
                  <button className="bg-gray-500 text-white text-xs px-3 py-1 rounded">
                    إيقاف
                  </button>
                </td>
              </tr>

              {/* <!-- صف 2 --> */}
              <tr className="border-t">
                <td className="py-2 px-4">سارة علي</td>
                <td className="py-2 px-4">sara@example.com</td>
                <td className="py-2 px-4">2</td>
                <td className="py-2 px-4">مستخدم</td>
                <td className="py-2 px-4 text-red-600 font-medium">موقوف</td>
                <td className="py-2 px-4 flex flex-wrap gap-2">
                  <button className="bg-green-600 text-white text-xs px-3 py-1 rounded mr-12">
                    تعديل
                  </button>
                  <button className="bg-red-500 text-white text-xs px-3 py-1 rounded">
                    حذف
                  </button>
                  <button className="bg-green-700 text-white text-xs px-3 py-1 rounded">
                    تفعيل
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
