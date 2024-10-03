import { AxiosError } from 'axios'

export interface AxiosErrorResponse {
  message: string
  response?: {
    data?: {
      message: string
    }
  }
}
export const handleAxiosError = (error: AxiosError) => {
  const axiosError = error as AxiosError<AxiosErrorResponse>

  throw new Error(axiosError.response?.data?.message || 'Unknown error')
}
