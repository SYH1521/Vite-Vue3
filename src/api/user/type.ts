export interface UserParameter {
  user_name: string,
  role: string,
  pageNum: number,
  pageSize: number
}

export interface AddOrEditUserParameter {
  user_name: string,
  password: string,
  // role: string,
}