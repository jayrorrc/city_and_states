<template>
  <div class="menu-item column is-full" v-bind:class="{active: item.active}">
    <div class="columns">
      <div class="column">
        <span class="subtitle" @click="set(item)">{{item.name}}</span>
      </div>
      <div class="column is-one-fifth">
        <button v-if="item.page != 'main'" @click="delItem(item)">-</button>
      </div>
    </div>
  </div>
</template>
<script>
import StateController from "./../../controllers/state";
import CityController from "./../../controllers/city";

export default {
  name: "MenuItem",
  props: ["item"],
  methods: {
    set(item) {
      const setPage = {
        main: () => this.$store.commit("setDashboard", item),
        state: () => this.$store.commit("setState", item),
        city: () => this.$store.commit("setCity", item),
      };

      setPage[item.page]();
    },
    async delItem(item) {
      let token = this.$store.getters.getToken;
      const store = this.$store;

      const del = {
        state: () => {
          StateController.delete(token, item._id)
            .then(function (response) {
              store.commit("removeState", item);
              store.commit("unSelectAllState");
              store.commit("unSelectAllCities");

              return response;
            })
            .catch(function (error) {
              console.error(error);

              return null;
            });
        },
        city: () => {
          CityController.delete(token, item._id)
            .then(function (response) {
              store.commit("removeCity", item);
              store.commit("unSelectAllCities");

              return response;
            })
            .catch(function (error) {
              console.error(error);

              return null;
            });
        },
      };

      del[item.page]();
    },
  },
};
</script>
<style scoped>
.menu-item {
  cursor: pointer;
  border: 1px;
  border-color: gray;
}
.active {
  background: red;
}
</style>
