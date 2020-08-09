<template>
  <div class="tile is-parent">
    <article class="tile is-child notification is-success">
      <div class="content">
        <ListFilter v-if="$store.getters.getCitiesAndStates.length" />
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
import StateController from "./../../controllers/state";
import ListRow from "./ListRow";
import ListFilter from "./ListFilter";

export default {
  name: "List",
  components: {
    Menu,
    ListRow,
    ListFilter,
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
