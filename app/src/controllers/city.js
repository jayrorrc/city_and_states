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
  }
}
