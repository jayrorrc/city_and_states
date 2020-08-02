import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    auth: {},
    dashboard: '',
    cities: [],
    citiesAndStates: [],
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
    getCitiesAndStates: (state) => {
      return state.citiesAndStates;
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
    setCitiesAndStates(state, citiesAndStates) {
      state.citiesAndStates = citiesAndStates;
    },
    setStates(state, states) {
      state.states = states;
    }
  }
})
