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
import StateController from "./../../controllers/state";
import ListRow from "./ListRow";

export default {
  name: "List",
  components: {
    Menu,
    ListRow,
  },
  created() {
    let token = this.$store.getters.getToken;

    StateController.getCitiesGropByState(token).then((res) => {
      this.$store.commit("setCitiesAndStates", res.state);
    });
  },
};
</script>
<style scoped>
</style>
