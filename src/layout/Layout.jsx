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
      id: 13,
      link: "إدارة المحتوي",
      path: "/websiteMangment",
      roles: ["Admin"],
    },
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
      roles: ["Admin"],
    },
    {
      id: 5,
      link: "تعديل الحساب",
      path: "/editSignUp",
    },
    {
      id: 7,
      link: "قائمة الشكاوي",
      path: "/listOfComplaints",
      roles: ["Complainer"],
    },
    {
      id: 8,
      link: "تفاصيل المستخدم",
      path: "/userDetails",
      roles: ["Admin"],
    },
    {
      id: 9,
      link: "تقديم شكوي ",
      path: "/contact",
      roles: ["Complainer"],
    },
    {
      id: 10,
      link: "إداره الاقسام",
      path: "/DepartmentManagement",
      roles: ["Admin"],
    },
    {
      id: 11,
      link: "قائمة الشكاوي المسندة",
      path: "/ListOfComplaintEmp",
      roles: ["Employee"],
    },
    {
      id: 12,
      link: "تواصل معنا ",
      path: "/ContactUs",
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
