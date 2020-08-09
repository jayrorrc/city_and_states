<template>
  <div class="content list-filter">
    <div class="app-row">
      <div class="app-column">
        <label for="stateName">Nome:</label>
        <input type="text" v-model="stateName" stateName="stateName" />
      </div>
    </div>
  </div>
</template>
<script>
import StateController from "./../../../controllers/state";

export default {
  name: "ListFilter",
  data: () => {
    return {
      stateName: "",
    };
  },
  watch: {
    stateName: function () {
      this.updateList();
    },
  },
  methods: {
    updateList() {
      let query = "";

      if (this.stateName) {
        query += "name=" + this.stateName;
      }

      let token = this.$store.getters.getToken;

      StateController.getStates(token, query).then((res) => {
        this.$store.commit("setStates", res);
      });
    },
  },
};
</script>
<style scoped>
.app-row {
  display: inline-flex;
  width: 100%;
}
.app-row .app-column {
  margin: 5px;
}

.app-row .app-column.left {
  margin-left: auto;
}

.app-row .app-column.right {
  margin-right: auto;
}

.list-filter .app-row .app-column {
  margin: auto;
}
</style>
