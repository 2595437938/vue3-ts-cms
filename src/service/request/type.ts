import type { AxiosRequestConfig, AxiosResponse } from "axios"

// 继承axios原本类,并扩展interceptors 传入不同的拦截器,设置可选,可以不传拦截器(爱传不传都可以)
export interface XTRequestInterceptors<T = AxiosResponse> {
  requestIntceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestIntceptorsCatch?: (error: any) => any
  responseIntceptors?: (response: T) => T
  responseIntceptorsCatch?: (error: any) => any
}

export interface XTRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: XTRequestInterceptors<T>
}
