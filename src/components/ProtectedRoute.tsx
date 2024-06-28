import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { message } from "antd";

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

  if (!isLoggedIn) {
    message.warning("您未登录，请先登录！");
    return <Navigate to="/login" />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
