import {
  request
} from './request'

export const getCategoryList = () => {
  return request({
    url: 'api/categoryList'
  })
}