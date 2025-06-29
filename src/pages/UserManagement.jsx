import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const UserManagement = () => {
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // إضافة حالات الترقيم
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  // جلب الأدوار من API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await axios.get(
          "https://complain.runasp.net/api/Account/GetAllRoles",
          {
            headers: {
              Authorization: bearerToken,
            },
          }
        );
        setRoles(res.data || []);
      } catch (err) {
        console.error(
          "حدث خطأ أثناء جلب الأدوار:",
          err.response?.data || err.message
        );
      }
    };

    fetchRoles();
  }, []);

  // تعديل وظيفة جلب المستخدمين لدعم الترقيم
  const getUsersData = async (roleFilter = "", page = 1) => {
    setLoading(true);
    try {
      // تحديث عنوان URL ليتوافق مع API
      let url = `https://complain.runasp.net/api/Account/GetUsers?PageNumber=${page}&PageSize=10`;

      // إضافة معلمة التصفية إذا تم تحديد دور
      if (roleFilter) {
        url += `&role=${roleFilter}`;
      }

      console.log("جاري جلب المستخدمين بالرابط:", url);

      const res = await axios.get(url, {
        headers: {
          Authorization: bearerToken,
        },
      });

      console.log("تم استلام البيانات:", res.data);
      setUsers(res.data.items || []);

      // تحديث معلومات الترقيم بناءً على هيكل البيانات الفعلي
      setPagination({
        currentPage: res.data.pageNumber || 1,
        totalPages: res.data.totalPages || 1,
        hasNextPage: res.data.hasNext || false,
        hasPreviousPage: res.data.hasPrevious || false,
      });
    } catch (err) {
      console.error(
        "حدث خطأ أثناء جلب المستخدمين:",
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  // جلب المستخدمين عند تحميل الصفحة - تعيين الفلتر الافتراضي على "مدير"
  useEffect(() => {
    setSelectedRole("Admin");
    getUsersData("Admin", 1);
  }, []);

  // وظائف التنقل بين الصفحات
  const goToNextPage = () => {
    if (pagination.hasNextPage) {
      getUsersData(
        selectedRole === "all" ? "" : selectedRole,
        pagination.currentPage + 1
      );
    }
  };

  const goToPreviousPage = () => {
    if (pagination.hasPreviousPage) {
      getUsersData(
        selectedRole === "all" ? "" : selectedRole,
        pagination.currentPage - 1
      );
    }
  };

  // معالجة تغيير التصفية
  const handleRoleFilterChange = (e) => {
    const roleValue = e.target.value;
    setSelectedRole(roleValue);
    // عند تغيير الفلتر، نعود للصفحة الأولى
    getUsersData(roleValue === "all" ? "" : roleValue, 1);
  };
  console.log(roles);
  // إضافة سجل تصحيح لفحص بيانات المستخدمين
  useEffect(() => {
    if (users.length > 0) {
      console.log("بيانات المستخدم الأول:", users[0]);
    }
  }, [users]);

  // تحديث طريقة عرض الدور
  const getRoleDisplay = (user) => {
    // استخدام قيمة الفلتر المحددة إذا كانت متاحة
    if (selectedRole && selectedRole !== "all") {
      if (selectedRole === "Admin") {
        return <span className="text-blue-600">مدير</span>;
      } else if (selectedRole === "Complainer") {
        return <span className="text-green-600">مشتكي</span>;
      } else if (selectedRole === "Employee") {
        return <span className="text-purple-600">موظف</span>;
      }
    }

    // محاولة استخراج الدور من خصائص المستخدم
    for (const key in user) {
      if (typeof user[key] === "string") {
        const value = user[key].toLowerCase();
        if (value.includes("admin")) {
          return <span className="text-blue-600">مدير</span>;
        } else if (value.includes("complainer")) {
          return <span className="text-green-600">مشتكي</span>;
        } else if (value.includes("employee")) {
          return <span className="text-purple-600">موظف</span>;
        }
      }
    }

    // إذا لم نتمكن من تحديد الدور، نستخدم الدور الافتراضي بناءً على الفلتر الحالي
    if (selectedRole === "Admin") {
      return <span className="text-blue-600">مدير</span>;
    } else if (selectedRole === "Complainer") {
      return <span className="text-green-600">مشتكي</span>;
    } else if (selectedRole === "Employee") {
      return <span className="text-purple-600">موظف</span>;
    }

    return <span className="text-gray-600">غير محدد</span>;
  };

  // إضافة وظيفة لتفعيل/إيقاف المستخدم
  const toggleUserStatus = async (email, isCurrentlyActive) => {
    if (
      !window.confirm(
        isCurrentlyActive
          ? "هل أنت متأكد من إيقاف هذا المستخدم؟"
          : "هل أنت متأكد من تفعيل هذا المستخدم؟"
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      // تحديد نوع الطلب بناءً على الحالة الحالية
      const endpoint = isCurrentlyActive
        ? `https://complain.runasp.net/api/Account/DisableUser?email=${encodeURIComponent(
            email
          )}`
        : `https://complain.runasp.net/api/Account/EnableUser?email=${encodeURIComponent(
            email
          )}`;

      console.log(
        `جاري ${isCurrentlyActive ? "إيقاف" : "تفعيل"} المستخدم:`,
        email
      );

      await axios.put(
        endpoint,
        {}, // جسم فارغ لأننا نستخدم معلمات الاستعلام
        {
          headers: {
            Authorization: bearerToken,
            "Content-Type": "application/json",
          },
        }
      );

      // تحديث قائمة المستخدمين بعد التغيير
      getUsersData(
        selectedRole === "all" ? "" : selectedRole,
        pagination.currentPage
      );

      alert(`تم ${isCurrentlyActive ? "إيقاف" : "تفعيل"} المستخدم بنجاح`);
    } catch (err) {
      console.error(
        `خطأ أثناء ${isCurrentlyActive ? "إيقاف" : "تفعيل"} المستخدم:`,
        err.response?.data || err.message
      );
      alert(`حدث خطأ أثناء ${isCurrentlyActive ? "إيقاف" : "تفعيل"} المستخدم`);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-md shadow-md">
        {/* <!-- العنوان --> */}
        <h1 className="text-center text-green-700 text-2xl font-bold mb-6">
          إدارة المستخدمين
        </h1>

        {/* <!-- الصف العلوي: تم تبديل الترتيب --> */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          {/* <!-- أزرار الراديو للتصفية حسب الدور --> */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="admin"
                name="role-filter"
                value="Admin"
                checked={selectedRole === "Admin"}
                onChange={handleRoleFilterChange}
                className="accent-green-600"
              />
              <label htmlFor="admin" className="text-gray-700 cursor-pointer">
                مدير
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="complainer"
                name="role-filter"
                value="Complainer"
                checked={selectedRole === "Complainer"}
                onChange={handleRoleFilterChange}
                className="accent-green-600"
              />
              <label
                htmlFor="complainer"
                className="text-gray-700 cursor-pointer"
              >
                مشتكي
              </label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="employee"
                name="role-filter"
                value="Employee"
                checked={selectedRole === "Employee"}
                onChange={handleRoleFilterChange}
                className="accent-green-600"
              />
              <label
                htmlFor="employee"
                className="text-gray-700 cursor-pointer"
              >
                موظف
              </label>
            </div>
          </div>

          {/* <!-- زر الإضافة على اليسار --> */}
          <button
            onClick={() => navigate("/signUpPage")}
            className="bg-green-700 hover:bg-green-800 transition duration-200 text-white font-semibold px-5 py-2 rounded-lg shadow flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 4v16m8-8H4" />
            </svg>
            <span>إضافة مستخدم جديد</span>
          </button>
        </div>

        {/* <!-- الجدول --> */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-4">جاري التحميل...</div>
          ) : (
            <>
              <table className="min-w-full border border-gray-200 text-right">
                <thead>
                  <tr className="bg-green-700 text-white text-sm">
                    <th className="py-2 px-4">الاسم</th>
                    <th className="py-2 px-4">البريد الإلكتروني</th>
                    <th className="py-2 px-4">الدور</th>
                    <th className="py-2 px-4">الحالة</th>
                    <th className="py-2 px-4 text-center">إجراءات</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr key={user.id} className="border-t">
                        <td className="py-2 px-4">{user.fullName}</td>
                        <td className="py-2 px-4">{user.email}</td>
                        <td className="py-2 px-4 font-medium">
                          {getRoleDisplay(user)}
                        </td>
                        <td
                          className={`py-2 px-4 font-medium ${
                            user.isActive ? "text-green-700" : "text-red-600"
                          }`}
                        >
                          {user.isActive ? "مفعل" : "غير مفعل"}
                        </td>
                        <td className="py-2 px-4 flex flex-wrap gap-2">
                          <button
                            onClick={() =>
                              toggleUserStatus(user.email, user.isActive)
                            }
                            disabled={loading}
                            className={`text-white text-xs px-3 py-1 rounded ${
                              user.isActive
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-green-500 hover:bg-green-600"
                            } transition duration-200`}
                          >
                            {user.isActive ? "إيقاف" : "تفعيل"}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="py-4 text-center text-gray-500"
                      >
                        لا يوجد مستخدمين للعرض
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* <!-- ترقيم الصفحات --> */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 gap-2">
                  <button
                    onClick={goToPreviousPage}
                    disabled={!pagination.hasPreviousPage || loading}
                    className={`px-3 py-1 rounded ${
                      pagination.hasPreviousPage && !loading
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    السابق
                  </button>

                  <span className="text-gray-600">
                    صفحة {pagination.currentPage} من {pagination.totalPages}
                  </span>

                  <button
                    onClick={goToNextPage}
                    disabled={!pagination.hasNextPage || loading}
                    className={`px-3 py-1 rounded ${
                      pagination.hasNextPage && !loading
                        ? "bg-green-600 text-white"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    التالي
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
