import type {
  ApiResponse,
  GetUserListParams,
  LoginRequest,
  LoginResponse,
  CreateUser,
} from "@/types";
import request from "@/utils/request";

const Api = {
  Login: "/api/user/login",
  QueryByPage: "/api/user/queryByPage",
  Create: "/api/user/create",
};

/**
 * 用户登录
 * @param data 登录参数
 * @returns 登录响应
 */
export const loginApi = (
  data: LoginRequest
): Promise<ApiResponse<LoginResponse>> => {
  return request({
    url: Api.Login,
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
    url: Api.QueryByPage,
    method: "GET",
    params,
  });
};

export const createUser = (data: CreateUser): Promise<ApiResponse> => {
  return request({
    url: Api.Create,
    method: "POST",
    data,
  });
};
