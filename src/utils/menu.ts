/* eslint-disable @typescript-eslint/no-var-requires */
import { id } from "element-plus/es/locale"
import { RouteRecordRaw } from "vue-router"

let firstMenu: any = null
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
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recuresGetRoute(menu.children)
      }
    }
  }
  _recuresGetRoute(usermenus)
  return routes
}
// 寻找父级稍微
export function pathMapBreadMenu(userMenus: any[], currentPath: string) {
  const breads: any[] = []
  pathMapToMenu(userMenus, currentPath, breads)
  return breads
}
// /main/system/role  -> type === 2 对应menu
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breads?: any[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breads?.push({ name: menu.name, path: menu.url })
        breads?.push({ name: findMenu.name, path: findMenu.url })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

// 获取当前登录人所有按钮权限
export function mapMenusToPermissions(userMenus: any[]) {
  const permission: string[] = []

  const _recuresGetPermissions = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recuresGetPermissions(menu.children ?? [])
      } else if (menu.type === 3) {
        permission.push(menu.permission)
      }
    }
  }
  _recuresGetPermissions(userMenus)
  return permission
}

export { firstMenu }
