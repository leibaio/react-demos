import request from "@/utils/request";

export const loginApi = (data: any) => {
  return request({
    url: "/api/login",
    method: "post",
    data,
  });
};

export const getUserList = (params: any) => {
  return request({
    url: "/api/getUserList",
    method: "get",
    params,
  });
};