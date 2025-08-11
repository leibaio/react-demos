import logo from "@/assets/logo.svg";
import routes from "@/routes";
import { useAuthStore, useThemeStore } from "@/stores";
import type { RouteConfig } from "@/types/route";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Layout, Menu, theme } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./index.less";

const { Header, Content, Sider } = Layout;

const CommonLayout = () => {
  const { primaryColor, mode, layoutType, sidebarCollapsed, toggleSidebar } =
    useThemeStore();
  const { userInfo } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const getMenuFromRoutes = (routes: RouteConfig[], parentPath = ""): any => {
    return routes
      .filter((route) => route.meta && !route.meta.hidden)
      .map((route) => {
        // 拼接完整路径
        const fullPath = route.path.startsWith("/")
          ? route.path
          : `${parentPath}/${route.path}`.replace(/\/+/g, "/");

        const menuItem: any = {
          key: fullPath,
          icon: route.meta?.icon,
          label: route.meta?.title,
          path: fullPath,
        };

        if (route.children && route.children.length > 0) {
          const children = getMenuFromRoutes(route.children, fullPath);
          if (children.length > 0) {
            menuItem.children = children;
          }
        }

        return menuItem;
      });
  };

  const menuItems = getMenuFromRoutes(routes);

  const handleMenuClick = (info: { key: string }) => {
    navigate(info.key);
  };

  // 从 routes 里获取当前选中的菜单 key
  const getSelectedKeys = (): string[] => {
    const findSelectedKey = (
      items: RouteConfig[],
      currentPath: string,
      parentPath = ""
    ): string | null => {
      for (const item of items) {
        if (item.meta?.hidden) continue;

        // 拼接完整路径
        const fullPath =
          item.path.startsWith("/") || !parentPath
            ? item.path
            : `${parentPath}/${item.path}`;

        if (fullPath === currentPath) {
          return item.path; // 或者用 route.key
        }

        if (item.children) {
          const childKey = findSelectedKey(
            item.children,
            currentPath,
            fullPath
          );
          if (childKey) return childKey;
        }
      }
      return null;
    };

    const selectedKey = findSelectedKey(routes, location.pathname);
    return selectedKey ? [selectedKey] : [];
  };

  // 获取展开的菜单 keys
  const getOpenKeys = (): string[] => {
    const openKeys: string[] = [];

    const findOpenKeys = (
      items: RouteConfig[],
      targetPath: string,
      parentKeys: string[] = [],
      parentPath = ""
    ): boolean => {
      for (const item of items) {
        if (item.meta?.hidden) continue;

        const fullPath =
          item.path.startsWith("/") || !parentPath
            ? item.path
            : `${parentPath}/${item.path}`;

        const currentKeys = [...parentKeys, item.path];

        if (fullPath === targetPath) {
          openKeys.push(...parentKeys);
          return true;
        }

        if (item.children) {
          if (findOpenKeys(item.children, targetPath, currentKeys, fullPath)) {
            return true;
          }
        }
      }
      return false;
    };

    findOpenKeys(routes, location.pathname);
    return openKeys;
  };

  const selectedKeys = getSelectedKeys();
  const defaultOpenKeys = getOpenKeys();

  // 侧边栏布局
  if (layoutType === "sidebar") {
    return (
      <ConfigProvider
        theme={{
          algorithm:
            mode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: primaryColor,
          },
          components: {
            Layout: {
              siderBg: mode === "dark" ? "#001529" : "#fff",
              triggerBg: mode === "dark" ? "#002140" : "#fff",
            },
            Menu: {
              itemBg: "transparent",
              itemSelectedBg:
                mode === "dark" ? primaryColor : `${primaryColor}15`,
              itemSelectedColor: mode === "dark" ? "#fff" : primaryColor,
              itemHoverBg:
                mode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.06)",
            },
          },
        }}
      >
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            trigger={null}
            collapsible
            collapsed={sidebarCollapsed}
            width={200}
            collapsedWidth={80}
            theme={mode}
            style={{
              overflow: "auto",
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 0,
              bottom: 0,
              boxShadow:
                mode === "light" ? "2px 0 8px 0 rgba(29,35,41,.05)" : "none",
            }}
          >
            <div className="logo">
              <img src={logo} alt="logo" />
              <span>react-demos</span>
            </div>
            <Menu
              theme={mode}
              mode="inline"
              selectedKeys={selectedKeys}
              defaultOpenKeys={defaultOpenKeys}
              onClick={handleMenuClick}
              items={menuItems}
              inlineCollapsed={sidebarCollapsed}
              style={{
                borderRight: "none",
              }}
            />
          </Sider>
          <Layout
            className="site-layout"
            style={{
              marginLeft: sidebarCollapsed ? 80 : 200,
              transition:
                "margin-left 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)",
            }}
          >
            <Header
              className="site-layout-background"
              style={{
                padding: 0,
                background: mode === "dark" ? "#141414" : "#fff",
                boxShadow: "0 1px 4px rgba(0,21,41,.08)",
                position: "sticky",
                top: 0,
                zIndex: 1,
                borderBottom: mode === "light" ? "1px solid #f0f0f0" : "none",
              }}
            >
              <Button
                type="text"
                onClick={toggleSidebar}
                className={
                  mode === "dark"
                    ? "header-toggle-btn-dark"
                    : "header-toggle-btn"
                }
                style={{
                  marginLeft: 16,
                  fontSize: "16px",
                  width: 32,
                  height: 32,
                  color: mode === "dark" ? "#fff" : "#666",
                }}
                icon={
                  sidebarCollapsed ? (
                    <MenuUnfoldOutlined />
                  ) : (
                    <MenuFoldOutlined />
                  )
                }
              />
              <span
                style={{
                  marginLeft: 16,
                  color: mode === "dark" ? "#fff" : "#666",
                  fontSize: "14px",
                }}
              >
                Hi, {userInfo?.username || "Guest"}
              </span>
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: "calc(100vh - 112px)",
                background: mode === "dark" ? "#1f1f1f" : "#fff",
                borderRadius: 8,
                boxShadow:
                  mode === "dark"
                    ? "0 1px 2px rgba(0,0,0,0.1), 0 1px 6px -1px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.1)"
                    : "0 1px 2px rgba(0,0,0,0.03), 0 1px 6px -1px rgba(0,0,0,0.02), 0 2px 4px rgba(0,0,0,0.02)",
              }}
            >
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    );
  }

  // 顶部菜单布局
  if (layoutType === "top") {
    return (
      <ConfigProvider
        theme={{
          algorithm:
            mode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: primaryColor,
          },
          components: {
            Menu: {
              itemBg: "transparent",
              itemSelectedBg:
                mode === "dark" ? primaryColor : `${primaryColor}15`,
              itemSelectedColor: mode === "dark" ? "#fff" : primaryColor,
              itemHoverBg:
                mode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.06)",
            },
          },
        }}
      >
        <Layout style={{ minHeight: "100vh" }}>
          <Header
            style={{
              display: "flex",
              alignItems: "center",
              background: mode === "dark" ? "#141414" : "#fff",
              boxShadow: "0 1px 4px rgba(0,21,41,.08)",
              borderBottom: mode === "light" ? "1px solid #f0f0f0" : "none",
            }}
          >
            <div className="logo" style={{ marginRight: 24 }}>
              <img src={logo} alt="logo" />
              <span>react-demos</span>
            </div>
            <Menu
              theme={mode}
              mode="horizontal"
              selectedKeys={[location.pathname]}
              onClick={handleMenuClick}
              items={menuItems}
              style={{
                flex: 1,
                minWidth: 0,
                borderBottom: "none",
              }}
            />
            <span
              style={{
                color: mode === "dark" ? "#fff" : "#666",
                fontSize: "14px",
                marginLeft: 16,
              }}
            >
              Hi, {userInfo?.username || "Guest"}
            </span>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: "calc(100vh - 112px)",
              background: mode === "dark" ? "#1f1f1f" : "#fff",
              borderRadius: 8,
              boxShadow:
                mode === "dark"
                  ? "0 1px 2px rgba(0,0,0,0.1), 0 1px 6px -1px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.1)"
                  : "0 1px 2px rgba(0,0,0,0.03), 0 1px 6px -1px rgba(0,0,0,0.02), 0 2px 4px rgba(0,0,0,0.02)",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </ConfigProvider>
    );
  }

  // 混合模式布局
  return (
    <ConfigProvider
      theme={{
        algorithm:
          mode === "dark" ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: primaryColor,
        },
        components: {
          Layout: {
            siderBg: mode === "dark" ? "#001529" : "#fff",
          },
          Menu: {
            itemBg: "transparent",
            itemSelectedBg:
              mode === "dark" ? primaryColor : `${primaryColor}15`,
            itemSelectedColor: mode === "dark" ? "#fff" : primaryColor,
            itemHoverBg:
              mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.06)",
          },
        },
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            background: mode === "dark" ? "#141414" : "#fff",
            boxShadow: "0 1px 4px rgba(0,21,41,.08)",
            borderBottom: mode === "light" ? "1px solid #f0f0f0" : "none",
          }}
        >
          <div className="logo" style={{ marginRight: 24 }}>
            <img src={logo} alt="logo" />
            <span>react-demos</span>
          </div>
          <div style={{ flex: 1 }} />
          <span
            style={{
              color: mode === "dark" ? "#fff" : "#666",
              fontSize: "14px",
              marginRight: 16,
            }}
          >
            Hi, {userInfo?.username || "Guest"}
          </span>
        </Header>
        <Layout>
          <Sider
            width={200}
            theme={mode}
            style={{
              background: mode === "dark" ? "#001529" : "#fff",
              boxShadow:
                mode === "light" ? "2px 0 8px 0 rgba(29,35,41,.05)" : "none",
            }}
          >
            <Menu
              theme={mode}
              mode="inline"
              selectedKeys={[location.pathname]}
              onClick={handleMenuClick}
              items={menuItems}
              style={{
                borderRight: "none",
              }}
            />
          </Sider>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: "calc(100vh - 112px)",
              background: mode === "dark" ? "#1f1f1f" : "#fff",
              borderRadius: 8,
              boxShadow:
                mode === "dark"
                  ? "0 1px 2px rgba(0,0,0,0.1), 0 1px 6px -1px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.1)"
                  : "0 1px 2px rgba(0,0,0,0.03), 0 1px 6px -1px rgba(0,0,0,0.02), 0 2px 4px rgba(0,0,0,0.02)",
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default CommonLayout;
