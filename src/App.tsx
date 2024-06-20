import { getUserList } from "@/api";
import { useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

// TODO 生成 token 

function App() {
  const [count, setCount] = useState(0);
  const [userList, setUserList] = useState<any[]>([]);

  const handlePrimary = async () => {
    const res = await getUserList({ query: 123 });
    console.log("[ res ] >", res);
    setUserList(res.data);
  };
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
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
}

export default App;
