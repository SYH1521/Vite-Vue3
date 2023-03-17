import request from '@/utils/request'
import { AddOrEditUserParameter, UserParameter } from './type'
import { AxiosPromise, AxiosResponse } from 'axios'
import { getToken } from '@/store/modules/auto'

export function getUserData(data: UserParameter): AxiosPromise {
  return request({
    url: '/users/getUserList',
    method: 'POST',
    data: data,
    headers: { 'Authorization': getToken() }
  })
}

export function addUserForm(data: AddOrEditUserParameter): AxiosPromise {
  return request({
    url: '/users/register',
    method: 'POST',
    data: data,
    headers: { 'Authorization': getToken() }
  })
}

export function changePassword(data: AddOrEditUserParameter): AxiosPromise {
  return request({
    url: '/users/changePassword',
    method: 'patch',
    data: data,
    headers: { 'Authorization': getToken() }
  })
}

export function daleteUser(id: number): AxiosPromise {
  return request({
    url: `/users/deleteUser?id=${id}`,
    method: 'delete',
    headers: { 'Authorization': getToken() }
  })
}