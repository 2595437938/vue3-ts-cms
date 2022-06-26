import { Module } from "vuex"
import {
  getPageListdata,
  deletePageData,
  createPageData,
  editPageData
} from "@/service/main/system/system"

const system: Module<any, any> = {
  namespaced: true,
  state: () => {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUsersList(state, list) {
      state.usersList = list
    },
    changeUsersCount(state, count) {
      state.usersCount = count
    },
    changeRoleList(state, list) {
      state.roleList = list
    },
    changeRoleCount(state, count) {
      state.roleCount = count
    },
    changeGoodsList(state, list) {
      state.goodsList = list
    },
    changeGoodsCount(state, count) {
      state.goodsCount = count
    },
    changeMenuList(state, list) {
      state.menuList = list
    },
    changeMenuCount(state, count) {
      state.menuCount = count
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return state[`${pageName}List`]
      }
    },
    pageCountData(state) {
      return (pageName: string) => {
        return state[`${pageName}Count`]
      }
    }
  },
  actions: {
    async getPageListAction(context, data: any) {
      // 获取不通url
      const pageName = data.pageName
      const pageUrl = `/${data.pageName}/List`
      // switch (pageName) {
      //   case "users":
      //     pageUrl = "/users/list"
      //     break
      //   case "role":
      //     pageUrl = "/role/list"
      //     break
      // }
      // 发送请求
      const pageResult = await getPageListdata(pageUrl, data.queryInfo)
      const { list, totalCount } = pageResult.data

      // 存储数据

      // 转化大小写
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      context.commit(`change${changePageName}List`, list)
      context.commit(`change${changePageName}Count`, totalCount)
    },
    // 删除数据请求
    async deletePageDataAction(context, data: any) {
      const { id, pageName } = data
      const pageUrl = `${pageName}/${id}`
      await deletePageData(pageUrl)
      context.dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    // 新增数据请求
    async createPageDataAction(context, data: any) {
      const { newData, pageName } = data
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)
      context.dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    // 新增数据请求
    async editPageDataAction(context, data: any) {
      const { editData, pageName, id } = data
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)
      context.dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}

export default system
