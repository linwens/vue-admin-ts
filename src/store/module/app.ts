import Cookies from 'js-cookie';
import {GetterTree, MutationTree, ActionTree} from 'vuex'

export interface appState {
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
  };
}

const state: appState = {
  sidebar:{
    opened: Cookies.get('sidebarStatus') !== 'closed',
    withoutAnimation: false,
  }
}

const getters: GetterTree<appState, any> = {
  /* doState: state => {
    return state
  } */
}

const mutations: MutationTree<any> = {
  TOGGLE_SIDEBAR(withoutAnimation: boolean) {
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 'closed');
    } else {
      Cookies.set('sidebarStatus', 'opened');
    }
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = withoutAnimation;
  },
  CLOSE_SIDEBAR(withoutAnimation: boolean) {
    Cookies.set('sidebarStatus', 'closed');
    state.sidebar.opened = false;
    state.sidebar.withoutAnimation = withoutAnimation;
  }
}

const actions: ActionTree<appState, any> = {
  TOGGLE_SIDEBAR_SYNC({commit}, withoutAnimation: boolean){
    commit('TOGGLE_SIDEBAR',withoutAnimation)
  },
  CLOSE_SIDEBAR_SYNC({commit}, withoutAnimation: boolean){
    commit('CLOSE_SIDEBAR',withoutAnimation)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}