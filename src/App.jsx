import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import MobileMenuProvider from "./context/MobileMenuContext";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [{ path: "/", element: <Home /> }],
    },
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
