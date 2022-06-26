import { Module } from "vuex"

import { AccountLogin, getUserInfo, getUserMenu } from "@/service/login/login"
import { IAccountLogin } from "@/service/login/type"
import LocalCache from "@/utils/cache"
import { MenuToRouter, mapMenusToPermissions } from "@/utils/menu"
import router from "@/router"

const loginModules: Module<any, any> = {
  namespaced: true,
  state: () => {
    return {
      token: "",
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
      LocalCache.setCache("token", token)
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
      LocalCache.setCache("userInfo", userInfo)
    },
    changeUserMenus(state, userMenu: any) {
      state.userMenus = userMenu
      LocalCache.setCache("userMenus", userMenu)
      const routes = MenuToRouter(userMenu)
      // 循环注册
      routes.forEach((route) => {
        router.addRoute("main", route)
      })
      // 获取按钮权限
      const permissions = mapMenusToPermissions(userMenu)
      state.permissions = permissions
    }
  },
  actions: {
    async acctountLoginAction(context, payload: IAccountLogin) {
      // 登录逻辑
      const LoginResult = await AccountLogin(payload)
      const { id, token } = LoginResult.data
      context.commit("changeToken", token)
      // 获取登陆数据以外的info
      const UserInfoResult = await getUserInfo(id)
      const userInfo = UserInfoResult.data
      context.commit("changeUserInfo", userInfo)
      // 请求路由菜单
      const UserMenuResult = await getUserMenu(userInfo.role.id)
      const userMenu = UserMenuResult.data
      context.commit("changeUserMenus", userMenu)
      // 登陆完成跳转首页
      router.push("/main")
    },
    LoadLocalLogin(context) {
      const token = LocalCache.getCache("token")
      if (token) {
        context.commit("changeToken", token)
        const userInfo = LocalCache.getCache("userInfo")
        if (userInfo) {
          context.commit("changeUserInfo", userInfo)
        }
        const userMenu = LocalCache.getCache("userMenus")
        if (userMenu) {
          context.commit("changeUserMenus", userMenu)
        }
      }
    },

    // 手机号登陆
    phoneLoginAction(context, payload) {
      console.log("执行phoneLoginAction", payload)
    }
  },
  getters: {}
}

export default loginModules
