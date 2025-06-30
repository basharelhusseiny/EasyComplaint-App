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

  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  // إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      // إنشاء كائن البيانات مع قيم افتراضية للحقول غير المستخدمة
      const formData = {
        stepName: "خطوة افتراضية", // قيمة افتراضية
        complaintTypeID: CompId,
        stepOrder: 1, // قيمة افتراضية
        userEmail: userEmail,
      };

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

      console.log("تم إضافة المستخدم بنجاح:", response.data);
      setMessage({ text: "تم إضافة المستخدم بنجاح", type: "success" });

      // إعادة تعيين النموذج
      setUserEmail("");
      
      // الانتقال إلى صفحة تفاصيل المستخدم بعد فترة قصيرة
      setTimeout(() => {
        navigate("/userDetails");
      }, 1500);
    } catch (err) {
      console.log(
        "خطأ أثناء إضافة المستخدم:",
        err.response?.data || err.message
      );
      setMessage({
        text: err.response?.data?.message || "حدث خطأ أثناء إضافة المستخدم",
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
          {/* البريد الإلكتروني للمستخدم */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              البريد الإلكتروني للمستخدم
            </label>
            <input
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="أدخل البريد الإلكتروني للمستخدم"
              required
            />
          </div>

          {/* زر الإرسال */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white rounded-md transition duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "جاري الإرسال..." : "إضافة مستخدم"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddWorkflow;


