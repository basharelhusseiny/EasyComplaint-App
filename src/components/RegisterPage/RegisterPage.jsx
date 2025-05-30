import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const RegisterPage = () => {
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (password.length < 8 || !/\d/.test(password)) {
        setErrorMsg("كلمة السر يجب أن تكون 8 حروف على الأقل وتحتوي على رقم.");
        return;
      }

      if (password !== confirmPassword) {
        setErrorMsg("كلمة السر وتأكيد كلمة السر غير متطابقين.");
        return;
      }
      const response = await axios.post(
        "https://complain.runasp.net/api/Account/register",
        {
          fullName,
          email,
          password,
          confirmPassword,
        }
      );

      setSuccessMsg("تم التسجيل بنجاح! يمكنك الآن تسجيل الدخول.");
      setErrorMsg("");
      setFullname("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 500);
    } catch (error) {
      setErrorMsg(
        error?.response?.data?.message || "حدث خطأ أثناء التسجيل، حاول لاحقًا."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-5 bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        {/* <!-- Title --> */}
        <h1 class="text-2xl font-bold text-green-600 text-center mb-6">
          انشاء حساب
        </h1>

        {/* <!-- Form Fields --> */}
        <form class="space-y-4" onSubmit={handleRegister}>
          {/* <!-- Username --> */}
          <div>
            <label
              for="username"
              class="block text-sm  font-bold text-gray-700 mb-1"
            >
              اسم المستخدم
            </label>
            <input
              type="text"
              id="username"
              value={fullName}
              onChange={(e) => setFullname(e.target.value)}
              class="w-full p-2 border border-gray-300 rounded-md placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="أدخل الاسم بالكامل"
              required
            />
          </div>

          {/* <!-- email --> */}
          <div>
            <label
              for="email"
              class="block text-sm  font-bold text-gray-700 mb-1"
            >
              البريد الالكتروني
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              class="w-full p-2 border border-gray-300 rounded-md placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="أدخل البريد الالكتروني"
              required
            />
          </div>

          {/* <!-- Password --> */}
          <div>
            <label
              for="password"
              class="block text-sm  font-bold text-gray-700 mb-1"
            >
              كلمه السر
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              class="w-full p-2 border border-gray-300 rounded-md placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="أدخل كلمه السر"
              required
            />
          </div>

          <div>
            <label
              for="password"
              class="block text-sm  font-bold text-gray-700 mb-1"
            >
              تاكيد كلمه السر
            </label>
            <div class="relative">
              <input
                type="password"
                id="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                class="w-full p-2 border border-gray-300 rounded-md placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="تاكيد كلمة السر"
                required
              />
            </div>
          </div>
          {/* Message */}
          {errorMsg && <p className="text-red-500 text-right">{errorMsg}</p>}
          {successMsg && (
            <p className="text-green-500 text-right">{successMsg}</p>
          )}

          {/* <!-- Login Button --> */}
          <button
            disabled={loading}
            class="disabled:opacity-50 w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
          >
            {loading ? "جاري التسجيل..." : "إنشاء الحساب"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
