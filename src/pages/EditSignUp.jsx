import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";

const EditSignUp = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;
  const fileInputRef = useRef(null);

  // حالات البيانات
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    profileImage: "",
  });

  // حالات كلمة المرور
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);

  // حالات الصورة
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageMessage, setImageMessage] = useState({ text: "", type: "" });

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
        profileImage: profile.profileImage || "",
      });

      // تعيين صورة المعاينة إذا كانت موجودة
      if (profile.profileImage) {
        setPreviewImage(profile.profileImage);
      }

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

  // معالجة اختيار الصورة
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // التحقق من نوع الملف
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setImageMessage({
        text: "يرجى اختيار صورة بتنسيق JPG أو PNG فقط",
        type: "error",
      });
      return;
    }

    // التحقق من حجم الملف (أقل من 5 ميجابايت)
    if (file.size > 5 * 1024 * 1024) {
      setImageMessage({
        text: "حجم الصورة يجب أن يكون أقل من 5 ميجابايت",
        type: "error",
      });
      return;
    }

    setSelectedImage(file);
    setImageMessage({ text: "", type: "" });

    // إنشاء معاينة للصورة
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // رفع الصورة
  const handleUploadImage = async () => {
    if (!selectedImage) {
      setImageMessage({
        text: "يرجى اختيار صورة أولاً",
        type: "error",
      });
      return;
    }

    setUploadingImage(true);
    setImageMessage({ text: "", type: "" });

    try {
      const formData = new FormData();
      formData.append("profileImage", selectedImage);

      const response = await axios.post(
        "https://complain.runasp.net/api/Account/upload-image-Profile",
        formData,
        {
          headers: {
            Authorization: bearerToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("تم رفع الصورة بنجاح:", response.data);

      setImageMessage({
        text: "تم تحديث صورة الملف الشخصي بنجاح",
        type: "success",
      });

      // تحديث البيانات المحلية
      fetchUserData();

      // إعادة تعيين حالة الصورة المحددة
      setSelectedImage(null);
    } catch (error) {
      console.error(
        "خطأ في رفع الصورة:",
        error.response?.data || error.message
      );

      setImageMessage({
        text:
          error.response?.data?.message ||
          "حدث خطأ أثناء رفع الصورة. يرجى المحاولة مرة أخرى.",
        type: "error",
      });
    } finally {
      setUploadingImage(false);
    }
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

    // التحقق من كلمة المرور إذا تم تغييرها
    if (changePassword) {
      if (password.length < 8) {
        setMessage({
          text: "كلمة المرور يجب أن تكون 8 أحرف على الأقل وتحتوي على رقم واحد على الأقل",
          type: "error",
        });
        return false;
      }

      if (password !== confirmPassword) {
        setMessage({
          text: "كلمة المرور وتأكيدها غير متطابقين",
          type: "error",
        });
        return false;
      }
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

      // إضافة كلمة المرور إذا تم تغييرها
      if (changePassword) {
        updateData.password = password;
        updateData.confirmPassword = confirmPassword;
      }

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

      // إعادة تعيين حقول كلمة المرور
      if (changePassword) {
        setPassword("");
        setConfirmPassword("");
        setChangePassword(false);
      }

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

        {/* <!-- صورة الملف الشخصي --> */}
        <div className="mb-6 flex flex-col items-center">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-green-500">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="صورة الملف الشخصي"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-xs">لا توجد صورة</span>
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current.click()}
              className="absolute bottom-0 right-0 bg-green-600 text-white rounded-full p-1 shadow-md hover:bg-green-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/jpeg, image/png, image/jpg"
            className="hidden"
          />

          {selectedImage && (
            <div className="flex items-center gap-2 mb-2">
              <button
                type="button"
                onClick={handleUploadImage}
                disabled={uploadingImage}
                className={`text-xs py-1 px-3 rounded ${
                  uploadingImage
                    ? "bg-gray-400"
                    : "bg-green-600 hover:bg-green-700"
                } text-white`}
              >
                {uploadingImage ? "جاري الرفع..." : "رفع الصورة"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedImage(null);
                  setPreviewImage(userData.profileImage || null);
                  setImageMessage({ text: "", type: "" });
                }}
                className="text-xs py-1 px-3 rounded bg-gray-500 hover:bg-gray-600 text-white"
              >
                إلغاء
              </button>
            </div>
          )}

          {imageMessage.text && (
            <div
              className={`text-xs p-2 rounded mt-2 ${
                imageMessage.type === "success"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {imageMessage.text}
            </div>
          )}
        </div>

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

          {/* <!-- email --> */}
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

          {/* <!-- رقم الهاتف --> */}
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              رقم الهاتف
            </label>
            <input
              type="text"
              id="phoneNumber"
              value={userData.phoneNumber || ""}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="أدخل رقم هاتفك"
              disabled={loading || !initialDataLoaded}
            />
          </div>

          {/* <!-- العنوان --> */}
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
              placeholder="أدخل عنوانك"
              disabled={loading || !initialDataLoaded}
            />
          </div>

          {/* <!-- تغيير كلمة المرور --> */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="change-password"
              checked={changePassword}
              onChange={() => setChangePassword(!changePassword)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              disabled={loading || !initialDataLoaded}
            />
            <label
              htmlFor="change-password"
              className="mr-2 block text-sm text-gray-700"
            >
              تغيير كلمة المرور
            </label>
          </div>

          {/* <!-- حقول كلمة المرور (تظهر فقط عند اختيار تغيير كلمة المرور) --> */}
          {changePassword && (
            <>
              {/* <!-- Password --> */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  كلمة المرور الجديدة <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="أدخل كلمة المرور الجديدة"
                  disabled={loading}
                />
                <p className="text-xs text-gray-500 mt-1">
                  يجب أن تكون 8 أحرف على الأقل وتحتوي على رقم واحد على الأقل
                </p>
              </div>

              {/* <!-- تأكيد كلمة المرور --> */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  تأكيد كلمة المرور <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="تأكيد كلمة المرور"
                  disabled={loading}
                />
              </div>
            </>
          )}

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
