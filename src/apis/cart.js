import {
  request
} from './request'

export const getCartList = (params) => {
  return request({
    url: 'api/getCart',
    params
  })
} 

export const addCart = (data) => {
  return request({
    url: 'api/addCart',
    method: 'post',
    data
  })
} 

export const deleteCart = (data) => {
  return request({
    url: 'api/deleteCart',
    method: 'post',
    data
  })
} 