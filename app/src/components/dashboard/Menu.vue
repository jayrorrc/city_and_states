<template>
  <div class="content">
    <p class="title">{{title}}</p>
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
  props: ["title", "list"],
  components: {
    MenuItem,
  },
};
</script>
<style scoped>
</style>
