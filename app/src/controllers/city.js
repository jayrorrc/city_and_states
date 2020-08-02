import axios from "axios"

export default {
  async getCitiesGropByState(token) {
    let res = await axios.get("http://localhost:8081/api/city/grouped", {
      headers: {
        'x-access-token': token
      }
    });
    return res.data;
  }
}
