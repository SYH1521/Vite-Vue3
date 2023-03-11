import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus';

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { 'content-type': 'application/json;charset=utf-8' }
})

// 请求拦截 
service.interceptors.request.use((config) => {
  return config
}, error => {
  Promise.reject(error)
})
// 响应拦截

service.interceptors.response.use((response) => {
  console.log('response', response);
  const { code, message } = response.data
  if (code === 0) {
    return response
  } else {
    ElMessage({
      message: message || '系统出错',
      type: 'error'
    });
  }
  return Promise.resolve(response)
}, error => {
  const { message } = error.response.data
  if (message) {
    ElMessage({
      message: message || '系统出错',
      type: 'error'
    });
  }
  Promise.reject(error)
})

export default service