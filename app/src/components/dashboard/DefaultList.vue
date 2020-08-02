<template>
  <div class="tile is-parent">
    <article class="tile is-child notification is-success">
      <div class="content">
        <p class="title">Lista Padrão</p>
        <div class="content">
          <div v-for="state in $store.getters.getCitiesAndStates" :key="state.id" class="columns">
            <ListRow :state="state" />
          </div>
        </div>
      </div>
    </article>
  </div>
</template>
<script>
import Menu from "./Menu";
import CityController from "./../../controllers/city";
import ListRow from "./ListRow";

export default {
  name: "List",
  components: {
    Menu,
    ListRow,
  },
  created() {
    let token = this.$store.getters.getToken;

    CityController.getCitiesGropByState(token).then((res) => {
      this.$store.commit("setCitiesAndStates", res.city);
    });
  },
};
</script>
<style scoped>
</style>
