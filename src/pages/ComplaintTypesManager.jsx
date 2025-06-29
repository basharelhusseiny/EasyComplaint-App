import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useComplaintIdContext } from "../context/ComplaintIdContext";

const ComplaintTypesManager = () => {
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState("");
  const [complaintType, setComplaintType] = useState([]);
  const [typeName, setTypeName] = useState("");
  const navigate = useNavigate();
  const { CompId, setCompId } = useComplaintIdContext();
  // إضافة حالات جديدة للتعديل
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });

  // إضافة حالات الترقيم
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const fetchComplaintType = async () => {
    try {
      const res = await axios.get(
        "https://complain.runasp.net/api/Complaint/GetAllComplaintType",
        {
          headers: {
            Authorization: bearerToken,
          },
        }
      );
      setComplaintType(res.data);
    } catch (err) {
      console.log("خطأ في جلب أنواع الشكاوى:", err);
    }
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get(
          "https://complain.runasp.net/api/Department/Get-All-Department"
        );
        setDepartments(res.data);
      } catch (err) {
        console.error("حدث خطأ أثناء جلب الأقسام:", err);
      }
    };

    fetchDepartments();
    fetchComplaintType();
  }, []);

  // وظيفة بدء التعديل
  const handleEdit = (comp) => {
    setEditMode(true);
    setEditId(comp.id);
    setTypeName(comp.typeName);
    setDepartmentId(comp.departmentId || "");
  };

  // For post Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    try {
      if (editMode) {
        // تحديث نوع الشكوى
        await axios.post(
          "https://complain.runasp.net/api/ComplaintType/Update-ComplaintType",
          {
            id: editId,
            typeName: typeName,
          },
          {
            headers: {
              Authorization: bearerToken,
              "Content-Type": "application/json",
            },
          }
        );

        setMessage({ text: "تم تحديث نوع الشكوى بنجاح", type: "success" });
        setEditMode(false);
        setEditId(null);
      } else {
        // إضافة نوع شكوى جديد
        await axios.post(
          "https://complain.runasp.net/api/ComplaintType/AddComplaintType",
          {
            typeName,
            departmentId: Number(departmentId),
          },
          {
            headers: {
              Authorization: bearerToken,
            },
          }
        );

        setMessage({ text: "تمت إضافة نوع الشكوى بنجاح", type: "success" });
      }

      setTypeName("");
      setDepartmentId("");
      await fetchComplaintType();
    } catch (error) {
      console.log(error);
      setMessage({
        text: error.response?.data?.message || "حدث خطأ أثناء العملية",
        type: "error",
      });
    }
  };

  const clearData = () => {
    setDepartmentId("");
    setTypeName("");
    setEditMode(false);
    setEditId(null);
    setMessage({ text: "", type: "" });
  };

  // حساب الصفحات والعناصر المعروضة
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = complaintType.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(complaintType.length / itemsPerPage);

  // وظائف التنقل بين الصفحات
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen px-5">
      {/* <!-- Manage Users Card --> */}
      <div className="bg-white p-8 my-7 rounded-lg shadow-lg w-full max-w-[700px]">
        {/* <!-- Title --> */}
        <h1 className="text-2xl font-bold text-green-600 text-right mb-4">
          {editMode ? "تعديل نوع الشكوى" : "إدأرة انواع الشكاوي"}
        </h1>

        <h3 className="text-l font-bold text-gray-400 text-right mb-6">
          {editMode
            ? "يرجى تعديل بيانات نوع الشكوى"
            : "يرجي ادخال نوع الشكوى وتحديد القسم التابع لها"}
        </h3>

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

        {/* <!-- Form Fields --> */}
        <div className="space-y-4">
          {/* <!-- Name --> */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              نوع الشكاوي
            </label>
            <input
              type="text"
              id="name"
              value={typeName}
              onChange={(e) => setTypeName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="مثلا: انقطاع الخدمه"
            />
          </div>
          {/* <!-- User Type --> */}
          <div>
            <label
              htmlFor="user-type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              اسم القسم
            </label>
            {/* القسم */}
            <div>
              <select
                value={departmentId}
                onChange={(e) => setDepartmentId(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={editMode} // تعطيل تغيير القسم في وضع التعديل
              >
                <option value="">اختر القسم</option>
                {departments.map((dep) => (
                  <option key={dep.id} value={dep.id}>
                    {dep.departmentName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* <!-- Buttons --> */}
          <div className="flex justify-between space-x-4">
            {/* <!-- Add/Update Button --> */}
            <button
              onClick={handleSubmit}
              className="w-1/2 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
            >
              {editMode ? "تحديث" : "إضافة"}
            </button>
            {/* <!-- Cancel Button --> */}
            <button
              onClick={clearData}
              className="w-1/2 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-200"
            >
              إلغاء
            </button>
          </div>
        </div>

        {/* <!-- Bottom Section with Table --> */}
        <div className="mt-6 overflow-auto">
          {/* <!-- Table --> */}
          <table className="w-full">
            <thead>
              <tr className="bg-green-600">
                <th className=" p-2 text-right text-white">نوع الشكوى</th>
                <th className=" p-2 text-right text-white">القسم</th>
                <th className=" p-2 text-right text-white">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((comp) => (
                <tr key={comp.id}>
                  <td className="border border-gray-200 p-2 text-right">
                    {comp.typeName}
                  </td>
                  <td className="border border-gray-200 p-2 text-right">
                    {comp.departmentName}
                  </td>
                  <td className="border border-gray-200 p-2 text-right">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(comp)}
                        className="px-2 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
                      >
                        تعديل
                      </button>
                      <button
                        onClick={() => {
                          setCompId(comp.id);
                          navigate("/userDetails");
                        }}
                        className="px-2 py-1 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition duration-200"
                      >
                        التفاصيل
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* <!-- Pagination --> */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-4 gap-2">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage <= 1}
                className={`px-3 py-1 rounded ${
                  currentPage > 1
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                السابق
              </button>

              <span className="text-gray-600">
                صفحة {currentPage} من {totalPages}
              </span>

              <button
                onClick={goToNextPage}
                disabled={currentPage >= totalPages}
                className={`px-3 py-1 rounded ${
                  currentPage < totalPages
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                التالي
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintTypesManager;
