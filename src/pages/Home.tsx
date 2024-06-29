import { getUserList } from "@/api";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

const Home = () => {
  const [userList, setUserList] = useState<any[]>([]);
  const { userInfo } = useAuth();

  useEffect(() => {}, [userInfo]);

  const handlePrimary = async () => {
    const { data } = await getUserList({ query: 123 });
    setUserList(data.userList);
  };

  return (
    <>
      <div>Home page</div>
      <h1>Hi,{userInfo?.name}</h1>
      <button className="btn btn-primary" onClick={handlePrimary}>
        Primary
      </button>
      <button className="btn btn-secondary">Secondary</button>
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
