import request from '@/plugin/axios'

export function AccountLogin (data) {
  return request({
    url: '/site/login',
    method: 'post',
    data: JSON.stringify(data)
  })
}
