import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import "normalize.css"
import "./assets/css/index.less"
import { setupStore } from "@/store/index"
import globalRegister from "@/global/index"

import xtRequest from "./service/index"
// 如果您正在使用CDN引入，请删除下面一行。
import * as ElementPlusIconsVue from "@element-plus/icons-vue"
import zhCn from "element-plus/es/locale/lang/zh-cn"

const app = createApp(App)
app.use(store)
// 刷新页面重新加载vuex数据
setupStore()
app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})
// 注册全局方法
app.use(globalRegister)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount("#app")
