import axios from "axios";
import { useEffect, useState } from "react";
import { useComplaintIdDetailsContext } from "../context/IdOfComplaintDetails";
import { jwtDecode } from "jwt-decode";

const ComplaintDetails = () => {
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;
  const [commentText, setCommentText] = useState("");
  const [complaint, setComplaint] = useState(null);
  const { CompDetailsId } = useComplaintIdDetailsContext();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [statusLoading, setStatusLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });
  const [userRole, setUserRole] = useState("");

  const [comments, setComments] = useState([]);
  const [escalateComment, setEscalateComment] = useState("");
  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const [escalateLoading, setEscalateLoading] = useState(false);
  const [escalateMessage, setEscalateMessage] = useState({
    text: "",
    type: "",
  });

  // استخراج دور المستخدم من التوكن
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const role =
          decoded[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        setUserRole(role);
      } catch (err) {
        console.error("خطأ في فك تشفير التوكن:", err);
      }
    }
  }, [token]);

  // جلب تفاصيل الشكوى
  useEffect(() => {
    if (!CompDetailsId) return;

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

        if (res.data.comments) {
          setComments(res.data.comments);
        }

        if (res.data.status === "InProgress") {
          setSelectedStatus("1");
        } else if (res.data.status === "Resolved") {
          setSelectedStatus("4");
        }
      } catch (err) {
        console.error(
          "حدث خطأ أثناء جلب الشكوى:",
          err.response?.data || err.message
        );
      }
    };

    fetchComplaint();
  }, [CompDetailsId]);

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

    if (!commentText.trim()) return;

    try {
      await axios.post(
        "https://complain.runasp.net/api/Comment/Add-Comment-For-User",
        {
          complaintID: CompDetailsId,
          commentText,
        },
        {
          headers: {
            Authorization: bearerToken,
            "Content-Type": "application/json",
          },
        }
      );

      setComments((prev) => [
        ...prev,
        { commentText, createdAt: new Date().toISOString() },
      ]);
      setCommentText("");
    } catch (err) {
      console.error(
        "خطأ أثناء إرسال التعليق:",
        err.response?.data || err.message
      );
    }
  };
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

      const updatedComplaint = { ...complaint };
      if (selectedStatus === "1") {
        updatedComplaint.status = "InProgress";
        setSelectedStatus("4");
      } else if (selectedStatus === "4") {
        updatedComplaint.status = "Resolved";
      }

      setComplaint(updatedComplaint);
      setStatusMessage({ text: "تم تغيير حالة الشكوى بنجاح", type: "success" });
    } catch (err) {
      setStatusMessage({
        text:
          err.response?.data?.message || "حدث خطأ أثناء تغيير حالة الشكوى",
        type: "error",
      });
    } finally {
      setStatusLoading(false);
    }
  };

  const handleEscalate = async () => {
    setEscalateLoading(true);
    setEscalateMessage({ text: "", type: "" });

    try {
      await axios.put(
        `https://complain.runasp.net/api/Complaint/Escalate?ComplaintID=${CompDetailsId}&Comment=${encodeURIComponent(
          escalateComment || ""
        )}`,
        {},
        {
          headers: {
            Authorization: bearerToken,
            "Content-Type": "application/json",
          },
        }
      );

      setEscalateMessage({ text: "تم تصعيد الشكوى بنجاح", type: "success" });

      setTimeout(() => {
        setShowEscalateModal(false);
        setEscalateComment("");
      }, 1500);
    } catch (err) {
      setEscalateMessage({
        text:
          err.response?.data?.message || "حدث خطأ أثناء تصعيد الشكوى",
        type: "error",
      });
    } finally {
      setEscalateLoading(false);
    }
  };
console.log(complaint)
  return (
    <div className="bg-gray-100">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white border border-dashed border-green-600 p-6 w-full max-w-2xl rounded-md">
          <div className="mb-4">
            <h2 className="text-green-700 font-bold text-xl mb-1">
              تفاصيل الشكوى
            </h2>

            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <h3 className="text-gray-800 font-semibold text-lg">
                  {complaint?.complaintTypeName || "عنوان الشكوى"}
                </h3>
                <h5>
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
                    {getArabicStatus(complaint?.status)}
                  </span>
                </h5>
                <p className="text-gray-800">{complaint?.description}</p>
              </div>

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
                      className="border border-gray-300 rounded-md p-1 text-sm"
                      disabled={statusLoading}
                    >
                      <option value="">اختر الحالة</option>
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
              className="w-full border border-gray-300 rounded-md p-2 mb-3"
              rows="3"
              placeholder="أدخل تعليقك"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            <button className="bg-green-700 text-white py-2 px-4 rounded-md w-full">
              إضافة تعليق
            </button>
          </form>

          <div className="mb-6">
            <h4 className="font-semibold text-gray-700 mb-2">التعليقات</h4>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className="bg-gray-100 p-3 rounded-md mb-2">
                  <p className="text-gray-900">{comment.fullName}</p>
                  <p className="text-sm text-gray-700">{comment.commentText}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {comment.createdAt}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">لا توجد تعليقات بعد.</p>
            )}
          </div>

          <div className="flex gap-2">
            <button className="flex-1 border border-green-600 text-green-700 py-2 px-4 rounded-md hover:bg-green-50">
              إغلاق الشكوى
            </button>

            {userRole === "Employee" && (
              <button
                onClick={() => setShowEscalateModal(true)}
                className="flex-1 bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800"
              >
                تصعيد الشكوى
              </button>
            )}
          </div>

          {showEscalateModal && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  تصعيد الشكوى
                </h3>

                {escalateMessage.text && (
                  <div
                    className={`mb-4 p-2 rounded ${
                      escalateMessage.type === "success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {escalateMessage.text}
                  </div>
                )}

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">
                    تعليق التصعيد (اختياري)
                  </label>
                  <textarea
                    value={escalateComment}
                    onChange={(e) => setEscalateComment(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-2"
                    rows="3"
                    placeholder="أدخل سبب التصعيد (اختياري)"
                  ></textarea>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowEscalateModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                    disabled={escalateLoading}
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={handleEscalate}
                    disabled={escalateLoading}
                    className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700"
                  >
                    {escalateLoading ? "جاري التصعيد..." : "تصعيد"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetails;
