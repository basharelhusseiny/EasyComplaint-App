import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

const Contact = () => {
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;
  const fileInputRef = useRef(null);

  const [complaintType, setComplaintType] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTypeId, setSelectedTypeId] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const navigate = useNavigate();

  useEffect(() => {
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
    fetchComplaintType();
  }, []);

  // التعامل مع اختيار الملفات
  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  // إعادة تعيين حقل الملفات
  const resetFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFiles([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      // إنشاء FormData لإرسال البيانات والملفات
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("complaintTypeID", parseInt(selectedTypeId));
      
      // إضافة الملفات إلى FormData
      files.forEach((file, index) => {
        formData.append(`attachments`, file);
      });

      // إرسال الطلب مع الملفات
      const response = await axios.post(
        "https://complain.runasp.net/api/Complaint/createComplaint",
        formData,
        {
          headers: {
            Authorization: bearerToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("تم إرسال الشكوى بنجاح:", response.data);
      setMessage({ 
        text: "تم إرسال الشكوى بنجاح", 
        type: "success" 
      });

      // إعادة تعيين النموذج
      setTitle("");
      setDescription("");
      setSelectedTypeId("");
      resetFileInput();
      
      // الانتقال إلى صفحة قائمة الشكاوى بعد فترة قصيرة
      setTimeout(() => {
        navigate("/listOfComplaints");
      }, 1500);
    } catch (err) {
      console.log("خطأ أثناء إرسال الشكوى:", err.response?.data || err.message);
      setMessage({ 
        text: err.response?.data?.message || "حدث خطأ أثناء إرسال الشكوى. يرجى المحاولة مرة أخرى.", 
        type: "error" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[800px]">
        <h1 className="text-2xl font-bold text-green-600 text-right mb-6">
          تقديم شكوى جديدة
        </h1>

        {/* رسالة النجاح أو الخطأ */}
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

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* عنوان الشكوى */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              عنوان الشكوى
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-b p-2 focus:outline-none"
              placeholder="أدخل عنوان الشكوى"
              required
            />
          </div>

          {/* نوع الشكوى */}
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              اختر نوع الشكوى
            </label>
            <select
              id="type"
              value={selectedTypeId}
              onChange={(e) => setSelectedTypeId(e.target.value)}
              className="w-full border-b p-2 focus:outline-none"
              required
            >
              <option value="">اختر نوع الشكوى</option>
              {complaintType?.map((comp) => (
                <option key={comp.id} value={comp.id}>
                  {comp.typeName}
                </option>
              ))}
            </select>
          </div>

          {/* الاستفسار */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              استفسارك
            </label>
            <textarea
              id="message"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="اكتب تفاصيل الشكوى"
              className="w-full border-b p-2 focus:outline-none"
              required
            ></textarea>
          </div>

          {/* إضافة ملفات */}
          <div>
            <label
              htmlFor="files"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              إرفاق ملفات (اختياري)
            </label>
            <input
              type="file"
              id="files"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="w-full border p-2 rounded-md"
              multiple
            />
            {files.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  تم اختيار {files.length} ملف
                </p>
                <ul className="text-xs text-gray-500 mt-1 pr-4">
                  {files.map((file, index) => (
                    <li key={index} className="truncate">
                      {file.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* زر الإرسال */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "جاري الإرسال..." : "تأكيد الإرسال"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
