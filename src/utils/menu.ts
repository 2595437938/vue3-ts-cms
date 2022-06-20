/* eslint-disable @typescript-eslint/no-var-requires */
import { RouteRecordRaw } from "vue-router"

export function MenuToRouter(usermenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 加载所有的router
  const allRouter: RouteRecordRaw[] = []
  const routeFiles = require.context("../router/main", true, /\.ts/)
  routeFiles.keys().forEach((item) => {
    const route = require("../router/main" + item.split(".")[1])
    allRouter.push(route.default)
  })
  // 挑选自己的route
  const _recuresGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRouter.find((item) => item.path === menu.url)
        if (route) routes.push(route)
      } else {
        _recuresGetRoute(menu.children)
      }
    }
  }
  _recuresGetRoute(usermenus)
  return routes
}
