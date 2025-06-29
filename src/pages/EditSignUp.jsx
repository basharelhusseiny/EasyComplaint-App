import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";

const EditSignUp = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;

  // حالات البيانات
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });

  // حالات التحميل والرسائل
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  // جلب بيانات المستخدم الحالي
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://complain.runasp.net/api/Account/GetProfile`,
        {
          headers: {
            Authorization: bearerToken,
          },
        }
      );

      // تعبئة البيانات في النموذج
      const profile = res.data;
      setUserData({
        fullName: profile.fullName || "",
        email: profile.email || "",
        phoneNumber: profile.phoneNumber || "",
        address: profile.address || "",
      });

      setInitialDataLoaded(true);
      console.log("تم جلب بيانات المستخدم بنجاح:", profile);
    } catch (err) {
      console.error(
        "حدث خطأ أثناء جلب البيانات:",
        err.response?.data || err.message
      );
      setMessage({
        text: "تعذر جلب بيانات الملف الشخصي. يرجى المحاولة مرة أخرى.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // تحميل البيانات عند فتح الصفحة
  useEffect(() => {
    if (token) {
      fetchUserData();
    } else {
      navigate("/login");
    }
  }, []);

  // معالجة تغيير الحقول
  const handleInputChange = (e) => {
    const { id, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [id === "username" ? "fullName" : id]: value,
    }));
  };

  // التحقق من صحة البيانات
  const validateForm = () => {
    // التحقق من الاسم والبريد الإلكتروني
    if (!userData.fullName.trim()) {
      setMessage({ text: "يرجى إدخال الاسم بالكامل", type: "error" });
      return false;
    }

    if (!userData.email.trim()) {
      setMessage({ text: "يرجى إدخال بريد إلكتروني صحيح", type: "error" });
      return false;
    }

    return true;
  };

  // إرسال النموذج
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      // إعداد البيانات للإرسال
      const updateData = {
        fullName: userData.fullName,
        email: userData.email,
        phoneNumber: userData.phoneNumber || null,
        address: userData.address || null,
      };

      console.log("بيانات التحديث:", updateData);

      // إرسال طلب تحديث البيانات
      const response = await axios.put(
        "https://complain.runasp.net/api/Account/EditProfile",
        updateData,
        {
          headers: {
            Authorization: bearerToken,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("تم تحديث البيانات بنجاح:", response.data);

      setMessage({
        text: "تم تحديث الملف الشخصي بنجاح",
        type: "success",
      });

      // تحديث البيانات المحلية
      fetchUserData();
    } catch (error) {
      console.error(
        "خطأ في تحديث البيانات:",
        error.response?.data || error.message
      );

      setMessage({
        text:
          error.response?.data?.message ||
          "حدث خطأ أثناء تحديث البيانات. يرجى المحاولة مرة أخرى.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen py-5">
      {/* <!-- Login Card --> */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* <!-- Title --> */}
        <h1 className="text-2xl font-bold text-green-600 text-center mb-6">
          تعديل الملف الشخصي
        </h1>

        {/* <!-- Status Message --> */}
        {message.text && (
          <div
            className={`p-3 mb-4 rounded-md ${
              message.type === "success"
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {message.text}
          </div>
        )}

        {/* <!-- Form Fields --> */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* <!-- Username --> */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              الاسم بالكامل <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="username"
              value={userData.fullName}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="أدخل الاسم بالكامل"
              disabled={loading || !initialDataLoaded}
            />
          </div>

          {/* <!-- Email --> */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              البريد الإلكتروني <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={userData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="أدخل البريد الإلكتروني"
              disabled={loading || !initialDataLoaded}
            />
          </div>

          {/* <!-- Phone Number --> */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              رقم الهاتف
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={userData.phoneNumber || ""}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="أدخل رقم الهاتف"
              disabled={loading || !initialDataLoaded}
            />
          </div>

          {/* <!-- Address --> */}
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              العنوان
            </label>
            <input
              type="text"
              id="address"
              value={userData.address || ""}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="أدخل العنوان"
              disabled={loading || !initialDataLoaded}
            />
          </div>
          <div className="mb-6 text-center">
            <Link
              to="/changePassword"
              className="text-green-600 hover:text-green-800 transition-colors duration-200 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              تغيير كلمة المرور
            </Link>
          </div>

          {/* <!-- Submit Button --> */}
          <button
            type="submit"
            disabled={loading || !initialDataLoaded}
            className={`w-full py-2 text-white rounded-md transition duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
          </button>

          {/* <!-- Back Button --> */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-200"
          >
            العودة
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSignUp;
