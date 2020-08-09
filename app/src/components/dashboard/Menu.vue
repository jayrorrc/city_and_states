<template>
  <div class="content">
    <div class="columns">
      <div class="column">
        <span class="title">{{title}}</span>
      </div>
      <div class="column is-one-fifth" v-if="page">
        <button v-if="page" v-on:click="newItem">+</button>
      </div>
    </div>
    <div class="content">
      <div v-for="item in list" :key="item.id" class="columns">
        <MenuItem :item="item" />
      </div>
    </div>

    <div v-if="child">
      <transition v-if="$store.getters.showModal" name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <CityRegister :child="true" />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import MenuItem from "./MenuItem";
import CityRegister from "./../../views/City/Register";

export default {
  name: "Menu",
  props: ["title", "page", "child"],
  components: {
    MenuItem,
    CityRegister,
  },
  computed: {
    list: function () {
      if (this.page == "state") {
        return this.$store.getters.getStates;
      }
      if (this.page == "city") {
        return this.$store.getters.getCities;
      }

      return this.$store.getters.getDashboards;
    },
  },
  methods: {
    newItem: function (event) {
      if (this.page == "state") {
        this.$store.commit("setCities", []);
        this.$store.commit("unSelectAllState");
      } else if (this.page == "city") {
        this.$store.commit("unSelectAllCities");

        if (this.child) {
          this.$store.commit("setModal", true);
        }
      }
    },
  },
};
</script>
<style scoped>
.hidden {
  visibility: hidden;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-container {
  color: black;
}
</style>
