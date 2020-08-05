<template>
  <div class="tile is-parent">
    <article class="tile is-child notification is-warning is-3">
      <Menu :title="title" :list="$store.getters.getStates" />
    </article>
    <article class="tile is-child notification is-success">
      <div class="content">
        <p class="title">Register do Estado</p>
        <div class="content">
          <!-- Content -->
        </div>
      </div>
    </article>
  </div>
</template>
<script>
import Menu from "../Menu";
import StateController from "./../../../controllers/state";

export default {
  name: "List",
  data: () => {
    return {
      title: "Estados",
    };
  },
  components: {
    Menu,
  },
  created() {
    let token = this.$store.getters.getToken;

    StateController.getStates(token).then((res) => {
      this.$store.commit("setStates", res);
    });
  },
};
</script>
<style scoped>
</style>
