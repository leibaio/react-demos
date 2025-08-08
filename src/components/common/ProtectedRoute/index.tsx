import { Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores";
import { message } from "antd";
import { useEffect } from "react";

interface ProtectedRouteProps {
  element: React.ComponentType<any>;
  [rest: string]: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element: Component,
  ...rest
}) => {
  const { isLoggedIn } = useAuthStore();

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
