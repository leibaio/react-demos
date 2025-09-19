import { getUserList } from "@/api";
import { useAuthStore } from "@/stores"; // 替换路径
import { useEffect, useState } from "react";
import { Button } from "antd";

const Home = () => {
  const [userList, setUserList] = useState<any[]>([]);
  const { userInfo } = useAuthStore();

  useEffect(() => {
    // 可以在这里做初始化，比如拉取用户数据
    console.log("当前登录用户:", userInfo);
  }, [userInfo]);

  const handlePrimary = async () => {
    try {
      const res = await getUserList({});
      // 假设返回格式 { code: number, message: string, data: { userList: [...] } }
      if (res.code === 200 && res.data) {
        setUserList(res.data.userList || []);
      }
    } catch (error) {
      console.error("获取用户列表失败:", error);
    }
  };

  return (
    <>
      <div>Home page</div>
      <h1>Hi, {userInfo?.username}</h1>
      <Button type="primary" onClick={handlePrimary} style={{ marginRight: 8 }}>
        Primary
      </Button>
      <Button>Secondary</Button>
      <div>
        {userList.map((user) => (
          <p key={user._id}>
            {user.name}-{user.email}
          </p>
        ))}
      </div>
    </>
  );
};

export default Home;
