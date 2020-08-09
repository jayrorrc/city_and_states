<template>
  <div class="column is-full">
    <details>
      <summary>{{state.name}}</summary>
      <div v-for="city in state.cities" :key="city.id" class="columns">
        <ListRowDetail :city="city" />
      </div>
    </details>
  </div>
</template>
<script>
import ListRowDetail from "./ListRowDetail";

export default {
  name: "ListRow",
  props: ["state"],
  components: {
    ListRowDetail,
  },
};
</script>
<style scoped>
.menu-item {
  cursor: pointer;
  border: 1px;
  border-color: gray;
}
summary {
  width: 400px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
  text-align: justify;
}
</style>
