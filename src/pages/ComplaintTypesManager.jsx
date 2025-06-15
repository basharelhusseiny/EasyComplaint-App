import axios from "axios";
import React, { useEffect, useState } from "react";

const ComplaintTypesManager = () => {
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState("");
  const [complaintType, setComplaintType] = useState([]);
  const [typeName, setTypeName] = useState("");

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

  // For post Data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
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
      setTypeName("");
      setDepartmentId("");
      await fetchComplaintType();
    } catch (error) {
      console.log(error);
    }
  };
  const clearData = () => {
    setDepartmentId("");
    setTypeName("");
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen px-5">
      {/* <!-- Manage Users Card --> */}
      <div className="bg-white p-8 my-7 rounded-lg shadow-lg w-full max-w-[700px]">
        {/* <!-- Title --> */}
        <h1 className="text-2xl font-bold text-green-600 text-right mb-4">
          إدأرة انواع الشكاوي
        </h1>

        <h3 className="text-l font-bold text-gray-400 text-right mb-6">
          يرجي ادخال نوع الشكوى وتحديد القسم التابع لها
        </h3>

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
            {/* <!-- Add Button --> */}
            <button
              onClick={handleSubmit}
              className="w-1/2 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
            >
              إضافة
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
        <div className="mt-6">
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
              {complaintType.map((comp) => {
                return (
                  <tr key={comp.id}>
                    <td className=" border border-gray-200 p-2 text-right">
                      {comp.typeName}
                    </td>
                    <td className=" border border-gray-200 p-2 text-right">
                      {comp.departmentName}
                    </td>
                    <td className=" border border-gray-200 p-2 text-right">
                      <div className="flex space-x-2">
                        <button className="px-2 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200">
                          تعديل
                        </button>
                        <button className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200">
                          حذف
                        </button>
                        <button className="px-2 py-1 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition duration-200">
                          التفاصيل
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComplaintTypesManager;
