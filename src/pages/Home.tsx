import { getUserList } from "@/api";
import { useState } from "react";

const Home = () => {
  const [userList, setUserList] = useState<any[]>([]);

  const handlePrimary = async () => {
    const res = await getUserList({ query: 123 });
    console.log("[ res ] >", res);
    setUserList(res.data);
  };

  return (
    <>
      <div>Home page</div>
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
