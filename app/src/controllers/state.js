import axios from "axios"

export default {
  async getStates(token) {
    let res = await axios.get("http://localhost:8081/api/state", {
      headers: {
        'x-access-token': token
      }
    });

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
    let res = await axios.post("http://localhost:8081/api/state", {
      id: _id ? _id : null,
      name,
      abbreviation
    }, {
      headers: {
        'x-access-token': token
      }
    });

    if (!res.data.state) {
      return null;
    }

    let state = res.data.state;
    state.page = "state";
    state.active = false;

    return state;
  },

  async delete(token, id) {
    let res = await axios.delete("http://localhost:8081/api/state", {
      headers: {
        'x-access-token': token
      }, data: { id }
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
