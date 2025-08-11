import ThemeDrawer from "@/components/common/ThemeDrawer";
import { useThemeEffect } from "@/hooks/useThemeEffect";
import routes from "@/routes";
import { Spin } from "antd";
import { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const App = () => {
  useThemeEffect();

  return (
    <Router>
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Spin size="large" />
          </div>
        }
      >
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element}>
              {route.children &&
                route.children.map((childRoute, childIndex) => (
                  <Route
                    key={childIndex}
                    path={childRoute.path}
                    element={childRoute.element}
                  />
                ))}
            </Route>
          ))}
        </Routes>
        <ThemeDrawer />
      </Suspense>
    </Router>
  );
};

export default App;
