import CommonLayout from "@/components/Layout/CommonLayout";
import ProtectedRoute from "@/components/ProtectedRoute";
import ExpandingCards from "@/pages/50projects50days/01-expanding-cards";
import About from "@/pages/About";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Metro from "@/pages/metro";
import Reader from "@/pages/reader";
import WatermarkDemo from "@/pages/watermark";
import { Navigate } from "react-router-dom";
import Demo from "@/pages/Demo";

const routes = [
  { path: "/", element: <Navigate to="/home" /> },
  { path: "/login", element: <Login /> },
  {
    path: "/about",
    element: <CommonLayout />,
    children: [{ path: "", element: <About /> }],
  },
  {
    path: "/demo",
    element: <CommonLayout />,
    children: [{ path: "", element: <Demo /> }],
  },
  {
    path: "/expanding-cards",
    element: <CommonLayout />,
    children: [{ path: "", element: <ExpandingCards /> }],
  },
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
    path: "/reader",
    element: <CommonLayout />,
    children: [{ path: "", element: <Reader /> }],
  },
  {
    path: "/watermark",
    element: <ProtectedRoute element={CommonLayout} />,
    children: [{ path: "", element: <WatermarkDemo /> }],
  },
];

export default routes;
