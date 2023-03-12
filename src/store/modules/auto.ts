const TokenKey = 'koa-token'
const UserKey = 'koa-user'

export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function setToken(token: string) {
  return localStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return localStorage.removeItem(TokenKey)
}

export function getUser() {
  return localStorage.getItem(UserKey)
}

export function setUser(user: string) {
  return localStorage.setItem(UserKey, user)
}

export function removeUser() {
  return localStorage.removeItem(UserKey)
}

export function removeUserToken() {
  localStorage.removeItem(TokenKey)
  localStorage.removeItem(UserKey)
  return
}