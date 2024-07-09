import "./index.less";
import { Watermark } from "antd";
const WatermarkDemo = () => {
  const watermarkOptions = {
    content: "react-demos",
    color: "rgba(0, 0, 0, 0.15)",
    fontSize: 16,
    zIndex: 11,
    rotate: -22,
  };

  return (
    <Watermark {...watermarkOptions}>
      <div className='h-svh'>watermark</div>
    </Watermark>
  );
};

export default WatermarkDemo;
