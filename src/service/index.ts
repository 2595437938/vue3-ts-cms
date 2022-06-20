import XTRequest from "./request"
import { BASE_URL, TIME_OUT } from "./request/config"
import LocalCache from "@/utils/cache"

const xtRequest = new XTRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestIntceptors: (config) => {
      const token = LocalCache.getCache("token")
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestIntceptorsCatch: (error) => {
      return Promise.reject(error)
    },
    responseIntceptors: (response) => {
      return response
    },
    responseIntceptorsCatch: (error) => {
      return Promise.reject(error)
    }
  }
})

export default xtRequest
