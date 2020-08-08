<template>
  <div class="tile is-parent">
    <article class="tile is-child notification is-warning is-4">
      <Menu :title="title" :page="page" />
    </article>
    <article class="tile is-child notification is-success">
      <div class="content">
        <div class="content">
          <StateRegister />
        </div>
      </div>
    </article>
  </div>
</template>
<script>
import Menu from "../Menu";
import StateController from "./../../../controllers/state";
import StateRegister from "../../../views/State/Register";

export default {
  name: "List",
  data: () => {
    return {
      title: "Estados",
      page: "state",
    };
  },
  components: {
    Menu,
    StateRegister,
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
