import Api from '@/utils/request'

export const doLogin = (data: any) => {
  return Api({
    method: 'POST',
    url: '/login',
    data: data
  })()
}