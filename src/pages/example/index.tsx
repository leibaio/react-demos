import { Card, Typography, Steps, Alert } from "antd";

const { Title, Paragraph, Text } = Typography;
const { Step } = Steps;

const Example = () => {
  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>统一路由配置示例</Title>

      <Alert
        message="新的路由配置系统"
        description="这个页面演示了如何使用新的统一路由配置系统。只需要在一个地方配置，就能同时生成菜单和路由。"
        type="success"
        showIcon
        style={{ marginBottom: 24 }}
      />

      <Card title="配置步骤" style={{ marginBottom: 24 }}>
        <Steps direction="vertical" current={3}>
          <Step
            title="定义路由配置"
            description="在 src/routes 中添加路由配置"
          />
          <Step
            title="自动生成菜单"
            description="系统自动从配置生成 Ant Design 菜单"
          />
          <Step
            title="页面正常显示"
            description="路由和菜单都正常工作，无需重复配置"
          />
        </Steps>
      </Card>

      <Card title="配置示例">
        <Paragraph>
          <Text code>
            {`{
  path: "/example",
  title: "示例页面",
  icon: "ExperimentOutlined",
  component: "pages/example",
  requireAuth: false,
}`}
          </Text>
        </Paragraph>

        <Paragraph>这个简单的配置就能：</Paragraph>
        <ul>
          <li>
            创建路由 <Text code>/example</Text>
          </li>
          <li>在菜单中显示 "示例页面"</li>
          <li>使用实验图标</li>
          <li>
            加载 <Text code>src/pages/example/index.tsx</Text> 组件
          </li>
          <li>不需要登录验证</li>
        </ul>
      </Card>
    </div>
  );
};

export default Example;
