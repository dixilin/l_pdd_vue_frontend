import {
  request
} from './request'

export const getHomeHotCasual = () => {
  return request({
    url: 'api/homecasual'
  })
}

export const getHomeHotNav = () => {
  return request({
    url: 'api/homenav'
  })
}

export const getHomeShopList = () => {
  return request({
    url: 'api/homeshoplist'
  })
}


