import xtRequest from "../index"
import { IAccountLogin, IDataType, ILoginResult } from "./type"

enum LoginApi {
  AccountLogin = "/login",
  UserInfo = "/users/",
  UserMenu = "/role/"
}

export function AccountLogin(account: IAccountLogin) {
  return xtRequest.post<IDataType<ILoginResult>>({
    url: LoginApi.AccountLogin,
    data: account
  })
}
export function getUserInfo(id: number) {
  return xtRequest.get<IDataType<any>>({
    url: LoginApi.UserInfo + id
  })
}
export function getUserMenu(id: number) {
  return xtRequest.get<IDataType<any>>({
    url: LoginApi.UserMenu + id + "/menu"
  })
}
