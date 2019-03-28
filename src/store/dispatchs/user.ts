import store from '@/store'
import {loginData} from '@/store/module/user'

export const dispatchLogin = (data: loginData) => {
  return store.dispatch('LOGIN_ASYNC', data);
}

export const dispatchLogout = () => {
  return store.dispatch('LOGOUT_ASYNC');
}