import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { handleAxiosError } from './helpers'

export const AXIOS_INSTANCE = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
})

AXIOS_INSTANCE.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    return Promise.reject(handleAxiosError(error))
  }
)

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = Axios.CancelToken.source()
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token
  }).then(({ data }) => data)

  return promise
}

export type ErrorType<Error> = AxiosError<Error>
export type GlobalAxiosError = AxiosError<{ message: string }>
