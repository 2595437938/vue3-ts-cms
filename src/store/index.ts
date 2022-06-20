import { createStore } from "vuex"
import loginModules from "./modules/login"

const store = createStore<any>({
  state: () => {
    return {
      name: "sxt"
    }
  },
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    loginModules
  }
})

export function setupStore() {
  store.dispatch("loginModules/LoadLocalLogin")
}

export default store
