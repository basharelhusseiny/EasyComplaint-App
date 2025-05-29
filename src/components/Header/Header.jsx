import { Link } from "react-router";

const Header = () => {
  const navLinks = [
    { id: 1, link: "إدارة أنواع الشكاوي", path: "/complaint-types" },
    { id: 2, link: "إدارة الأقسام", path: "/departments" },
    { id: 3, link: "إدارة المستخدمين", path: "/users" },
    { id: 4, link: "قائمة الشكاوي", path: "/complaints" },
    { id: 5, link: "للتواصل معنا", path: "/complaints" },
  ];
  return (
    <header className="fixed z-50 left-0 top-0 w-full h-[72px] bg-white shadow-lg" dir="rtl">
      <div className="container mx-auto px-5 h-full">
        <div className="flex items-center justify-between h-full">
          <div>
            <Link className="block font-bold text-xl text-green-600">
              كلية العلوم
            </Link>
          </div>
          <nav className="flex  items-center gap-5">
            {navLinks.map((link) => {
              return (
                <Link key={link.id} className="block font-semibold text-[17px] hover:text-green-600">
                  {link.link}
                </Link>
              );
            })}
          </nav>
          <div>
            <p className="bg-gradient-to-bl from-green-400 to-green-800 hover:from-green-800 hover:to-green-400 px-5 py-2 rounded-xl text-white cursor-pointer font-semibold duration-200 transition-colors">
              تسجيل الخروج
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
