import axios from "axios"

export default {
  async getCitiesGropByState(token) {
    let res = await axios.get("http://localhost:8081/api/city/grouped", {
      headers: {
        'x-access-token': token
      }
    });
    return res.data;
  },

  async getCities(token) {
    let res = await axios.get("http://localhost:8081/api/city", {
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
    let res = await axios.post("http://localhost:8081/api/city", {
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
    let res = await axios.delete("http://localhost:8081/api/city", {
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
