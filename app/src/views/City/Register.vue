<template>
  <div>
    <div v-if="isEdit">
      <h2>Editar Cidade</h2>
    </div>
    <div v-else>
      <h2>Nova Cidade</h2>
    </div>

    <form @submit.prevent="handleSubmit" class="app-city">
      <div class="form-group">
        <div class="app-city-label name">
          <label for="name">Nome:</label>
        </div>
        <div class="app-city-input">
          <input
            type="text"
            v-model="name"
            name="name"
            class="form-control"
            :class="{ 'is-invalid': submitted && !name }"
          />
          <div v-show="submitted && !name" class="invalid-feedback">A cidade precisa de um nome</div>
        </div>
      </div>
      <div class="form-group">
        <div class="app-city-label">
          <label for="stateId">Estado:</label>
        </div>
        <div class="app-city-input">
          <select v-model="stateId">
            <option
              v-for="state in $store.getters.getStates"
              v-bind:value="state._id"
              v-bind:key="state.abbreviation"
            >{{state.name}}</option>
          </select>
          <div v-show="submitted && !stateId" class="invalid-feedback">A cidade precisa de um Estado</div>
        </div>
      </div>
      <div class="form-group">
        <div class="app-city-button">
          <button v-if="child" @click="closeModal()">Cancel</button>
          <input type="submit" value="Save" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import CityController from "./../../controllers/city";
import StateController from "./../../controllers/state";

export default {
  name: "RegisterCity",
  props: ["child"],
  data() {
    return {
      newName: "",
      newStateId: "",
      submitted: false,
    };
  },
  computed: {
    isEdit: {
      get() {
        if (!this.$store.getters.getCity) {
          return false;
        }

        if (!this.$store.getters.getCity._id) {
          return false;
        }

        return true;
      },
      set() {},
    },
    name: {
      get() {
        return this.$store.getters.getCity
          ? this.$store.getters.getCity.name
          : "";
      },
      set(value) {
        this.newName = value;
      },
    },
    stateId: {
      get() {
        if (this.child) {
          let stateAtive = this.$store.getters.getState;

          if (stateAtive) {
            return stateAtive._id;
          }
        }

        return this.$store.getters.getCity
          ? this.$store.getters.getCity.state._id
          : "";
      },
      set(value) {
        this.newStateId = value;
      },
    },
  },
  created() {
    if (!this.child) {
      let token = this.$store.getters.getToken;

      StateController.getStates(token).then((res) => {
        this.$store.commit("setStates", res);
      });
    }
  },
  methods: {
    closeModal() {
      this.$store.commit("setModal", false);
    },
    async handleSubmit(e) {
      this.submitted = true;

      const _id = this.$store.getters.getCity
        ? this.$store.getters.getCity._id
        : "";

      const name = this.newName ? this.newName : this.name;
      const stateId = this.newStateId ? this.newStateId : this.stateId;

      if (name && stateId) {
        let token = this.$store.getters.getToken;
        let city = await CityController.post(token, name, stateId, _id)
          .then(function (response) {
            return response;
          })
          .catch(function (error) {
            console.error(error);

            return null;
          });

        if (city) {
          let cities = this.$store.getters.getCities;

          if (!_id) {
            cities.push(city);

            cities.sort((ct1, ct2) => {
              return ct1.name < ct2.name ? -1 : 1;
            });

            this.$store.commit("setCities", cities);
          }

          this.$store.commit("setModal", false);
          if (this.child) {
            this.$store.commit("unSelectAllCities");
          } else {
            this.$store.commit("setCity", city);
          }
        }
      }
    },
  },
};
</script>
<style scoped>
.app-city {
  width: 200px;
  margin-left: auto;
  margin-right: auto;
}

.app-city .form-group {
  margin: 5px;
  display: inline-flex;
  width: 100%;
}

.app-city .form-group .app-city-label {
  margin-left: auto;
  margin-right: 5px;
  margin-top: 5px;
}

.app-city .form-group .app-city-label.name {
  margin-right: 12px;
}

.app-city .form-group .app-city-input {
  margin-right: auto;
  margin-top: 5px;
}

.app-city .form-group .app-city-input input {
  width: 145px;
}

.app-city .app-city-button {
  margin-left: auto;
}
</style>
