import { Outlet } from "react-router";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="mt-[72px] flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
