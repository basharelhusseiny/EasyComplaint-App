import { Outlet } from "react-router";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import MobileMenu from "../components/Header/MobileMenu";
import { jwtDecode } from "jwt-decode";

const Layout = () => {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const role =
    decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  console.log("User Role:", role);

  const allNavLinks = [
    { id: 1, link: "الصفحة الرئيسية", path: "/" },
    {
      id: 2,
      link: "إدارة أنواع الشكاوي",
      path: "/complaintTypesManager",
      roles: ["Admin"],
    },
    {
      id: 3,
      link: "إدارة المستخدمين",
      path: "/UserManagement",
      roles: ["Admin"],
    },
    {
      id: 4,
      link: "إنشاء حساب جديد",
      path: "/signUpPage",
      roles: ["Admin", "Complainer"],
    },
    {
      id: 5,
      link: "تعديل الحساب",
      path: "/editSignUp",
    },
    {
      id: 6,
      link: "تفاصيل الشكوي",
      path: "/complaintDetails",
    },
    {
      id: 7,
      link: "قائمة الشكاوي",
      path: "/listOfComplaints",
    },
    {
      id: 8,
      link: "تفاصيل المستخدم",
      path: "/userDetails",
      roles: ["Admin"],
    },
    {
      id: 9,
      link: "تواصل معنا",
      path: "/contact",
      roles: ["Admin", "Complainer"],
    },
    {
      id: 10,
      link: "إداره الاقسام",
      path: "/DepartmentManagement",
    },
  ];

  const navLinks = allNavLinks.filter((link) =>
    link.roles ? link.roles.includes(role) : true
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header navLinks={navLinks} />
      <main className="mt-[72px] flex-grow">
        <Outlet />
      </main>
      <Footer />
      <MobileMenu navLinks={navLinks} />
    </div>
  );
};

export default Layout;
