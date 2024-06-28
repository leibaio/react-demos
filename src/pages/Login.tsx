import { useAuth } from "@/contexts/AuthContext";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form] = Form.useForm();
  const { login } = useAuth();
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const navigate = useNavigate();

  const onRememberMe = (e: any) => {
    console.log("[ e ] >", e);
  };

  const handleLogin = async () => {
    const values = await form.validateFields();
    await login(values.email, values.password);
    navigate("/home");
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <Form
          className="p-8 bg-white rounded-lg shadow-md w-96"
          form={form}
          {...layout}
        >
          <h2 className="text-2xl font-bold text-center mb-8">登录</h2>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "请输入邮箱" }]}
          >
            <Input placeholder="请输入邮箱" />
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
              <Checkbox onChange={onRememberMe}>记住我</Checkbox>
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
    </>
  );
};

export default Login;
