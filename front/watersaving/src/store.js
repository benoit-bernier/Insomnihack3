import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/services/Api'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    toolbarState: 'Maps',
    token:localStorage.getItem('jwtToken') || '',
    propsWellId: localStorage.getItem('propsWellIdId') || -1,
  },
  mutations: {
    changeToolbarState(state, data) {
      state.toolbarState = data
    },
    changePropsWellId(state, data) {
      state.propsWellId = data
    },
    auth_request (state) {
      state.status = 'loading'
    },
    auth_success (state,data) {
      state.status = 'success'
      state.token = data[0]
    },
    auth_error (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = ''
    }
  },
  actions: {
    changePropsWellId({commit}, data) {
      commit('changePropsWellId', data)
    },
    changeToolbarState({commit}, data) {
      commit("changeToolbarState", data)
    },
    login (context, user) {
      return new Promise((resolve, reject) => {
        context.commit('auth_request')
        if(user.username.includes("@")){
          user.mail = user.username
          user.username = ""
        }
        Api.post('/api/login', user)
          .then(res => {
            if(res.data.success){
              const token = res.data.token
              localStorage.setItem('jwtToken', token)
              axios.defaults.headers.common['Authorization'] = token
              context.commit('auth_success', [token])
            }
            resolve(res)
          })
          .catch(err => {
            context.commit('auth_error')
            localStorage.removeItem('jwtToken')
            reject(err)
          })
      })
    },
    logout (context) {
      return new Promise((resolve, reject) => {
        context.commit('logout')
        localStorage.removeItem('jwtToken')
        delete axios.defaults.headers.common['Authorization']
        resolve()
      })
    }
  },
  getters: {
    toolbarState: state => state.toolbarState,
    propsWellId: state => state.propsWellId,
    isAuth: state =>!!state.token,
    AccessToken : state => state.token,
    authStatus: state => state.status
  }
})