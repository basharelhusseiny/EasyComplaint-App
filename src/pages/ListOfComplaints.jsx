import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useComplaintIdDetailsContext } from "../context/IdOfComplaintDetails";

const ListOfComplaints = () => {
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;
  const { CompDetailsId, setCompDetailsId } = useComplaintIdDetailsContext();
  const [complaints, setComplaints] = useState([]);
  const [pagination, setPagination] = useState({
    count: 0,
    totalPages: 1,
    currentPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  });
  const [activeStatus, setActiveStatus] = useState("معلق");
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const navigate = useNavigate();

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

  // تحويل الحالة العربية إلى الإنجليزية للتصفية
  const getEnglishStatus = (arabicStatus) => {
    switch (arabicStatus) {
      case "معلق":
        return "Pending";
      case "قيد التنفيذ":
        return "InProgress";
      case "تم الحل":
        return "Resolved";
      default:
        return arabicStatus;
    }
  };

  const fetchComplaints = async (page) => {
    setLoading(true);
    try {
      console.log(`جاري جلب الصفحة ${page}...`);

      const response = await axios.get(
        `https://complain.runasp.net/api/Complaint/MyComplaints`,
        {
          headers: {
            Authorization: bearerToken,
            "Cache-Control": "no-cache",
          },
        }
      );

      console.log("استجابة API:", response.data);

      // تحديث البيانات
      setComplaints(response.data.items);
      setPagination({
        count: response.data.count,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage,
        hasNextPage: response.data.hasNextPage,
        hasPreviousPage: response.data.hasPreviousPage,
      });
    } catch (error) {
      console.error("خطأ في جلب الشكاوى:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // استدعاء API عند تغيير رقم الصفحة
  useEffect(() => {
    fetchComplaints(pageNumber);
  }, [pageNumber]);

  // تغيير الحالة النشطة
  const changeStatus = (status) => {
    setActiveStatus(status);
    // عند تغيير الحالة، نعود للصفحة الأولى
    setPageNumber(1);
  };

  // الانتقال إلى الصفحة التالية
  const goToNextPage = () => {
    if (pageNumber < pagination.totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  // الانتقال إلى الصفحة السابقة
  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  // تصفية الشكاوى حسب الحالة
  const filteredComplaints = complaints.filter(
    (comp) => getArabicStatus(comp.status) === activeStatus
  );

  // حساب عدد الشكاوى لكل حالة
  const countByStatus = {
    "معلق": complaints.filter(comp => getArabicStatus(comp.status) === "معلق").length,
    "قيد التنفيذ": complaints.filter(comp => getArabicStatus(comp.status) === "قيد التنفيذ").length,
    "تم الحل": complaints.filter(comp => getArabicStatus(comp.status) === "تم الحل").length
  };

  return (
    <div className="bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto border-2 border-blue-500 p-4 bg-white rounded-md shadow-md">
        <div className="border-2 border-blue-500 border-dashed p-4 rounded-md">
          <div className="mb-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              قائمة الشكاوى{" "}
              {loading && (
                <span className="text-sm text-gray-500">(جاري التحميل...)</span>
              )}
            </h1>
            <div className="flex gap-2 text-sm font-medium">
              <button
                className={`${
                  activeStatus === "معلق"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700"
                } px-3 py-1 rounded`}
                onClick={() => changeStatus("معلق")}
              >
                معلق ({countByStatus["معلق"]})
              </button>
              <button
                className={`${
                  activeStatus === "قيد التنفيذ"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700"
                } px-3 py-1 rounded`}
                onClick={() => changeStatus("قيد التنفيذ")}
              >
                قيد التنفيذ ({countByStatus["قيد التنفيذ"]})
              </button>
              <button
                className={`${
                  activeStatus === "تم الحل"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700"
                } px-3 py-1 rounded`}
                onClick={() => changeStatus("تم الحل")}
              >
                تم الحل ({countByStatus["تم الحل"]})
              </button>
            </div>
          </div>

          {/* <!-- قائمة الشكاوى --> */}
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8 text-gray-500">
                جاري تحميل الشكاوى...
              </div>
            ) : filteredComplaints.length > 0 ? (
              filteredComplaints.map((comp) => (
                <div
                  key={comp.id}
                  className="flex justify-between items-center border p-4 rounded-lg shadow-sm"
                >
                  <div>
                    <h2
                      onClick={() => {
                        navigate("/complaintDetails");
                        setCompDetailsId(comp.id);
                      }}
                      className="text-lg font-semibold text-gray-800 hover:text-green-600 cursor-pointer duration-200"
                    >
                      {comp.complaintTypeName}
                    </h2>
                    <p className="text-sm text-gray-500">{comp.title}</p>
                  </div>
                  <span
                    className={`${
                      activeStatus === "معلق"
                        ? "bg-yellow-600"
                        : activeStatus === "قيد التنفيذ"
                        ? "bg-blue-600"
                        : "bg-green-700"
                    } text-white text-xs px-3 py-1 rounded`}
                  >
                    {activeStatus}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                لا توجد شكاوى {activeStatus}
              </div>
            )}
          </div>

          {/* <!-- Pagination --> */}
          {pagination.totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 gap-2">
              <button
                onClick={goToPreviousPage}
                disabled={pageNumber <= 1 || loading}
                className={`px-3 py-1 rounded ${
                  pageNumber > 1 && !loading
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                السابق
              </button>

              <span className="text-gray-600">
                صفحة {pageNumber} من {pagination.totalPages}
              </span>

              <button
                onClick={goToNextPage}
                disabled={pageNumber >= pagination.totalPages || loading}
                className={`px-3 py-1 rounded ${
                  pageNumber < pagination.totalPages && !loading
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                التالي
              </button>
            </div>
          )}

          {/* معلومات التصحيح - يمكن إزالتها بعد حل المشكلة */}
          <div className="mt-4 text-xs text-gray-400 border-t pt-2">
            رقم الصفحة: {pageNumber} | الصفحة الحالية من API:{" "}
            {pagination.currentPage} | إجمالي الصفحات: {pagination.totalPages} |
            عدد العناصر: {pagination.count}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOfComplaints;
