<template>
  <div class="content">
    <div class="columns">
      <div class="column">
        <span class="title">{{title}}</span>
      </div>
      <div class="column is-one-fifth" v-if="page">
        <button v-if="page" v-on:click="newItem">+</button>
      </div>
    </div>
    <div class="content">
      <div v-for="item in list" :key="item.id" class="columns">
        <MenuItem :item="item" />
      </div>
    </div>
  </div>
</template>
<script>
import MenuItem from "./MenuItem";

export default {
  name: "Menu",
  props: ["title", "page"],
  components: {
    MenuItem,
  },
  computed: {
    list: {
      get() {
        if (this.page == "state") {
          return this.$store.getters.getStates;
        }
        if (this.page == "city") {
          return this.$store.getters.getCities;
        }

        return this.$store.getters.getDashboards;
      },
      set() {},
    },
  },
  methods: {
    newItem: function (event) {
      if (this.page == "state") {
        this.$store.commit("unSelectAllState");
      } else if (this.page == "city") {
        this.$store.commit("unSelectAllCities");
      }
    },
  },
};
</script>
<style scoped>
.hidden {
  visibility: hidden;
}
</style>
