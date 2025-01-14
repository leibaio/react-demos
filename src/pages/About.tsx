import { useEffect, useState, useRef } from "react";

const About = () => {
  const [count, setCount] = useState(10);
  const timerRef = useRef(null);

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
    </>
  );
};

export default About;
