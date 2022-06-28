import { createStore } from "vuex"
import loginModules from "./modules/login"
import system from "./modules/main/system/system"
import dashboard from "./modules/main/analysis/dashboard"
import { getPageListdata } from "@/service/main/system/system"

const store = createStore<any>({
  state: () => {
    return {
      name: "sxt",
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeDepartment(state, data) {
      state.entireDepartment = data
    },
    changeRole(state, data) {
      state.entireRole = data
    },
    changeMenu(state, data) {
      state.entireMenu = data
    }
  },
  actions: {
    // 获取部门与角色列表
    async getEntireData(content) {
      const departmentResult = await getPageListdata("/department/list", {
        offset: 0,
        size: 1000
      })
      const { list: departmentList } = departmentResult.data
      const roleResult = await getPageListdata("/role/list", {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      const menuResult = await getPageListdata("/menu/list", {})
      const { list: meunList } = menuResult.data
      content.commit("changeDepartment", departmentList)
      content.commit("changeRole", roleList)
      content.commit("changeMenu", meunList)
    }
  },
  getters: {},
  modules: {
    loginModules,
    system,
    dashboard
  }
})

export function setupStore() {
  store.dispatch("loginModules/LoadLocalLogin")
  // store.dispatch("getEntireData")
}

export default store
