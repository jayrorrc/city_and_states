<template>
  <div class="column is-full">
    <li>{{city.name}}</li>
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

li {
  width: 300px;
  margin: auto;
  text-align: justify;
}
</style>
