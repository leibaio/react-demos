// 导出所有类型定义
export * from "./api";
export * from "./route";

// 通用类型定义
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// 组件 Props 基础类型
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// 表单字段类型
export interface FormField {
  name: string;
  label: string;
  type: "input" | "textarea" | "select" | "checkbox" | "radio" | "date";
  required?: boolean;
  placeholder?: string;
  options?: Array<{ label: string; value: string | number | boolean }>;
  rules?: Array<Record<string, unknown>>;
}

// 表格列配置类型
export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  title: string;
  dataIndex: string;
  width?: number;
  align?: "left" | "center" | "right";
  sorter?: boolean;
  render?: (value: unknown, record: T, index: number) => React.ReactNode;
}

// 主题配置类型
export interface ThemeConfig {
  primaryColor: string;
  mode: "light" | "dark";
  borderRadius: number;
  fontSize: number;
}
