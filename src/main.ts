import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import "normalize.css"
import "./assets/css/index.less"
import { setupStore } from "@/store/index"

import xtRequest from "./service/index"
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from "@element-plus/icons-vue"

const app = createApp(App)
app.use(router)
app.use(store)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
// 刷新页面重新加载vuex数据
setupStore()
app.mount("#app")
