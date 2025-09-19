// 通用 API 响应类型
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  timestamp: number;
}

// 分页响应类型
export interface PaginationResponse<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

// 登录相关类型
export interface LoginRequest {
  username: string;
  password: string;
  remember?: boolean;
}

// 用户列表查询参数
export interface GetUserListParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  status?: "active" | "inactive";
}

// HTTP 请求方法类型
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// 请求配置类型
export interface RequestConfig {
  url: string;
  method: HttpMethod;
  data?: any;
  params?: any;
  headers?: Record<string, string>;
  timeout?: number;
}
