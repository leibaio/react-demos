import CommonLayout from "@/components/Layout/CommonLayout";
import About from "@/pages/About";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";

const routes = [
  { path: "/", element: <Navigate to="/home" /> },
  { path: "/login", element: <Login /> },
  {
    path: "/home",
    element: <ProtectedRoute element={CommonLayout} />,
    children: [{ path: "", element: <Home /> }],
  },
  {
    path: "/about",
    element: <CommonLayout />,
    children: [{ path: "", element: <About /> }],
  },
];

export default routes;
