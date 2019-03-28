import {GetterTree, MutationTree, ActionTree} from 'vuex'

interface UserState {
  token?: any,
  id: string
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
  LOGIN_ASYNC({commit, state: UserState}, data: UserState) {
    commit('LOGIN', data)
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