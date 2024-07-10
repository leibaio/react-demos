import { useRef } from "react";
import "./index.less";

const Metro = () => {
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (event: React.MouseEvent) => {
    console.log("[ event ] >", event);
    if (imageRef.current) {
      const { clientX, clientY } = event;
      const { offsetWidth, offsetHeight, offsetLeft, offsetTop } =
        imageRef.current;

      const x = clientX - (offsetLeft + offsetWidth / 2);
      const y = clientY - (offsetTop + offsetHeight / 2);

      const rotateX = (y / offsetHeight) * 15;
      const rotateY = (x / offsetWidth) * -15;

      imageRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  };

  const handleMouseLeave = () => {
    if (imageRef.current) {
      imageRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <div className="text-3xl">
      <div className="font-semibold text-3xl">metro</div>
      <div className="flex h-full bg-orange-300 text-3xl">
        <div className="w-2/3 flex flex-col p-1">
          <div
            className="rounded-xl image-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            ref={imageRef}
          >
            <img
              src="https://images.unsplash.com/photo-1558979158-65a1eaa08691?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
              alt=""
            />
          </div>
          <div className="mt-1">lb</div>
        </div>
        <div className="w-1/3 p-1 pl-0">
          <div className="h-1/2 bg-slate-50 mb-0.5">
            <div className="h-full flex flex-col justify-center items-center ">
              <div className="text-3xl">当前站</div>
              <div>Current Station</div>
              <div className="mt-8">衡山路</div>
              <div>Hengshan Road</div>
            </div>
          </div>
          <div className="h-1/2 bg-slate-50">
            <div className="h-full flex flex-col justify-center items-center ">
              <div className="text-3xl">当前站</div>
              <div>Current Station</div>
              <div className="mt-8">衡山路</div>
              <div>Hengshan Road</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metro;
