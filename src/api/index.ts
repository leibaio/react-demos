import request from "@/utils/request";

export const getList = (params: any) => {
  return request({
    url: "/api/list",
    method: "post",
    params,
  });
};