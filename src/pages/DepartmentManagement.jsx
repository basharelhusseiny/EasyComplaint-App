import axios from "axios";
import React, { useEffect, useState } from "react";

const DepartmentManagement = () => {
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;
  const [depData, setDepData] = useState([]);
  const [departmentName, setDepartmentName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [editMode, setEditMode] = useState(false);
  const [currentDepartmentId, setCurrentDepartmentId] = useState(null);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get(
        `https://complain.runasp.net/api/Department/Get-All-Department`,
        {
          headers: {
            Authorization: bearerToken,
          },
        }
      );
      setDepData(res.data);
    } catch (err) {
      console.error(
        "حدث خطأ أثناء جلب الاقسام:",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // إضافة قسم جديد
  const handleAddDepartment = async (e) => {
    e.preventDefault();

    if (!departmentName.trim()) {
      setMessage({ text: "يرجى إدخال اسم القسم", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      if (editMode) {
        // تحديث قسم موجود
        const response = await axios.put(
          "https://complain.runasp.net/api/Department/Update-Department",
          {
            id: currentDepartmentId,
            departmentName,
          },
          {
            headers: {
              Authorization: bearerToken,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("تم تحديث القسم بنجاح:", response.data);
        setMessage({ text: "تم تحديث القسم بنجاح", type: "success" });
        setEditMode(false);
        setCurrentDepartmentId(null);
      } else {
        // إضافة قسم جديد
        const response = await axios.post(
          "https://complain.runasp.net/api/Department/Create-Department",
          { departmentName },
          {
            headers: {
              Authorization: bearerToken,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("تمت إضافة القسم بنجاح:", response.data);
        setMessage({ text: "تمت إضافة القسم بنجاح", type: "success" });
      }

      setDepartmentName("");

      // إعادة تحميل قائمة الأقسام
      fetchDepartments();
    } catch (error) {
      console.error(
        editMode ? "خطأ في تحديث القسم:" : "خطأ في إضافة القسم:",
        error.response?.data || error.message
      );
      setMessage({
        text:
          error.response?.data?.message ||
          (editMode
            ? "حدث خطأ أثناء تحديث القسم"
            : "حدث خطأ أثناء إضافة القسم"),
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // تحميل بيانات القسم للتعديل
  const handleEdit = (department) => {
    setEditMode(true);
    setCurrentDepartmentId(department.id);
    setDepartmentName(department.departmentName);
    setMessage({ text: "", type: "" });

    // التمرير إلى أعلى الصفحة للوصول إلى نموذج التعديل
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // مسح البيانات وإلغاء وضع التعديل
  const handleClear = (e) => {
    e.preventDefault();
    setDepartmentName("");
    setMessage({ text: "", type: "" });
    setEditMode(false);
    setCurrentDepartmentId(null);
  };

  return (
    <div className="bg-gray-100 font-sans">
      <div className="min-h-screen flex items-center justify-center px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-3xl">
          <header className="mb-6">
            <h2 className="text-green-700 text-2xl font-bold mb-1">
              {editMode ? "تعديل القسم" : "إدارة الأقسام"}
            </h2>
            <p className="text-gray-600">
              {editMode ? "يرجى تعديل بيانات القسم" : "يرجى تعبئة بيانات القسم"}
            </p>
          </header>

          <form className="mb-6">
            <label
              className="block text-gray-700 font-semibold mb-1"
              htmlFor="sectionName"
            >
              اسم القسم
            </label>
            <input
              id="sectionName"
              type="text"
              placeholder="مثلاً: الدعم الفني"
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-600 mb-4"
            />

            {message.text && (
              <div
                className={`p-2 mb-4 rounded ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {message.text}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddDepartment}
                disabled={loading}
                className={`text-white py-2 px-4 rounded-md hover:bg-green-800 flex-1 ${
                  loading ? "bg-green-500 cursor-not-allowed" : "bg-green-700"
                }`}
              >
                {loading ? "جاري المعالجة..." : editMode ? "تحديث" : "إضافة"}
              </button>
              <button
                onClick={handleClear}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 flex-1"
              >
                {editMode ? "إلغاء التعديل" : "إلغاء"}
              </button>
            </div>
          </form>

          <section className="overflow-x-auto">
            <table className="w-full border-collapse rounded-md overflow-hidden text-right">
              <thead>
                <tr className="bg-green-700 text-white">
                  <th className="py-3 px-4 text-sm sm:text-base">اسم القسم</th>
                  <th className="py-3 px-4 text-sm sm:text-base">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {depData.map((dep) => (
                  <tr
                    key={dep.id}
                    className={
                      currentDepartmentId === dep.id ? "bg-green-50" : ""
                    }
                  >
                    <td className="py-3 px-4 font-medium">{dep.departmentName}</td>
                    <td className="py-3 px-4 flex flex-wrap gap-2">
                      <button
                        onClick={() => handleEdit(dep)}
                        className="bg-green-700 text-white text-sm py-1 px-3 rounded hover:bg-green-800"
                      >
                        تعديل
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DepartmentManagement;
