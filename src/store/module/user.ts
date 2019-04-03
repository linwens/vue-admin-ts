import {GetterTree, MutationTree, ActionTree} from 'vuex'
import { doLogin } from '@/api/login'

interface UserState {
  token?: any,
  uid: string
}

export interface loginData {
  username: any,
  password: any,
}
const state: UserState = {
  uid: '111111',
  token: null,
}
// <UserState, any> 就是交叉类型的写法
const getters: GetterTree<UserState, any> = {
  /* doState: state => {
    return state
  } */
}

const mutations: MutationTree<UserState> = {
  LOGIN(state: UserState, data: UserState) {
    console.log(state)
    console.log(data)
    for(let key in data){
      (<any>state)[key] = (<any>data)[key]
    }
  },
  LOGOUT(state: UserState) {
    state.uid = '';
    state.token = null;
  }
}

const actions: ActionTree<UserState, any> = {
  async LOGIN_ASYNC({commit, state: UserState}, data: loginData) {
    const userData = await doLogin({
      username: data.username,
      password: data.password,
    })
    // 登录成功后往state里塞值
    commit('LOGIN', userData.rslt)
  },
  LOGOUT_ASYNC({commit, state: UserState}) {
    commit('LOGOUT')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}