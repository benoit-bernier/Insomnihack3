import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toolbarState: 'Maps',
    propsWellId: localStorage.getItem('propsWellIdId') || -1,
  },
  mutations: {
    changeToolbarState(state, data) {
      state.toolbarState = data
    },
    changePropsWellId(state, data) {
      state.propsWellId = data
    }
  },
  actions: {
    changePropsWellId({commit}, data) {
      commit('changePropsWellId', data)
    },
    changeToolbarState({commit}, data) {
      commit("changeToolbarState", data)
    }
  },
  getters: {
    toolbarState: state => state.toolbarState,
    propsWellId: state => state.propsWellId
  }
})