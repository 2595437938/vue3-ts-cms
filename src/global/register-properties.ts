import { App } from "vue"
import { formatUtcTime } from "@/utils/date-format"

export default function registerProperties(app: App) {
  app.config.globalProperties.$filters = {
    // 格式化时间全局
    formatTime(value: string) {
      return formatUtcTime(value)
    }
  }
}
