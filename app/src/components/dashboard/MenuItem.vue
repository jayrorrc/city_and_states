<template>
  <div class="menu-item column is-full">
    <span class="subtitle" @click="set(item)">{{item.name}}</span>
  </div>
</template>
<script>
export default {
  name: "MenuItem",
  props: ["item"],
  methods: {
    set(item) {
      if (item.page == "main") {
        this.$store.commit("setDashboard", item.id);
      }
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
</style>
