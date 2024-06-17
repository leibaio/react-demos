// utils/request.ts

import axios from 'axios';

// 创建 axios 实例
const request = axios.create({
  baseURL: 'https://your-api-base-url.com', // API 基础地址
  timeout: 5000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json'
    // 更多的全局性请求头可以在这里配置
  }
});

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 在这里添加认证token，或其他必要的处理
    // config.headers.Authorization = `Bearer ${yourAuthToken}`;
    return config;
  },
  error => {
    // 请求错误处理
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 根据业务需求处理响应数据
    return response.data;
  },
  error => {
    // 响应错误处理，例如弹出错误提示
    return Promise.reject(error);
  }
);

export default request;