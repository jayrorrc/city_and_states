<template>
  <div class="content">
    <div class="form-group">
      <label for="cityName">Cidade</label>
      <input type="text" v-model="cityName" cityName="cityName" class="form-control" />
    </div>
    <div class="form-group">
      <label for="stateName">Estado</label>
      <input type="text" v-model="stateName" stateName="stateName" class="form-control" />
    </div>
  </div>
</template>
<script>
import StateController from "./../../controllers/state";

export default {
  name: "ListFilter",
  components: {},
  computed: {
    cityName: { get() {}, set() {} },
    stateName: { get() {}, set() {} },
  },
};
</script>
<style scoped>
</style>
