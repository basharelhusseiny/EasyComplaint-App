import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import MobileMenuProvider from "./context/MobileMenuContext";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUpPage from "./pages/SignUpPage";
import UserManagement from "./pages/UserManagement";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/", element: <Home /> },
        { path: "/signUpPage", element: <SignUpPage /> },
        { path: "/userManagement", element: <UserManagement /> },
      ],
    },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
  ]);
  return (
    <>
      <MobileMenuProvider>
        <RouterProvider router={router} />
      </MobileMenuProvider>
    </>
  );
};

export default App;
