import {
  request
} from './request'

export const getRecommendList = (data) => {
  return request({
    url: '/api/recommendList',
    params:data
  })
}
