<template>
  <div class="tile is-ancestor">
    <MainMenu />

    <div class="tile" v-if="$store.getters.getDashboard === 'state'">
      <StateDashboard />
    </div>
    <div class="tile" v-else-if="$store.getters.getDashboard === 'city'">
      <CityDashboard />
    </div>
    <div class="tile" v-else>
      <DefaultList />
    </div>
  </div>
</template>
<script>
import MainMenu from "./../components/dashboard/MainMenu";
import DefaultList from "./../components/dashboard/DefaultList";
import CityDashboard from "./../components/dashboard/City/List";
import StateDashboard from "./../components/dashboard/State/List";

export default {
  name: "Dashboard",
  components: { MainMenu, DefaultList, CityDashboard, StateDashboard },
};
</script>
<style scoped>
.is-ancestor {
  margin: 5px;
}
</style>
