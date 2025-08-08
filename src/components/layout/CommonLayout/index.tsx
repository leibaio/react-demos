import logo from "@/assets/logo.svg";
import menuConfig from "@/config/menuConfig";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Layout, Menu, theme } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore, useThemeStore } from "../../../stores";
import "./index.less";

const { Header, Content, Sider } = Layout;

const CommonLayout = () => {
  const { primaryColor, mode, sidebarCollapsed, toggleSidebar } =
    useThemeStore();
  const { userInfo } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  const renderMenuItems = (menuItems: any) => {
    return menuItems.map((item: any) => {
      if (item.children) {
        return {
          key: item.key,
          icon: item.icon,
          label: item.label,
          children: renderMenuItems(item.children),
        };
      }
      return {
        key: item.key,
        icon: item.icon,
        label: item.label,
      };
    });
  };
  const menuItems = renderMenuItems(menuConfig);

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
            selectedKeys={[location.pathname]}
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
            transition: "margin-left 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)",
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
                mode === "dark" ? "header-toggle-btn-dark" : "header-toggle-btn"
              }
              style={{
                marginLeft: 16,
                fontSize: "16px",
                width: 32,
                height: 32,
                color: mode === "dark" ? "#fff" : "#666",
              }}
              icon={
                sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
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
};

export default CommonLayout;
