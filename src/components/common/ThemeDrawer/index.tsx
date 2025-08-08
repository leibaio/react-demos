import { CheckOutlined, SettingOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  ColorPicker,
  Divider,
  Drawer,
  FloatButton,
  Radio,
  Space,
  Typography,
} from "antd";
import { useState } from "react";
import { LayoutType, useThemeStore } from "../../../stores";
import "./index.less";

const { Title, Text } = Typography;

const ThemeDrawer = () => {
  const [open, setOpen] = useState(false);
  const {
    primaryColor,
    mode,
    layoutType,
    setPrimaryColor,
    setMode,
    setLayoutType,
    resetConfig,
  } = useThemeStore();

  const layoutOptions = [
    { label: "侧边栏", value: "sidebar" as LayoutType },
    { label: "顶部菜单", value: "top" as LayoutType },
    { label: "混合模式", value: "mix" as LayoutType },
  ];

  const presetColors = [
    "#1890ff",
    "#722ed1",
    "#13c2c2",
    "#52c41a",
    "#faad14",
    "#f5222d",
    "#fa541c",
    "#eb2f96",
  ];

  return (
    <>
      <FloatButton
        icon={<SettingOutlined />}
        type="primary"
        style={{ right: 24, bottom: 120 }}
        onClick={() => setOpen(true)}
      />
      <Drawer
        title="主题配置"
        placement="right"
        width={320}
        onClose={() => setOpen(false)}
        open={open}
        className="theme-drawer"
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* 主题模式 */}
          <div>
            <Title level={5}>主题模式</Title>
            <Radio.Group
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              style={{ width: "100%" }}
            >
              <Radio.Button
                value="light"
                style={{ width: "50%", textAlign: "center" }}
              >
                🌞 浅色
              </Radio.Button>
              <Radio.Button
                value="dark"
                style={{ width: "50%", textAlign: "center" }}
              >
                🌙 深色
              </Radio.Button>
            </Radio.Group>
          </div>

          <Divider />

          {/* 主题色 */}
          <div>
            <Title level={5}>主题色</Title>
            <div className="color-picker-section">
              <ColorPicker
                value={primaryColor}
                onChange={(color) => setPrimaryColor(color.toHexString())}
                showText
                size="large"
                style={{ width: "100%" }}
              />
              <div className="preset-colors">
                <Text type="secondary">预设颜色</Text>
                <div className="color-grid">
                  {presetColors.map((color) => (
                    <div
                      key={color}
                      className={`color-item ${primaryColor === color ? "active" : ""}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setPrimaryColor(color)}
                    >
                      {primaryColor === color && <CheckOutlined />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Divider />

          {/* 布局配置 */}
          <div>
            <Title level={5}>布局配置</Title>
            <Radio.Group
              value={layoutType}
              onChange={(e) => setLayoutType(e.target.value)}
              style={{ width: "100%" }}
            >
              <Space direction="vertical" style={{ width: "100%" }}>
                {layoutOptions.map((option) => (
                  <Card
                    key={option.value}
                    size="small"
                    className={`layout-card ${layoutType === option.value ? "active" : ""}`}
                    onClick={() => setLayoutType(option.value)}
                  >
                    <Radio value={option.value}>{option.label}</Radio>
                    <div className={`layout-preview layout-${option.value}`}>
                      <div className="preview-header"></div>
                      <div className="preview-sidebar"></div>
                      <div className="preview-content"></div>
                    </div>
                  </Card>
                ))}
              </Space>
            </Radio.Group>
          </div>

          <Divider />

          {/* 重置按钮 */}
          <Button block onClick={resetConfig}>
            重置配置
          </Button>
        </Space>
      </Drawer>
    </>
  );
};

export default ThemeDrawer;
