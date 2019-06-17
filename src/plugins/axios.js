import Vue from 'vue'
import axios from 'axios'

let urls = []
let CancelToken = axios.CancelToken

function removeUrls(config, cancel) {
  let url = config.url + '&' + config.method
  if (urls.indexOf(url) !== -1) {
    if (cancel) {
      cancel('remove request').catch(error => {
        console.log(error)
      })
    } else {
      urls.splice(urls.indexOf(url), 1)
    }
  } else {
    if (cancel) {
      urls.push(url)
    }
  }
}

/**
 * axios 请求拦截器处理请求数据
 */
axios.interceptors.request.use(
  config => {
    config.cancelToken = new CancelToken(cancel => {
      removeUrls(config, cancel)
    })
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * axios 响应拦截器处理响应数据
 */
axios.interceptors.response.use(
  response => {
    removeUrls(response.config)
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

Vue.prototype.$axios = axios
