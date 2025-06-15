import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (password.length < 8 || !/\d/.test(password)) {
        setErrorMsg("كلمة السر يجب أن تكون 8 حروف على الأقل وتحتوي على رقم.");
        return;
      }

      const response = await axios.post(
        "https://complain.runasp.net/api/Account/login",
        {
          email,
          password,
          role,
        }
      );

      if (response?.data?.token) {
        localStorage.setItem("token", response.data.token);
      }

      setSuccessMsg("تم التسجيل بنجاح!");
      setErrorMsg("");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (error) {
      if (error?.response?.status === 401 || error?.response?.status === 400) {
        setErrorMsg("البريد الإلكتروني أو كلمة السر غير صحيحة.");
      } else {
        setErrorMsg("حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative w-screen h-screen bg-[url(/Images/loginpage/pexels-element5-1370298.jpg)] bg-no-repeat bg-cover bg-center">
      <div className="absolute inset-0 bg-black/50" />

      <div className="container mx-auto px-5 h-full flex items-center justify-between">
        {/* Text*/}
        <div className="relative hidden md:block text-white text-right max-w-lg">
          <h1 className="text-5xl font-bold mb-4">رأيك يصنع التغيير</h1>
          <p className="text-xl mb-2">
            نستمع إليك بحرص. أرسل شكواك أو اقتراحك التي ستساهم في التطوير
          </p>
          <p className="text-lg">رأيك هو مفتاح التغيير لا تتردد في مشاركته</p>
        </div>

        {/* Login Form*/}
        <div className="bg-white/20 backdrop-blur-sm p-8 rounded-lg w-full max-w-md mx-auto md:mx-0">
          <h2 className="text-white text-2xl font-bold mb-6 text-center">
            تسجيل الدخول
          </h2>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="البريد الإلكتروني"
                required
                className="w-full p-3 rounded-md bg-white text-right focus:outline-green-500"
              />
            </div>

            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="كلمة السر"
                required
                className="w-full p-3 rounded-md bg-white text-right focus:outline-green-500"
              />
            </div>

            {/* Radio role */}
            <div>
              <div className="flex justify-around gap-2">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="Employee"
                    name="role"
                    value="Employee"
                    className="accent-green-500"
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <label
                    htmlFor="Employee"
                    className="text-white hover:text-green-500 cursor-pointer duration-300"
                  >
                    موظف
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="Complainer"
                    name="role"
                    value="Complainer"
                    className="accent-green-500"
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <label
                    htmlFor="Complainer"
                    className="text-white hover:text-green-500 cursor-pointer duration-300"
                  >
                    مشتكي
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    id="admin"
                    name="role"
                    value="Admin"
                    className="accent-green-500"
                    onChange={(e) => setRole(e.target.value)}
                  />
                  <label
                    htmlFor="admin"
                    className="text-white hover:text-green-500 cursor-pointer duration-300"
                  >
                    مدير
                  </label>
                </div>
              </div>
            </div>

            <div className="text-right">
              <Link
                to="/forgetPassword"
                className="text-white hover:text-green-500 duration-200 text-sm"
              >
                هل نسيت كلمة السر؟
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="disabled:opacity-50 w-full bg-green-600 hover:bg-green-800 text-white py-3 rounded-md transition-colors duration-300"
            >
              {loading ? "جاري التسجيل..." : "تسجيل الدخول"}
            </button>

            {/* message */}
            {errorMsg && <p className="text-red-400 text-right">{errorMsg}</p>}
            {successMsg && (
              <p className="text-green-400 text-right">{successMsg}</p>
            )}

            <div className="flex items-center justify-center gap-4 my-4">
              <div className="h-px bg-white/20 flex-grow"></div>
              <span className="text-white/60">أو</span>
              <div className="h-px bg-white/20 flex-grow"></div>
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 bg-white py-3 rounded-md hover:bg-gray-200 transition-colors duration-300"
            >
              <FcGoogle size={25} />
              <span className="text-gray-800">تسجيل الدخول عبر جوجل</span>
            </button>

            <div className="text-center mt-6">
              <span className="text-white">ليس لديك حساب؟</span>{" "}
              <Link to="/register" className="text-white hover:text-green-500">
                إنشاء حساب
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
