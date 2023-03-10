import axios, { AxiosRequestConfig } from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { 'content-type': 'application/json;charset=utf-8' }
})

// 请求拦截 
service.interceptors.request.use((config) => {
  console.log('config', config);

  return config
}, error => {
  Promise.reject(error)
})
// 响应拦截

service.interceptors.request.use(res => {
  return Promise.resolve(res)
}, error => {
  Promise.reject(error)
})

export default service