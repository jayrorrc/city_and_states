import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    auth: {},
  },
  getters: {
    getAuth: (state) => {
      return state.auth;
    },
    isAuthorized: (state) => {
      return !!Object.keys(state.auth).length;
    },
    getToken: (state) => {
      return state.auth.token
    }
  },
  mutations: {
    setAuth(state, auth) {
      state.auth = auth;
    },
  }
})
