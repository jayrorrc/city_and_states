<template>
  <div class="menu-item column is-full" v-bind:class="{active: item.active}">
    <span class="subtitle" @click="set(item)">{{item.name}}</span>
  </div>
</template>
<script>
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
