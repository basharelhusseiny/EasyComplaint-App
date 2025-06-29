import axios from "axios";
import { useEffect, useState } from "react";
import { useComplaintIdDetailsContext } from "../context/IdOfComplaintDetails";
import { jwtDecode } from "jwt-decode";

const ComplaintDetails = () => {
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;
  const [commentText, setCommentText] = useState("");
  const [complaint, setComplaint] = useState(null);
  const { CompDetailsId, setCompDetailsId } = useComplaintIdDetailsContext();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // استخراج دور المستخدم من التوكن
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const role = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        setUserRole(role);
      } catch (err) {
        console.error("خطأ في فك تشفير التوكن:", err);
      }
    }

    const fetchComplaint = async () => {
      try {
        const res = await axios.get(
          `https://complain.runasp.net/api/Complaint/GetComplaintByID?id=${CompDetailsId}`,
          {
            headers: {
              Authorization: bearerToken,
            },
          }
        );
        setComplaint(res.data);

        // تعيين الحالة المحددة بناءً على حالة الشكوى الحالية
        if (res.data.status === "InProgress") {
          setSelectedStatus("1"); // قيد التنفيذ
        } else if (res.data.status === "Resolved") {
          setSelectedStatus("4"); // تم الحل
        }
      } catch (err) {
        console.error(
          "حدث خطأ أثناء جلب الشكاوي:",
          err.response?.data || err.message
        );
      }
    };

    fetchComplaint();
  }, []);

  // تحويل حالة الشكوى من الإنجليزية إلى العربية
  const getArabicStatus = (englishStatus) => {
    switch (englishStatus) {
      case "Pending":
        return "معلق";
      case "InProgress":
        return "قيد التنفيذ";
      case "Resolved":
        return "تم الحل";
      default:
        return englishStatus;
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    
    // التحقق من وجود نص التعليق
    if (!commentText.trim()) {
      return;
    }
    
    try {
      const response = await axios.post(
        "https://complain.runasp.net/api/Comment/Add",
        {
          complaintID: CompDetailsId, // إضافة معرف الشكوى
          commentText: commentText,
        },
        {
          headers: {
            Authorization: bearerToken,
            "Content-Type": "application/json"
          },
        }
      );
      
      console.log("تم إضافة التعليق بنجاح:", response.data);
      
      // إعادة تعيين حقل التعليق
      setCommentText("");
      
      // يمكن إضافة تحديث للتعليقات هنا إذا كنت تريد عرض التعليق الجديد فورًا
      // fetchComments(); // وظيفة لجلب التعليقات المحدثة
      
    } catch (err) {
      console.log(
        "خطأ أثناء إرسال التعليق:",
        err.response?.data || err.message
      );
    }
  };

  // وظيفة تغيير حالة الشكوى
  const handleChangeStatus = async () => {
    if (!selectedStatus) return;

    setStatusLoading(true);
    setStatusMessage({ text: "", type: "" });

    try {
      await axios.put(
        "https://complain.runasp.net/api/Complaint/EditStatus",
        {
          complaintId: CompDetailsId,
          status: parseInt(selectedStatus),
        },
        {
          headers: {
            Authorization: bearerToken,
            "Content-Type": "application/json",
          },
        }
      );

      // تحديث حالة الشكوى محليًا
      const updatedComplaint = { ...complaint };
      if (selectedStatus === "1") {
        updatedComplaint.status = "InProgress";
      } else if (selectedStatus === "4") {
        updatedComplaint.status = "Resolved";
      }
      setComplaint(updatedComplaint);

      setStatusMessage({
        text: "تم تغيير حالة الشكوى بنجاح",
        type: "success",
      });

      // إعادة تعيين الحالة المحددة بناءً على الحالة الجديدة
      if (updatedComplaint.status === "InProgress") {
        setSelectedStatus("4"); // تم الحل
      }
    } catch (err) {
      console.error(
        "خطأ أثناء تغيير حالة الشكوى:",
        err.response?.data || err.message
      );
      setStatusMessage({
        text: err.response?.data?.message || "حدث خطأ أثناء تغيير حالة الشكوى",
        type: "error",
      });
    } finally {
      setStatusLoading(false);
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white border border-dashed border-green-600 p-6 w-full max-w-2xl rounded-md">
          <div className="mb-4">
            <h2 className="text-green-700 font-bold text-xl mb-1">
              تفاصيل الشكوى
            </h2>
            <div className="flex justify-between items-center">
              <div className="space-y-4">
                <h3 className="text-gray-800 font-semibold text-lg">
                  {complaint?.complaintTypeName || "عنوان الشكوى"}
                </h3>
                <h5 className="text-gray-800 font-semibold text-l">
                  <span
                    className={`px-2 py-1 rounded-md text-white text-sm ${
                      complaint?.status === "Pending"
                        ? "bg-yellow-600"
                        : complaint?.status === "InProgress"
                        ? "bg-blue-600"
                        : complaint?.status === "Resolved"
                        ? "bg-green-700"
                        : "bg-gray-500"
                    }`}
                  >
                    {getArabicStatus(complaint?.status) || "تصنيف"}
                  </span>
                </h5>
                <p className="text-gray-800  mt-1">
                  {complaint?.description || "وصف الشكوى"}
                </p>
              </div>

              {/* عرض خيارات تغيير الحالة فقط للموظفين */}
              {userRole === "Employee" && complaint?.status !== "Resolved" && (
                <div className="flex flex-col space-y-2">
                  {statusMessage.text && (
                    <div
                      className={`text-xs p-1 rounded ${
                        statusMessage.type === "success"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {statusMessage.text}
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-600"
                      disabled={statusLoading}
                    >
                      <option value="" disabled>
                        اختر الحالة
                      </option>
                      {complaint?.status === "Pending" && (
                        <option value="1">قيد التنفيذ</option>
                      )}
                      {(complaint?.status === "Pending" ||
                        complaint?.status === "InProgress") && (
                        <option value="4">تم الحل</option>
                      )}
                    </select>
                    <button
                      onClick={handleChangeStatus}
                      disabled={!selectedStatus || statusLoading}
                      className={`px-3 py-1 rounded-md text-white text-sm ${
                        !selectedStatus || statusLoading
                          ? "bg-gray-400"
                          : "bg-green-600 hover:bg-green-700"
                      }`}
                    >
                      {statusLoading ? "جاري..." : "تغيير"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleComment} className="my-6">
            <h4 className="font-semibold text-gray-700 mb-2">إضافة تعليق</h4>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              rows="3"
              placeholder="أدخل تعليقك"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            <button className="bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 w-full">
              إضافة تعليق
            </button>
          </form>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-700 mb-2">التعليقات</h4>
            <div className="bg-gray-100 p-3 rounded-md">
              <p className="text-sm text-gray-600">
                أنا أتفهم مخاوفك، نحن نعمل على تقليل الضوضاء.
              </p>
              {/* <p className="text-xs text-gray-400 mt-1">منذ ساعة</p> */}
            </div>
          </div>

          <button className="w-full border border-green-600 text-green-700 py-2 px-4 rounded-md hover:bg-green-50">
            إغلاق الشكوى
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;
