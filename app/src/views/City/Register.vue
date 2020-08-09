<template>
  <div>
    <div v-if="isEdit">
      <h2>Editar Cidade</h2>
    </div>
    <div v-else>
      <h2>Nova Cidade</h2>
    </div>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Nome</label>
        <input
          type="text"
          v-model="name"
          name="name"
          class="form-control"
          :class="{ 'is-invalid': submitted && !name }"
        />
        <div v-show="submitted && !name" class="invalid-feedback">A cidade precisa de um nome</div>
      </div>
      <div class="form-group">
        <label for="stateId">Estado</label>
        <select v-model="stateId">
          <option
            v-for="state in $store.getters.getStates"
            v-bind:value="state._id"
            v-bind:key="state.abbreviation"
          >{{state.name}}</option>
        </select>
        <div v-show="submitted && !stateId" class="invalid-feedback">A cidade precisa de um Estado</div>
      </div>
      <div class="form-group">
        <input type="submit" value="Save" />
      </div>
    </form>
  </div>
</template>

<script>
import CityController from "./../../controllers/city";
import StateController from "./../../controllers/state";

export default {
  name: "RegisterCity",
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
        return this.$store.getters.getCity
          ? this.$store.getters.getCity.state
          : "";
      },
      set(value) {
        this.newStateId = value;
      },
    },
  },
  created() {
    let token = this.$store.getters.getToken;

    StateController.getStates(token).then((res) => {
      this.$store.commit("setStates", res);
    });
  },
  methods: {
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

          this.$store.commit("setCity", city);
        }
      }
    },
  },
};
</script>
