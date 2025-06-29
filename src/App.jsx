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
import IdOfComplaintDetailsProvider from "./context/IdOfComplaintDetails";
import ForgetPassword from "./pages/ForgetPassword";
import EditSignUp from "./pages/EditSignUp";
import UserDetails from "./pages/UserDetails";
import DepartmentManagement from "./pages/DepartmentManagement";
import RecoverPassword from "./pages/RecoverPassword";
import AddWorkflow from "./pages/AddWorkflow";
import ChangePassword from "./pages/ChangePassword";
import ListOfComplaintEmp from "./pages/ListOfComplaintEmp";
import ContactUs from "./pages/ContactUs";

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
          <ProtectedRoute allowedRoles={["Admin"]}>
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
          <ProtectedRoute allowedRoles={["Complainer", "Employee"]}>
            <ComplaintDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/listOfComplaints",
        element: (
          <ProtectedRoute allowedRoles={["Complainer"]}>
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
          <ProtectedRoute allowedRoles={["Complainer"]}>
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
          <ProtectedRoute allowedRoles={["Admin"]}>
            <DepartmentManagement />
          </ProtectedRoute>
        ),
      },
      {
        path: "/AddUser",
        element: (
          <ProtectedRoute allowedRoles={["Admin", "Employee"]}>
            <AddWorkflow />
          </ProtectedRoute>
        ),
      },
      {
        path: "/changePassword",
        element: (
          <ProtectedRoute allowedRoles={["Admin", "Complainer", "Employee"]}>
            <ChangePassword />
          </ProtectedRoute>
        ),
      },
      {
        path: "/ListOfComplaintEmp",
        element: (
          <ProtectedRoute allowedRoles={["Employee"]}>
            <ListOfComplaintEmp />
          </ProtectedRoute>
        ),
      },
      {
        path: "/ContactUs",
        element: (
          <ProtectedRoute allowedRoles={["Admin", "Complainer", "Employee"]}>
            <ContactUs />
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
    <IdOfComplaintDetailsProvider>
      <MobileMenuProvider>
        <ComplaintIdProvider>
          <RouterProvider router={router} />
        </ComplaintIdProvider>
      </MobileMenuProvider>
    </IdOfComplaintDetailsProvider>
  );
};

export default App;
