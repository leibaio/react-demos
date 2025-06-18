import { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Demo = () => {
  console.log("Demo 组件正在重新渲染...");

  const [count, setCount] = useState(0); // 用于触发组件重新渲染，但不影响 useMemo 的依赖
  const [dataItems, setDataItems] = useState([10, 20, 30]); // useMemo 的依赖项

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("[ 路由发生变化 ] >", location);
  }, [location]);

  console.log("[ location,navigate ] >", location, navigate);

  // useMemo 示例
  // useMemo 记忆化一个计算结果
  // 只有当 dataItems 数组的引用发生变化时，这里模拟的 昂贵计算 才会被重新执行，否则即使组件因为 count 变化重新渲染，doubledItems 的值也会直接从缓存中获取

  const doubledItems = useMemo(() => {
    console.log("[ useMemo，重新计算双倍数据，仅当 dataItems 变化时 ] >");
    // 假设这是一个耗时的操作，例如处理大量数据，或者处理负责的数学计算
    return dataItems.map((item) => item * 2);
  }, [dataItems]);

  const handleAddCount = () => {
    // 函数式更新：每次基于最新值
    setCount((prevCount) => prevCount + 1);
  };

  /**
 *   const handleAddCount2 = () => {
    // 值更新：每次都使用初始闭包中的 count
    setCount(count + 1);
  };
 */

  const handleAddDateItem = () => {
    setDataItems([...dataItems, Math.floor(Math.random() * 100)]);
  };

  return (
    <>
      <h1>Demo page</h1>
      <p>计数（不影响 useMemo 依赖）: {count}</p>
      <p>原始数据：{JSON.stringify(dataItems)}</p>
      <p>双倍数据（通过 useMemo 计算）: {JSON.stringify(doubledItems)}</p>

      <button className="btn btn-xs mr-2" onClick={handleAddCount}>
        增加计数（不触发 useMemo 重新计算）
      </button>
      {/* <button className="btn btn-xs" onClick={handleAddCount2}>
        增加计数（不触发 useMemo 重新计算）
      </button> */}

      <button className="btn btn-xs" onClick={handleAddDateItem}>
        增加数据项（触发 useMemo 计算）
      </button>
    </>
  );
};

export default Demo;
