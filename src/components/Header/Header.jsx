import { Link, NavLink, useNavigate } from "react-router";
import { FiMenu } from "react-icons/fi";
import CloseButton from "../../common/CloseButton";
import { useMobileMenuContext } from "../../context/MobileMenuContext";
import { CiLogout } from "react-icons/ci";

const Header = ({ navLinks }) => {
  const { isMobMenuOpen, setIsMobMenuOpen } = useMobileMenuContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <header
      className="fixed z-50 left-0 top-0 w-full h-[72px] bg-white shadow-lg"
      dir="rtl"
    >
      <div className="container mx-auto px-5 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <div>
            <Link to="/" className="block font-bold text-xl text-green-600">
              كلية العلوم
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.path}
                className={({ isActive }) =>
                  `block font-semibold text-[17px] hover:text-green-600 duration-200 ${
                    isActive ? "text-green-600" : ""
                  }`
                }
              >
                {link.link}
              </NavLink>
            ))}
          </nav>

          <div className="hidden lg:block">
            <button
              onClick={handleLogout}
              className="bg-gradient-to-bl from-green-400 to-green-800 hover:from-green-800 hover:to-green-400 px-5 py-2 rounded-xl text-white cursor-pointer font-semibold duration-200 transition-colors"
            >
              تسجيل الخروج
            </button>
          </div>

          {/* Mobile Menu Controls */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="bg-gradient-to-bl from-green-400 to-green-800 hover:from-green-800 hover:to-green-400 p-2 rounded-xl text-white cursor-pointer font-semibold duration-200 transition-colors"
            >
              <CiLogout size={22} />
            </button>

            {/* Mobile Menu Toggle */}
            {isMobMenuOpen ? (
              <CloseButton
                onClick={() => setIsMobMenuOpen(false)}
                isMobMenuOpen={isMobMenuOpen}
              />
            ) : (
              <button
                aria-label="menu"
                onClick={() => setIsMobMenuOpen(!isMobMenuOpen)}
                className="cursor-pointer hover:text-green-600 duration-300 text-black"
              >
                <FiMenu size={25} />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
