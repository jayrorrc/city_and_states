<template>
  <div class="column is-full">
    <span>{{city.name}}</span>
  </div>
</template>
<script>
export default {
  name: "ListRow",
  props: ["city"],
};
</script>
<style scoped>
.menu-item {
  cursor: pointer;
  border: 1px;
  border-color: gray;
}
</style>
