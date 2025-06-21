import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import MobileMenuProvider from "./context/MobileMenuContext";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUpPage from "./pages/SignUpPage";
import UserManagement from "./pages/UserManagement";
import ComplaintTypesManager from "./pages/ComplaintTypesManager";
import ComplaintDetails from "./pages/ComplaintDetails";
import Contact from "./pages/Contact";
import ListOfComplaints from "./pages/ListOfComplaints";
import ComplaintIdProvider from "./context/ComplaintIdContext";
import ForgetPassword from "./pages/ForgetPassword";
import EditSignUp from "./pages/EditSignUp";
import UserDetails from "./pages/UserDetails";
import DepartmentManagement from "./pages/DepartmentManagement";
import RecoverPassword from "./pages/RecoverPassword";

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
      {
        path: "/signUpPage",
        element: (
          <ProtectedRoute allowedRoles={["Admin", "Complainer"]}>
            <SignUpPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/userManagement",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <UserManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "/complaintTypesManager",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <ComplaintTypesManager />
          </ProtectedRoute>
        ),
      },
      {
        path: "/complaintDetails",
        element: (
          <ProtectedRoute allowedRoles={["Admin", "Complainer", "Employee"]}>
            <ComplaintDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/listOfComplaints",
        element: (
          <ProtectedRoute allowedRoles={["Admin", "Complainer", "Employee"]}>
            <ListOfComplaints />
          </ProtectedRoute>
        ),
      },
      {
        path: "/editSignUp",
        element: (
          <ProtectedRoute allowedRoles={["Admin", "Complainer", "Employee"]}>
            <EditSignUp />
          </ProtectedRoute>
        ),
      },
      {
        path: "/contact",
        element: (
          <ProtectedRoute allowedRoles={["Admin", "Complainer"]}>
            <Contact />
          </ProtectedRoute>
        ),
      },
      {
        path: "/userDetails",
        element: (
          <ProtectedRoute allowedRoles={["Admin"]}>
            <UserDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/DepartmentManagement",
        element: (
          <ProtectedRoute allowedRoles={["Admin","Employee"]}>
            <DepartmentManagement />
          </ProtectedRoute>
        ),
      },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgetPassword", element: <ForgetPassword /> },
  { path: "/RecoverPassword", element: <RecoverPassword /> },
  {
    path: "/unauthorized",
    element: (
      <div className="flex justify-center items-center h-screen text-red-600 text-xl">
        ليس لديك صلاحية للوصول إلى هذه الصفحة.
      </div>
    ),
  },
]);

const App = () => {
  return (
    <MobileMenuProvider>
      <ComplaintIdProvider>
        <RouterProvider router={router} />
      </ComplaintIdProvider>
    </MobileMenuProvider>
  );
};

export default App;
