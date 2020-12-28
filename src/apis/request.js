import axios from 'axios'
import store from '@/store'

let loadingCount = 0

const switchLoadingStatus = (flag) => {
  store.dispatch('isShowLoading', flag)
}

const needShowLoading = () => {
  if (loadingCount === 0) {
    switchLoadingStatus(true)
  }
  loadingCount++
}

const needHideLoading = () => {
  if (loadingCount < 0) return
  loadingCount--
  if (loadingCount === 0) {
    switchLoadingStatus(false)
  }
}

//hiddenShow 是否隐藏loading效果
export const request = (config, hiddenShow = false) => {
  if (!hiddenShow) {
    needShowLoading()
  }
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: '/',
      timeout: 8000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    instance.interceptors.request.use(req => {
      // if (req.url !== 'login') {
        req.headers.Authorization = 'Bearer ' + store.state.userInfo.token
      // }
      return req
    }, err => {
      return reject(err)
    })

    instance.interceptors.response.use((res) => {
      return res.data
    }, err => {
      //token过期或token不正确,反正不是没登陆就是没权限
      if (err.response.status === 401 && err.response.data.code === 401) {
        localStorage.removeItem('userInfo')
        location.href = '/#/login'
      }
      return reject(err)
    })

    instance(config).then(res => {
      resolve(res)
      if (!hiddenShow) {
        needHideLoading()
      }
    }).catch(err => {
      reject(err)
      if (!hiddenShow) {
        needHideLoading()
      }
    })
  })
}