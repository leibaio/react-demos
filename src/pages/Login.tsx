const Login = () => {
  const handleLogin = () => {
    console.log("login");
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="p-8 bg-white rounded-lg shadow-md w-96"
        >
          <h2 className="text-2xl font-bold text-center mb-8">登录</h2>

          <div className="mb-4">
            <label className="block text-gray-700">邮箱</label>
            <input
              type="email"
              placeholder="example@example.com"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">密码</label>
            <input
              type="password"
              placeholder="········"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-sm text-gray-600">记住我</span>
            </label>

            <a href="#" className="text-sm text-indigo-500 hover:underline">
              忘记密码?
            </a>
          </div>

          <button className="w-full p-3 text-white bg-indigo-500 hover:bg-indigo-600 rounded-md focus:outline-none focus:ring">
            登录
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
