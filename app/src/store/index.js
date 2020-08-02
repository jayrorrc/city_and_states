import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    auth: {},
    dashboard: '',
    cities: [],
    states: []
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
    },
    getDashboard: (state) => {
      return state.dashboard;
    },
    getCities: (state) => {
      return state.cities;
    },
    getStates: (state) => {
      return state.states;
    }
  },
  mutations: {
    setAuth(state, auth) {
      state.auth = auth;
    },
    setDashboard(state, dashboard) {
      state.dashboard = dashboard;
    },
    setCities(state, cities) {
      state.cities = cities;
    },
    setStates(state, states) {
      state.states = states;
    }
  }
})
