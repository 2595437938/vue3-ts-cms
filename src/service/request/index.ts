import axios from "axios"
import { AxiosInstance } from "axios"
import { XTRequestInterceptors, XTRequestConfig } from "./type"
// 暂时找不到ElLoading的类型定义文件在哪先不添加loading
// import { ElLoading } from "element-plus"
// import { loadingInstance } from "element-plus/lib/el-loading/src/loading.type"

// 创建axios实例类,new会返回不同的axios实例,独立!!😅
class XTRequest {
  instance: AxiosInstance
  interceptors?: XTRequestInterceptors
  // loading?: loadingInstance

  constructor(config: XTRequestConfig) {
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    // 创建new实例才会有的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestIntceptors,
      this.interceptors?.requestIntceptorsCatch
    )

    this.instance.interceptors.response.use(
      this.interceptors?.responseIntceptors,
      this.interceptors?.responseIntceptorsCatch
    )

    // 全局任意创建new都有的全局拦截
    this.instance.interceptors.request.use(
      (config) => {
        // this.loading = ElLoading.service({
        //   lock: true,
        //   text: "加载中...",
        //   background: "rgba(0,0,0,0.5)"
        // })
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (config) => {
        // 将loading移除
        // this.loading?.close()
        return config.data
      },
      (err) => {
        // 将loading移除
        // this.loading?.close()
        return err
      }
    )
  }
  // 单独拦截某个请求与响应
  request<T>(config: XTRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestIntceptors) {
        config = config.interceptors.requestIntceptors(config)
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseIntceptors) {
            res = config.interceptors.responseIntceptors(res)
          }
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  // 封装独立的 get post pacth delete
  get<T>(config?: XTRequestConfig<T>): Promise<T> {
    return this.request<T>({
      method: "GET",
      ...config
    })
  }
  post<T>(config?: XTRequestConfig<T>): Promise<T> {
    return this.request<T>({
      method: "POST",
      ...config
    })
  }
  patch<T>(config?: XTRequestConfig<T>): Promise<T> {
    return this.request<T>({
      method: "PATCH",
      ...config
    })
  }
  delete<T>(config?: XTRequestConfig<T>): Promise<T> {
    return this.request<T>({
      method: "DELETE",
      ...config
    })
  }
}

export default XTRequest
