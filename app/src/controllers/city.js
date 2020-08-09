import axios from "axios"

const apiConfig = require('./../../auth_config.json');
const url = apiConfig.api_url + apiConfig.api_sufix;
const securityHeader = authConfig.security_header

export default {
  async getCitiesGropByState(token) {
    let headers = {}
    headers['headers'][securityHeader] = token;

    let res = await axios.get(url + "/city/grouped", headers);
    return res.data;
  },

  async getCities(token, query) {
    let headers = {}
    headers['headers'][securityHeader] = token;

    let fullUrl = url + "/city";

    if (query) {
      fullUrl = fullUrl + '?' + query;
    }

    let res = await axios.get(fullUrl, headers);

    if (!res.data.city) {
      return [];
    }

    return res.data.city.map((city) => {
      city.page = "city";
      city.active = false;

      return city;
    });
  },

  async post(token, name, stateId, _id) {
    let headers = {}
    headers['headers'][securityHeader] = token;

    let res = await axios.post(url + "/city", {
      id: _id ? _id : null,
      name,
      stateId
    }, headers);

    if (!res.data.city) {
      return null;
    }

    let city = res.data.city;
    city.page = "city";
    city.active = false;

    return city;
  },

  async delete(token, id) {
    let headers = {}
    headers['headers'][securityHeader] = token;

    let res = await axios.delete(url + "/city", {
      headers, data: { id }
    });

    let city = null;
    if (!res.data.city) {
      city = res.data.city;
    }

    return city;
  }
}
