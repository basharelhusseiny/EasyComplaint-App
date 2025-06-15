import axios from "axios";
import { useEffect, useState } from "react";

const SignUpPage = () => {
  const token = localStorage.getItem("token");
  const bearerToken = `Bearer ${token}`;

  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState("");
  const [roleName, setRoleName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await axios.get(
          "https://complain.runasp.net/api/Department/Get-All-Department"
        );
        setDepartments(res.data);
      } catch (err) {
        console.error("حدث خطأ أثناء جلب الأقسام:", err);
      }
    };
    fetchDepartments();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (password.length < 8 || !/\d/.test(password)) {
        setErrorMsg("كلمة السر يجب أن تكون 8 حروف على الأقل وتحتوي على رقم.");
        return;
      }

      const response = await axios.post(
        "https://complain.runasp.net/api/Account/CreateUserWithRole",
        {
          fullName,
          email,
          password,
          departmentId: Number(departmentId),
          roleName,
        },
        {
          headers: {
            Authorization: bearerToken,
          },
        }
      );

      setSuccessMsg("تم التسجيل بنجاح!");
      setErrorMsg("");
      setFullname("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setErrorMsg(
        error?.response?.data?.message || "حدث خطأ أثناء التسجيل، حاول لاحقًا."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen px-5">
      {/* <!-- Login Card --> */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* <!-- Title --> */}
        <h1 className="text-2xl font-bold text-green-600 text-center mb-6">
          انشاء حساب جديد
        </h1>

        <h3 className="text-l font-bold text-gray-400 text-center mb-6">
          يرجي تعبئه البيانات التاليه
        </h3>

        {/* <!-- Form Fields --> */}
        <form onSubmit={handleCreateUser} className="space-y-4">
          {/* <!-- Username --> */}
          <div>
            <input
              value={fullName}
              onChange={(e) => setFullname(e.target.value)}
              type="text"
              id="username"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder=" اكتب اسمك بالكامل"
            />
          </div>

          <div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder=" اكتب بريدك الالكتروني"
            />
          </div>

          {/* <!-- Password --> */}
          <div>
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="أدخل كلمة المرور"
              />
              {/* <!-- Eye Icon (for show/hide password) --> */}
              <button
                type="button"
                className="absolute inset-y-0 left-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                </svg>
              </button>
            </div>
          </div>

          {/* <!-- User Type --> */}
          <div>
            <select
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              id="user-type"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">اختر الدور</option>
              <option value="admin">مدير</option>
              <option value="complainer">مشتكي</option>
              <option value="employee">موظف</option>
            </select>
          </div>
          {/* القسم */}
          <div>
            <select
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">اختر القسم</option>
              {departments.map((dep) => (
                <option key={dep.id} value={dep.id}>
                  {dep.departmentName}
                </option>
              ))}
            </select>
          </div>

          {/* <!-- Login Button --> */}
          <button className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200">
            انشاء حساب
          </button>
          {/* Message */}
          {errorMsg && <p className="text-red-500 text-right">{errorMsg}</p>}
          {successMsg && (
            <p className="text-green-500 text-right">{successMsg}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
