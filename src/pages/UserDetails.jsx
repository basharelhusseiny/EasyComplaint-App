import React, { useEffect, useState } from "react";
import { useComplaintIdContext } from "../context/ComplaintIdContext";
import axios from "axios";
import { useNavigate } from "react-router";

const UserDetails = () => {
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;
  const [usersDetails, setUsersDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();
  const { CompId } = useComplaintIdContext();
  
  // حالات التعديل
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({
    workflowId: null,
    userEmail: ""
  });
  
  // حالات تبديل البريد الإلكتروني
  const [swapData, setSwapData] = useState({
    email1: "",
    email2: ""
  });

  const fetchUsersDetails = async () => {
    try {
      const res = await axios.get(
        `https://complain.runasp.net/api/Workflow/GetByComplaintType/${CompId}`,
        {
          headers: {
            Authorization: bearerToken,
          },
        }
      );
      setUsersDetails(res.data);
    } catch (err) {
      console.log("خطأ في جلب تفاصيل المستخدمين:", err);
    }
  };

  useEffect(() => {
    fetchUsersDetails();
  }, []);

  // وظيفة تبديل البريد الإلكتروني
  const handleSwapEmails = async (e) => {
    e.preventDefault();
    
    if (!swapData.email1 || !swapData.email2) {
      setMessage({ text: "يرجى اختيار المستخدمين للتبديل", type: "error" });
      return;
    }
    
    setLoading(true);
    
    try {
      await axios.put(
        "https://complain.runasp.net/api/Workflow/SwapUserToUser",
        {
          complaintTypeId: CompId,
          email1: swapData.email1,
          email2: swapData.email2
        },
        {
          headers: {
            Authorization: bearerToken,
            "Content-Type": "application/json"
          }
        }
      );
      
      setMessage({ text: "تم تبديل البريد الإلكتروني بنجاح", type: "success" });
      
      // إعادة تعيين النموذج
      setSwapData({
        email1: "",
        email2: ""
      });
      
      // تحديث القائمة بعد التبديل
      fetchUsersDetails();
    } catch (err) {
      console.log("خطأ أثناء تبديل البريد الإلكتروني:", err.response?.data || err.message);
      setMessage({
        text: err.response?.data?.message || "حدث خطأ أثناء تبديل البريد الإلكتروني",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  // وظيفة بدء التعديل
  const handleEdit = (user) => {
    setEditMode(true);
    setEditData({
      workflowId: user.workflowId,
      userEmail: user.userEmail
    });
    setMessage({ text: "", type: "" });
  };

  // وظيفة إلغاء التعديل
  const handleCancelEdit = () => {
    setEditMode(false);
    setEditData({
      workflowId: null,
      userEmail: ""
    });
    setMessage({ text: "", type: "" });
  };

  // وظيفة تحديث البريد الإلكتروني
  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    
    if (!editData.userEmail) {
      setMessage({ text: "يرجى إدخال البريد الإلكتروني الجديد", type: "error" });
      return;
    }
    
    setLoading(true);
    
    try {
      // استخدام المسار الصحيح مع معلمات الاستعلام
      await axios.put(
        `https://complain.runasp.net/api/Workflow/UpdateUser?workflowId=${editData.workflowId}&userEmail=${encodeURIComponent(editData.userEmail)}`,
        {}, // جسم فارغ لأننا نستخدم معلمات الاستعلام
        {
          headers: {
            Authorization: bearerToken,
            "Content-Type": "application/json"
          }
        }
      );
      
      setMessage({ text: "تم تحديث البريد الإلكتروني بنجاح", type: "success" });
      
      // إعادة تعيين وضع التعديل
      setEditMode(false);
      setEditData({
        workflowId: null,
        userEmail: ""
      });
      
      // تحديث القائمة بعد التعديل
      fetchUsersDetails();
    } catch (err) {
      console.log("خطأ أثناء تحديث البريد الإلكتروني:", err.response?.data || err.message);
      setMessage({
        text: err.response?.data?.message || "حدث خطأ أثناء تحديث البريد الإلكتروني",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  // وظيفة حذف المستخدم
  const handleDelete = async (workflowId) => {
    if (!window.confirm("هل أنت متأكد من حذف هذا المستخدم؟")) {
      return;
    }
    
    setLoading(true);
    
    try {
      // استخدام المسار المباشر للحذف
      await axios.delete(
        `https://complain.runasp.net/api/Workflow/${workflowId}`,
        {
          headers: {
            Authorization: bearerToken
          }
        }
      );
      
      setMessage({ text: "تم حذف المستخدم بنجاح", type: "success" });
      
      // تحديث القائمة بعد الحذف
      fetchUsersDetails();
    } catch (err) {
      console.log("خطأ أثناء حذف المستخدم:", err.response?.data || err.message);
      setMessage({
        text: err.response?.data?.message || "حدث خطأ أثناء حذف المستخدم",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 px-5 flex items-center justify-center min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        {/* <!-- Title --> */}
        <h1 className="text-2xl font-bold text-green-600 text-center mb-4">
          تفاصيل المستخدمين
        </h1>
        
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
        
        {/* نموذج التعديل */}
        {editMode && (
          <div className="mb-6 p-4 border border-gray-200 rounded-md bg-gray-50">
            <h3 className="text-lg font-semibold text-green-600 mb-3">تعديل البريد الإلكتروني</h3>
            <form onSubmit={handleUpdateEmail} className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  البريد الإلكتروني الجديد
                </label>
                <input
                  type="email"
                  value={editData.userEmail}
                  onChange={(e) => setEditData({...editData, userEmail: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="أدخل البريد الإلكتروني الجديد"
                  required
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-4 py-2 text-white rounded-md ${
                    loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {loading ? "جاري التحديث..." : "تحديث"}
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        )}
        
        {/* <!-- Add Button --> */}
        <div className="text-right mb-6">
          <button
            onClick={() => navigate("/AddUser")}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 float-left"
          >
            إضافة مستخدم
          </button>
          <br />
        </div>

        {/* <!-- Table --> */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="border p-2 text-center">الاسم</th>
                <th className="border p-2 text-center">الايميل</th>
                <th className="border p-2 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {usersDetails.map((user, index) => {
                return (
                  <tr key={index} className="border">
                    <td className="border p-2 text-center">{user.userName}</td>
                    <td className="border p-2 text-center">{user.userEmail}</td>
                    <td className="border p-2 text-center">
                      <div className="flex gap-3 space-x-2 space-x-reverse">
                        <button 
                          onClick={() => handleEdit(user)}
                          className="px-2 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200 sm:px-3 sm:py-1"
                        >
                          تعديل
                        </button>
                        <button 
                          onClick={() => handleDelete(user.workflowId)}
                          disabled={loading}
                          className="px-2 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200 sm:px-3 sm:py-1"
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* نموذج تبديل البريد الإلكتروني */}
        <div className="mt-8 p-4 border border-gray-200 rounded-md bg-gray-50">
          <h3 className="text-lg font-semibold text-green-600 mb-3">تبديل المستخدمين</h3>
          <form onSubmit={handleSwapEmails} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  المستخدم الأول
                </label>
                <select
                  value={swapData.email1}
                  onChange={(e) => setSwapData({...swapData, email1: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">اختر المستخدم الأول</option>
                  {usersDetails && usersDetails.length > 0 ? (
                    usersDetails.map((user, index) => (
                      <option key={`user1-${index}`} value={user.userEmail}>
                        {user.userEmail}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>لا يوجد مستخدمين</option>
                  )}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  المستخدم الثاني
                </label>
                <select
                  value={swapData.email2}
                  onChange={(e) => setSwapData({...swapData, email2: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                >
                  <option value="">اختر المستخدم الثاني</option>
                  {usersDetails && usersDetails.length > 0 ? (
                    usersDetails.map((user, index) => (
                      <option key={`user2-${index}`} value={user.userEmail}>
                        {user.userEmail}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>لا يوجد مستخدمين</option>
                  )}
                </select>
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 text-white rounded-md ${
                  loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {loading ? "جاري التبديل..." : "تبديل"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
