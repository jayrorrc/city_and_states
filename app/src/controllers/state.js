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
  }
}
