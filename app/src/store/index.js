import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    auth: {},
    dashboards: [
      {
        _id: "main",
        name: "Principal",
        page: "main",
        active: true,
      },
      {
        _id: "city",
        name: "Cidades",
        page: "main",
        active: false,
      },
      {
        _id: "state",
        name: "Estados",
        page: "main",
        active: false,
      },
    ],
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
      return state.dashboards.filter((ds) => ds.active).pop()._id;
    },
    getCity: (state) => {
      return state.cities.filter((ct) => ct.active).pop();
    },
    getState: (state) => {
      return state.states.filter((ct) => ct.active).pop();
    },
    getDashboards: (state) => {
      return state.dashboards;
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
      state.dashboards = state.dashboards.map((ds) => {
        if (ds._id == dashboard._id) {
          ds.active = true;
        } else {
          ds.active = false;
        }

        return ds;
      });
    },
    setCity(state, city) {
      state.cities = state.cities.map((ct) => {
        if (ct._id == city._id) {
          ct.active = true;
        } else {
          ct.active = false;
        }

        return ct;
      });
    },
    setState(state, st) {
      state.states = state.states.map((s) => {
        if (s._id == st._id) {
          s.active = true;
        } else {
          s.active = false;
        }

        return s;
      });
    },
    addState(state, st) {
      state.store.push(st).sort((st1, st2) => st1.name < st2.name);
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
