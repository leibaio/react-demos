import { useAuthStore } from "@/stores";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const [form] = Form.useForm();
  const { login } = useAuthStore();
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const navigate = useNavigate();

  const handleLogin = async () => {
    const values = await form.validateFields();
    const userInfo = await login(values.username, values.password, rememberMe);
    if (userInfo) {
      notification.success({ message: `欢迎回来, ${userInfo.username}` });
      navigate("/home", { replace: true });
    } else {
      notification.error({ message: "登录失败，请检查用户名或密码" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Form
        className="p-8 bg-white rounded-lg shadow-md w-96"
        form={form}
        {...layout}
        initialValues={{
          username: "admin",
          password: "123456",
        }}
      >
        <h2 className="text-2xl font-bold text-center mb-8">登录</h2>
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "请输入密码" }]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center">
            <Checkbox
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            >
              记住我
            </Checkbox>
          </label>
          <a href="#" className="text-sm text-blue-500 hover:underline">
            忘记密码?
          </a>
        </div>
        <Button className="w-full p-5" type="primary" onClick={handleLogin}>
          登录
        </Button>
      </Form>
    </div>
  );
};

export default Login;
