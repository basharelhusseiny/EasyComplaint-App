import { Outlet } from "react-router";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import MobileMenu from "../components/Header/MobileMenu";

const Layout = () => {
  const navLinks = [
    { id: 1, link: "الصفحة الرئيسية", path: "/" },
    { id: 2, link: "إدارة أنواع الشكاوي", path: "/complaint-types" },
    { id: 3, link: "إدارة الأقسام", path: "/departments" },
    { id: 4, link: "إدارة المستخدمين", path: "/users" },
    { id: 5, link: "للتواصل معنا", path: "/complaints" },
  ];

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
