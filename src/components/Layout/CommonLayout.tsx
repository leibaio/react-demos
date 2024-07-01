import logo from "@/assets/logo.svg";
import menuConfig from "@/config/menuConfig";
import { useAuth } from "@/contexts/AuthContext";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./CommonLayout.less";

const { Header, Content, Sider } = Layout;

const CommonLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

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
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <img src={logo} alt="logo" style={{ height: "32px" }} />
          {collapsed ? null : <span>react-demos</span>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={handleMenuClick}
          items={menuItems}
        ></Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{ marginLeft: 16 }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <span style={{ marginLeft: 16 }}>Hi, {userInfo?.name}</span>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#fff",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default CommonLayout;
