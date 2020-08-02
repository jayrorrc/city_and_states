<template>
  <div class="tile is-vertical is-2">
    <div class="tile">
      <div class="tile is-parent is-vertical">
        <article class="tile is-child notification is-primary">
          <Menu :title="title" :list="dashboards" />
        </article>
      </div>
    </div>
  </div>
</template>
<script>
import Menu from "./Menu";

export default {
  name: "MainMenu",
  data: () => {
    return {
      title: "Menu",
      dashboards: [
        {
          id: "main",
          name: "Principal",
          page: "main",
        },
        {
          id: "city",
          name: "Cidades",
          page: "main",
        },
        {
          id: "state",
          name: "Estados",
          page: "main",
        },
      ],
    };
  },
  components: {
    Menu,
  },
};
</script>
<style scoped>
</style>
