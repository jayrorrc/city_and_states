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
  }
}
