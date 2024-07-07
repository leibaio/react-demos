import CommonLayout from "@/components/Layout/CommonLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import ExpandingCards from "@/pages/50projects50days/01-expanding-cards";
import About from "@/pages/About";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Metro from "@/pages/metro";
import { Navigate } from "react-router-dom";

const routes = [
  { path: "/", element: <Navigate to="/home" /> },
  { path: "/login", element: <Login /> },
  {
    path: "/home",
    element: <ProtectedRoute element={CommonLayout} />,
    children: [{ path: "", element: <Home /> }],
  },
  {
    path: "/metro",
    element: <ProtectedRoute element={CommonLayout} />,
    children: [{ path: "", element: <Metro /> }],
  },
  {
    path: "/about",
    element: <CommonLayout />,
    children: [{ path: "", element: <About /> }],
  },
  {
    path: "/expanding-cards",
    element: <CommonLayout />,
    children: [{ path: "", element: <ExpandingCards /> }],
  },
];

export default routes;
