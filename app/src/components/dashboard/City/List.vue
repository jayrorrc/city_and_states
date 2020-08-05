<template>
  <div class="tile is-parent">
    <article class="tile is-child notification is-warning is-3">
      <Menu :title="title" :list="$store.getters.getCities" />
    </article>
    <article class="tile is-child notification is-success">
      <div class="content">
        <p class="title">Register da Cidade</p>
        <div class="content">
          <!-- Content -->
        </div>
      </div>
    </article>
  </div>
</template>
<script>
import Menu from "../Menu";
import CityController from "./../../../controllers/city";

export default {
  name: "List",
  data: () => {
    return {
      title: "Cidades",
    };
  },
  components: {
    Menu,
  },
  created() {
    let token = this.$store.getters.getToken;

    CityController.getCities(token).then((res) => {
      this.$store.commit("setCities", res);
    });
  },
};
</script>
<style scoped>
</style>
