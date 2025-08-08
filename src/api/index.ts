import type {
  ApiResponse,
  GetUserListParams,
  LoginRequest,
  LoginResponse,
} from "@/types";
import request from "@/utils/request";

/**
 * 用户登录
 * @param data 登录参数
 * @returns 登录响应
 */
export const loginApi = (
  data: LoginRequest
): Promise<ApiResponse<LoginResponse>> => {
  return request({
    url: "/login",
    method: "POST",
    data,
  });
};

/**
 * 获取用户列表
 * @param params 查询参数
 * @returns 用户列表响应
 */
export const getUserList = (
  params: GetUserListParams
): Promise<ApiResponse> => {
  return request({
    url: "/user/page",
    method: "GET",
    params,
  });
};
