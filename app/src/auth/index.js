import axios from "axios"

const apiConfig = require('./../../auth_config.json');

export default {
    async login(username, password) {
        return axios.post(apiConfig.api_url + apiConfig.api_sufix + '/user/login', {
            username,
            password
        });
    },
    async signup(username, password) {
        return axios.post(apiConfig.api_url + apiConfig.api_sufix + '/user/signup', {
            username,
            password
        });
    }
}
