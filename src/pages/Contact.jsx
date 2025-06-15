import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Contact = () => {
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;

  const [complaintType, setComplaintType] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTypeId, setSelectedTypeId] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title,
      description,
      complaintTypeID: parseInt(selectedTypeId),
    };
    try {
      const response = await axios.post(
        "https://complain.runasp.net/api/Complaint/createComplaint",
        data,
        {
          headers: {
            Authorization: bearerToken,
          },
        }
      );
      console.log("تم إرسال الشكوى بنجاح:", response.data);

      setTitle("");
      setDescription("");
      setSelectedTypeId("");
      navigate("/ListOfComplaints");
    } catch (err) {
      console.log("خطأ أثناء إرسال الشكوى:", err.response?.data || err.message);
    }
  };

  return (
    <div className="bg-gray-100 py-8 px-5">
      <h1 className="text-3xl text-center font-bold mb-2">تواصل معنا</h1>
      <br />
      <h1 className="text-l text-center text-gray-600 font-bold mb-2">
        نحن هنا علي تقديم الدعم علي مدار الساعه طوال ايام الاسبوع
      </h1>
      <br />

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow space-y-6"
      >
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
            placeholder="أدخل عنوان الشكوى"
            className="w-full border-b p-2 focus:outline-none"
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

        {/* زر الإرسال */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
          >
            تأكيد الإرسال
          </button>
        </div>
      </form>

      {/* معلومات التواصل */}
      <div className="grid md:grid-cols-3 gap-4 mt-10 max-w-6xl mx-auto text-center px-4">
        {/* رقم الهاتف */}
        <a
          href="tel:010178849478"
          className="block bg-gray-100 rounded-t-lg shadow p-4 hover:bg-gray-200 transition duration-200"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="text-black text-3xl">📞</div>
            <p className="font-bold text-black">اتصل بنا</p>
            <p className="text-black">010178849478</p>
          </div>
        </a>

        {/* البريد الإلكتروني */}
        <a
          href="mailto:logo@gmail.com"
          className="block bg-gray-100 rounded-t-lg shadow p-4 hover:bg-gray-200 transition duration-200"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="text-black text-3xl">✉️</div>
            <p className="font-bold text-black">الإيميل</p>
            <p className="text-black">logo@gmail.com</p>
          </div>
        </a>

        {/* العنوان */}
        <a
          href="https://www.google.com/maps?q=المنوفية،+شبين،+مجمع+الكليات"
          target="_blank"
          className="block bg-gray-100 rounded-t-lg shadow p-4 hover:bg-gray-200 transition duration-200"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="text-black text-3xl">📍</div>
            <p className="font-bold text-black">العنوان</p>
            <p className="text-black">المنوفية، شبين، مجمع الكليات</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Contact;
