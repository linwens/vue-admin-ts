import {GetterTree, MutationTree, ActionTree} from 'vuex'
import { doLogin } from '@/api/login'

interface UserState {
  token?: any,
  id: string
}

export interface loginData {
  username: any,
  password: any,
}
const state: UserState = {
  id: ''
}
// <UserState, any> 就是交叉类型的写法
const getters: GetterTree<UserState, any> = {
  /* doState: state => {
    return state
  } */
}

const mutations: MutationTree<UserState> = {
  LOGIN(state: UserState, data: UserState) {
    for(let key in data){
      (<any>state)[key] = (<any>data)[key]
    }
  },
  LOGOUT(state: UserState) {
    state.id = '';
    state.token = null;
  }
}

const actions: ActionTree<UserState, any> = {
  async LOGIN_ASYNC({commit, state: UserState}, data: loginData) {
    const {userData} = await doLogin({
      username: data.username,
      password: data.password,
    })
    commit('LOGIN', userData)
  },
  LOGOUT_ASYNC({commit, state: UserState}) {
    commit('LOGOUT')
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}