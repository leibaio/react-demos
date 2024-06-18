import request from "@/utils/request";

export const getUserList = (params: any) => {
  return request({
    url: "/api/getUserList",
    method: "get",
    params,
  });
};