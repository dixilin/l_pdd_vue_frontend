import {
  request
} from './request'

export const uploadAvatar = (data,phone) => {
  return request({
    url: 'api/uploadAvatar?phone=' + phone,
    method: 'post',
    data,
    header: {
      'content-type': 'multipart/form-data'
    }
  })
}

export const updateBaseInfo = (data) => {
  return request({
    url: 'api/updateBaseInfo',
    method: 'post',
    data
  })
}