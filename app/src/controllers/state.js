import axios from "axios"

const apiConfig = require('./../../auth_config.json');
const url = apiConfig.api_url + apiConfig.api_sufix;
const securityHeader = apiConfig.security_header

export default {
  async getCitiesGropByState(token, query) {
    let headers = {};
    headers['headers'] = {};
    headers.headers[securityHeader] = token;

    let fullUrl = url + "/state/grouped";

    if (query) {
      fullUrl = fullUrl + '?' + query;
    }

    let res = await axios.get(fullUrl, headers);
    return res.data;
  },

  async getStates(token, query) {
    let headers = {};
    headers['headers'] = {};
    headers.headers[securityHeader] = token;

    let fullUrl = url + "/state";

    if (query) {
      fullUrl = fullUrl + '?' + query;
    }

    let res = await axios.get(fullUrl, headers);

    if (!res.data.state) {
      return [];
    }

    return res.data.state.map((state) => {
      state.page = "state";
      state.active = false;

      return state;
    });
  },

  async post(token, name, abbreviation, _id) {
    let headers = {};
    headers['headers'] = {};
    headers.headers[securityHeader] = token;

    let res = await axios.post(url + "/state", {
      id: _id ? _id : null,
      name,
      abbreviation
    }, headers);

    if (!res.data.state) {
      return null;
    }

    let state = res.data.state;
    state.page = "state";
    state.active = false;

    return state;
  },

  async delete(token, id) {
    let headers = {};
    headers['headers'] = {};
    headers.headers[securityHeader] = token;

    let res = await axios.delete(url + "/state", {
      headers, data: { id }
    });

    let city = null;
    if (res.data.city) {
      city = res.data.city;
    }

    let state = null;
    if (res.data.state) {
      state = res.data.state;
    }

    return { state, city };
  }
}
