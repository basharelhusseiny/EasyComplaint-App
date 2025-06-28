import React, { useState, useEffect } from "react";
import axios from "axios";
import { useComplaintIdContext } from "../context/ComplaintIdContext";
import { useNavigate } from "react-router";

const AddWorkflow = () => {
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;
  const { CompId } = useComplaintIdContext();
  const navigate = useNavigate()
  console.log(CompId);

  const [formData, setFormData] = useState({
    stepName: "",
    complaintTypeID: CompId,
    stepOrder: 0,
    userEmail: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  // تحديث بيانات النموذج
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "complaintTypeID" || name === "stepOrder"
          ? parseInt(value)
          : value,
    });
  };

  // إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await axios.post(
        "https://complain.runasp.net/api/Workflow/Create",
        formData,
        {
          headers: {
            Authorization: bearerToken,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("تم إنشاء خطوة العمل بنجاح:", response.data);
      setMessage({ text: "تم إنشاء خطوة العمل بنجاح", type: "success" });

      // إعادة تعيين النموذج
      setFormData({
        stepName: "",
        complaintTypeID: CompId,
        stepOrder: 0,
        userEmail: "",
      });
    } catch (err) {
      console.log(
        "خطأ أثناء إنشاء خطوة العمل:",
        err.response?.data || err.message
      );
      setMessage({
        text: err.response?.data?.message || "حدث خطأ أثناء إنشاء خطوة العمل",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold text-green-600 text-center mb-4">
          إضافة مستخدم
        </h2>

        {/* رسالة النجاح أو الخطأ */}
        {message.text && (
          <div
            className={`p-3 mb-4 rounded-md text-center ${
              message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* اسم الخطوة */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              اسم الخطوة
            </label>
            <input
              type="text"
              name="stepName"
              value={formData.stepName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="أدخل اسم الخطوة"
              required
            />
          </div>

          {/* ترتيب الخطوة */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ترتيب الخطوة
            </label>
            <input
              type="number"
              name="stepOrder"
              value={formData.stepOrder}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="أدخل ترتيب الخطوة"
              min="0"
              required
            />
          </div>

          {/* البريد الإلكتروني للمستخدم */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              البريد الإلكتروني للمستخدم
            </label>
            <input
              type="email"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="أدخل البريد الإلكتروني للمستخدم"
              required
            />
          </div>

          {/* زر الإرسال */}
          <button
          onClick={()=>navigate("/userDetails")}
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white rounded-md transition duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "جاري الإرسال..." : " أضافه مستخدم"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddWorkflow;

