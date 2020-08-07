<template>
  <div class="content">
    <p class="title">
      {{title}}
      <button v-bind:class="{hidden: !page}" v-on:click="newItem">+</button>
    </p>
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
  props: ["title", "list", "page"],
  components: {
    MenuItem,
  },
  methods: {
    newItem: function (event) {
      if (this.page == "state") {
        this.$store.commit("unSelectAllState");
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
