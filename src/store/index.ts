import { createStore } from "vuex"
import loginModules from "./modules/login"
import system from "./modules/main/system/system"
import { getPageListdata } from "@/service/main/system/system"

const store = createStore<any>({
  state: () => {
    return {
      name: "sxt",
      entireDepartment: [],
      entireRole: []
    }
  },
  mutations: {
    changeDepartment(state, data) {
      state.entireDepartment = data
    },
    changeRole(state, data) {
      state.entireRole = data
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
      content.commit("changeDepartment", departmentList)
      content.commit("changeRole", roleList)
    }
  },
  getters: {},
  modules: {
    loginModules,
    system
  }
})

export function setupStore() {
  store.dispatch("loginModules/LoadLocalLogin")
  store.dispatch("getEntireData")
}

export default store
