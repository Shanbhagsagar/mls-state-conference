import * as types from '../types'
import router from '../../router'
import MQL from '@/plugins/mql.js'
export const state = {
  token: sessionStorage.getItem('user-token') || '',
  status: ''
}

export const getters = {
  isAuthenticated: state => !!state.token,
  authStatus: state => state.status
}

export const mutations = {
  [types.MUTATE_AUTH_REQUEST]: state => {
    state.status = 'loading'
  },

  [types.MUTATE_AUTH_SUCCESS]: (state, token) => {
    state.status = 'success'
    state.token = token
  },

  [types.MUTATE_AUTH_ERROR]: state => {
    state.status = 'error'
  },
  'CLEAR_ROLE': (rootState) => {
    rootState.roles = []
  }
}

export const actions = {
  AUTH_REQUEST: ({ commit }, payload) => {
    return new Promise(resolve => {
      commit(types.MUTATE_AUTH_REQUEST, payload)
      sessionStorage.setItem('user-token', 'token')
      // axios.defaults.headers.common['Authorization'] = 'token'
      new MQL()
        .setLoginActivity()
        .setData(payload)
      // .showConfirmDialog(true)
        .fetch('loginBtn')
        .then(response => {
          response.hideElement('loginFormId')
          if (response.isValid('MQLLogin')) {
            let token = response.getHeaders().authorization
            sessionStorage.setItem('user-token', token)
            commit(types.MUTATE_AUTH_SUCCESS, response)
            resolve(response)
          } else {
            commit(types.MUTATE_AUTH_ERROR, response)
            sessionStorage.removeItem('user-token')
            resolve(response)
          }
        })
    })
  },

  AUTH_LOGOUT: ({ commit, rootState }) => {
    return new Promise(resolve => {
      // sessionStorage.removeItem('user-token')
      // sessionStorage.removeItem('vuex')
      rootState.roles = []
      commit('CLEAR_ROLE')
      sessionStorage.clear()

      // commit('SET_TOKEN', '')
      // commit('SET_USERDATA', {})
      // commit(types.CLEAR_SESSION, null)
      // remove the axios default header
      // delete axios.defaults.headers.common['Authorization']
      // router
      //   .push({
      //     name: 'Login'
      //   })
      //   .catch(e => {
      //     console.log('error', e)
      //   })
      resolve()
    })
  }
}

/* export default {
  state,
  getters,
  mutations,
  actions
} */
