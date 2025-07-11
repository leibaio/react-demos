import { useEffect, useState, useRef } from "react";
import { Button } from "antd";

const About = () => {
  const [count, setCount] = useState(10);
  const timerRef = useRef(null);

  const [person, setPerson] = useState({
    name: "John",
    address: { city: "New York" },
  });

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
    // 清除函数，在组件卸载时调用
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <>
      <div>About page</div>
      <h1>{count}</h1>
      <Button
        onClick={() => {
          person.address.city = "New York1";
        }}
      >
        test1
      </Button>

      {/* 状态更新必须通过 setState 函数来更新状态，否则状态更新会被忽略 */}
      <Button
        onClick={() => {
          setPerson((prev) => ({
            ...prev,
            address: { city: "New York2" },
          }));
        }}
      >
        test2
      </Button>
      <div>{person.address.city}</div>
    </>
  );
};

export default About;
