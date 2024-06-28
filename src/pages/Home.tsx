import { getUserList } from "@/api";
import { useState } from "react";

const Home = () => {
  const [userList, setUserList] = useState<any[]>([]);

  const handlePrimary = async () => {
    const { data } = await getUserList({ query: 123 });
    console.log("[ data ] >", data);
    setUserList(data.userList);
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
