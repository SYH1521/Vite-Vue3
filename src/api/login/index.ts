import request from '@/utils/request'
import { AxiosPromise, AxiosResponse } from 'axios'
import { LoginData, TokenResult } from './types'

export function loginApi(data: LoginData): AxiosPromise<TokenResult> {
  return request({
    url: '/users/login',
    method: 'POST',
    data: data,
  })
}