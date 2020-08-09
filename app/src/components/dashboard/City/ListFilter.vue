<template>
  <div class="content list-filter">
    <div class="app-row">
      <div class="app-column">
        <label for="cityName">Nome:</label>
        <input type="text" v-model="cityName" cityName="cityName" />
      </div>
    </div>
  </div>
</template>
<script>
import CityController from "./../../../controllers/city";

export default {
  name: "ListFilter",
  data: () => {
    return {
      cityName: "",
    };
  },
  watch: {
    cityName: function () {
      this.updateList();
    },
  },
  methods: {
    updateList() {
      let query = "";

      if (this.cityName) {
        query += "name=" + this.cityName;
      }

      let token = this.$store.getters.getToken;

      CityController.getCities(token, query).then((res) => {
        this.$store.commit("setCities", res);
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

.list-filter .app-row .app-column {
  margin: auto;
}
</style>
