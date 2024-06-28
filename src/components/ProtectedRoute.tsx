import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { message } from "antd";
import { useEffect } from "react";

interface ProtectedRouteProps {
  element: React.ComponentType<any>;
  [rest: string]: any;
}

// 创建一个受保护的路由组件
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element: Component,
  ...rest
}) => {
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      message.warning("您未登录，请先登录！");
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
