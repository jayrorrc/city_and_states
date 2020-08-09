<template>
  <div class="tile is-parent">
    <article class="tile is-child notification is-warning is-4">
      <Menu :title="title" :page="page" />
    </article>
    <article class="tile is-child notification is-success">
      <div class="content">
        <div class="content">
          <CityRegister />
        </div>
      </div>
    </article>
  </div>
</template>
<script>
import Menu from "../Menu";
import CityController from "./../../../controllers/city";
import CityRegister from "../../../views/City/Register";

export default {
  name: "List",
  data: () => {
    return {
      title: "Cidades",
      page: "city",
    };
  },
  components: {
    Menu,
    CityRegister,
  },
  created() {
    let token = this.$store.getters.getToken;

    this.$store.commit("unSelectAllState");
    CityController.getCities(token).then((res) => {
      this.$store.commit("setCities", res);
    });
  },
};
</script>
<style scoped>
</style>
