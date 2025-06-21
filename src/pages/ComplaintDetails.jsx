import axios from "axios";
import { useEffect, useState } from "react";
import { useComplaintIdContext } from "../context/ComplaintIdContext";

const ComplaintDetails = () => {
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;
  const { CompId } = useComplaintIdContext();
  const [commentText, setCommentText] = useState("");
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const res = await axios.get(
          `https://complain.runasp.net/api/Complaint/GetComplaintByID?id=${CompId}`,
          {
            headers: {
              Authorization: bearerToken,
            },
          }
        );
        setComplaint(res.data);
      } catch (err) {
        console.error(
          "حدث خطأ أثناء جلب الشكاوي:",
          err.response?.data || err.message
        );
      }
    };

    fetchComplaint();
  }, []);
  const handleComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://complain.runasp.net/api/Comment/Add",
        {
          complaintID: Number(CompId),
          commentText: commentText,
        },
        {
          headers: {
            Authorization: bearerToken,
          },
        }
      );
      setCommentText("");
    } catch (err) {
      console.log(
        "خطأ أثناء إرسال التعليق:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white border border-dashed border-blue-500 p-6 w-full max-w-2xl rounded-md">
          <div className="mb-4">
            <h2 className="text-green-700 font-bold text-xl mb-1">
              تفاصيل الشكوى
            </h2>
            <h3 className="text-gray-800 font-semibold text-lg">
              {complaint?.complaintTypeName || "عنوان الشكوى"}
            </h3>
            <h5 className="text-gray-800 font-semibold text-l">
              {complaint?.status === "Pending" ? "معلق" : "" || "تصنيف"}
            </h5>
            <p className="text-gray-600 text-sm mt-1">
              {complaint?.description || "وصف الشكوى"}
            </p>
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
