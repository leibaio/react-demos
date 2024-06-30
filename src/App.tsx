import { AuthProvider } from "@/contexts/AuthContext";
import routes from "@/routes";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const App = () => {
  return (
    <AuthProvider>
      <Router>
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
      </Router>
    </AuthProvider>
  );
};

export default App;
