import logo from "@/assets/logo.svg";
import menuConfig from "@/config/menuConfig";
import { useAuth } from "@/contexts/AuthContext";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { useCallback, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./index.less";

const { Header, Content, Sider } = Layout;

const CommonLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

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
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={200}
        collapsedWidth={80}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo">
          <img src={logo} alt="logo" />
          <span>react-demos</span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={handleMenuClick}
          items={menuItems}
          inlineCollapsed={collapsed}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: collapsed ? 80 : 200,
          transition: "margin-left 0.2s cubic-bezier(0.645, 0.045, 0.355, 1)",
        }}
      >
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            background: "#fff",
            boxShadow: "0 1px 4px rgba(0,21,41,.08)",
            position: "sticky",
            top: 0,
            zIndex: 1,
          }}
        >
          <Button
            type="text"
            onClick={toggleCollapsed}
            style={{
              marginLeft: 16,
              fontSize: "16px",
              width: 32,
              height: 32,
            }}
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          />
          <span style={{ marginLeft: 16, color: "#666" }}>
            Hi, {userInfo?.username || "Guest"}
          </span>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "calc(100vh - 112px)",
            background: "#fff",
            borderRadius: 8,
            boxShadow:
              "0 1px 2px rgba(0,0,0,0.03), 0 1px 6px -1px rgba(0,0,0,0.02), 0 2px 4px rgba(0,0,0,0.02)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default CommonLayout;
