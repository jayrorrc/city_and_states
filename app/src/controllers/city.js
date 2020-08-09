import axios from "axios"

const apiConfig = require('./../../auth_config.json');
const url = apiConfig.api_url + apiConfig.api_sufix;

export default {
  async getCitiesGropByState(token) {
    let res = await axios.get(url + "/city/grouped", {
      headers: {
        'x-access-token': token
      }
    });
    return res.data;
  },

  async getCities(token, query) {
    let fullUrl = url + "/city";

    if (query) {
      fullUrl = fullUrl + '?' + query;
    }

    let res = await axios.get(fullUrl, {
      headers: {
        'x-access-token': token
      }
    });

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
    let res = await axios.post(url + "/city", {
      id: _id ? _id : null,
      name,
      stateId
    }, {
      headers: {
        'x-access-token': token
      }
    });

    if (!res.data.city) {
      return null;
    }

    let city = res.data.city;
    city.page = "city";
    city.active = false;

    return city;
  },

  async delete(token, id) {
    let res = await axios.delete(url + "/city", {
      headers: {
        'x-access-token': token
      }, data: { id }
    });

    let city = null;
    if (!res.data.city) {
      city = res.data.city;
    }

    return city;
  }
}
