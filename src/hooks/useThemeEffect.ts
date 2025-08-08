import { useEffect } from "react";
import { useThemeStore } from "@/stores";

export const useThemeEffect = () => {
  const { primaryColor, mode } = useThemeStore();

  useEffect(() => {
    // 更新 CSS 变量
    const root = document.documentElement;
    root.style.setProperty("--ant-primary-color", primaryColor);

    // 计算 hover 颜色
    const hoverColor = adjustColor(primaryColor, 20);
    root.style.setProperty("--ant-primary-color-hover", hoverColor);

    // 计算背景颜色
    const bgColor =
      mode === "dark"
        ? `${primaryColor}33` // 20% opacity
        : `${primaryColor}1A`; // 10% opacity
    root.style.setProperty("--ant-primary-color-bg", bgColor);

    const bgHoverColor =
      mode === "dark"
        ? `${primaryColor}4D` // 30% opacity
        : `${primaryColor}33`; // 20% opacity
    root.style.setProperty("--ant-primary-color-bg-hover", bgHoverColor);

    // 设置主题模式
    document.documentElement.setAttribute("data-theme", mode);
  }, [primaryColor, mode]);
};

// 颜色调整工具函数
function adjustColor(color: string, amount: number): string {
  const usePound = color[0] === "#";
  const col = usePound ? color.slice(1) : color;
  const num = parseInt(col, 16);
  let r = (num >> 16) + amount;
  let g = ((num >> 8) & 0x00ff) + amount;
  let b = (num & 0x0000ff) + amount;
  r = r > 255 ? 255 : r < 0 ? 0 : r;
  g = g > 255 ? 255 : g < 0 ? 0 : g;
  b = b > 255 ? 255 : b < 0 ? 0 : b;
  return (
    (usePound ? "#" : "") +
    ((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")
  );
}
