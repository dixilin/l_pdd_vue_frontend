import {
  request
} from './request'

export const checkUserNameExist = (userName) => {
  return request({
    url: 'api/register/checkUserNameExist/' + userName
  }, true)
}

export const checkPhoneExist = (phone) => {
  return request({
    url: 'api/register/checkPhoneExist/' + phone
  }, true)
}

export const toGetVerify = (phone) => {
  return request({
    url: 'api/register/getVerifyCode/' + phone
  }, true)
}

export const register = (data) => {
  return request({
    url: 'api/register/register',
    method: 'post',
    data
  },true)
}