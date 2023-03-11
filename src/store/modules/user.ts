import { loginApi } from "@/api/login";
import { LoginData } from "@/api/login/types";
import { ElMessage } from "element-plus";
import { defineStore } from "pinia";
import { getToken, setToken } from "./auto";

export const userStore = defineStore('user', () => {

  const vToken = ref<string>(getToken() || '');

  // 登录
  function login(loginData: LoginData) {
    return new Promise<void>((resolve, reject) => {
      loginApi(loginData).then((response) => {
        const { message, token } = response.data
        vToken.value = token
        setToken(token)
        ElMessage.success(message)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  }
  return { login }
})
