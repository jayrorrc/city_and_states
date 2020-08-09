<template>
  <div class="content">
    <div class="app-row">
      <div class="app-column left">
        <label for="cityName">Cidade:</label>
        <input type="text" v-model="cityName" cityName="cityName" />
      </div>
      <div class="app-column right">
        <label for="reverseCity">Reverter Ordem:</label>
        <input type="checkbox" v-model="reverseCity" true-value="1" false-value="-1" />
      </div>
    </div>
    <div class="app-row">
      <div class="app-column left">
        <label for="stateName">Estado:</label>
        <input type="text" v-model="stateName" stateName="stateName" />
      </div>
      <div class="app-column right">
        <label for="reverseState">Reverter Ordem:</label>
        <input type="checkbox" v-model="reverseState" true-value="-1" false-value="1" />
      </div>
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
      reverseCity: "-1",
      reverseState: "1",
    };
  },
  watch: {
    cityName: function (value) {
      this.updateList();
    },
    stateName: function (value) {
      this.updateList();
    },
    reverseCity: function (value) {
      this.updateList();
    },
    reverseState: function (value) {
      this.updateList();
    },
  },
  methods: {
    updateList() {
      let query = "";

      if (this.stateName) {
        query = "state=" + this.stateName;
      }

      if (query) {
        query += "&";
      }

      if (this.cityName) {
        query += "city=" + this.cityName;
      }

      if (query) {
        query += "&";
      }

      query += "cityOrder=" + this.reverseCity;
      query += "&stateOrder=" + this.reverseState;

      let token = this.$store.getters.getToken;

      StateController.getCitiesGropByState(token, query).then((res) => {
        this.$store.commit("setCitiesAndStates", res.state);
      });
    },
  },
};
</script>
<style scoped>
.app-row {
  display: inline-flex;
  width: 100%;
}
.app-row .app-column {
  margin: 5px;
}

.app-row .app-column.left {
  margin-left: auto;
}

.app-row .app-column.right {
  margin-right: auto;
}
</style>
