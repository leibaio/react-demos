import { getUserList } from "@/api";
import { useEffect } from "react";

const About = () => {
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const res = await getUserList({});
    console.log("[ res ] >", res);
  };

  return (
    <>
      <div>About page</div>
    </>
  );
};

export default About;
