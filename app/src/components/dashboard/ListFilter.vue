<template>
  <div class="content">
    <div>
      <label for="cityName">Cidade</label>
      <input type="text" v-model="cityName" cityName="cityName" class="form-control" />
    </div>
    <div>
      <label for="stateName">Estado</label>
      <input type="text" v-model="stateName" stateName="stateName" class="form-control" />
    </div>
  </div>
</template>
<script>
import StateController from "./../../controllers/state";

export default {
  name: "ListFilter",
  data: () => {
    return {
      cityName: "",
      stateName: "",
    };
  },
  watch: {
    cityName: function (value) {
      this.updateList(value, this.stateName);
    },
    stateName: function (value) {
      this.updateList(this.cityName, value);
    },
  },
  methods: {
    updateList(city, state) {
      let query = "";

      if (state) {
        query = "state=" + value;
      }

      if (city) {
        query += "&city=" + this.cityName;
      }

      let token = this.$store.getters.getToken;

      StateController.getCitiesGropByState(token, query).then((res) => {
        this.$store.commit("setCitiesAndStates", res.state);
      });
    },
  },
};
</script>
<style scoped>
</style>
