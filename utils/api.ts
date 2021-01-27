import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'

axios.options

const config: AxiosRequestConfig = {
  baseURL: process.env.NODE_APP_API_URL || '',
  timeout: Number(process.env.NODE_APP_TIMEOUT_LIMIT) || 15000,
  headers: {
    authorization: '',
    'content-type': 'application/json',
    'Accept-Language': 'zh-tw'
  }
}

const axiosInstance: AxiosInstance = axios.create({
  ...config
})

export default axiosInstance
