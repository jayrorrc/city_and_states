<template>
  <div>
    <div v-if="isEdit">
      <h2>Editar Estado</h2>
    </div>
    <div v-else>
      <h2>Novo Estado</h2>
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
        <div v-show="submitted && !name" class="invalid-feedback">O estado precisa de um nome</div>
      </div>
      <div class="form-group">
        <label for="abbreviation">Abbreviation</label>
        <input
          type="abbreviation"
          v-model="abbreviation"
          name="abbreviation"
          class="form-control"
          :class="{ 'is-invalid': submitted && !abbreviation }"
        />
        <div
          v-show="submitted && !abbreviation"
          class="invalid-feedback"
        >O estado precisa de uma abreviação</div>
      </div>
      <div class="form-group">
        <input type="submit" value="Save" />
      </div>
    </form>
  </div>
</template>

<script>
import StateController from "./../../controllers/state";

export default {
  name: "RegisterState",
  data() {
    return {
      newName: "",
      newAbbreviation: "",
      submitted: false,
    };
  },
  computed: {
    isEdit: {
      get() {
        if (!this.$store.getters.getState) {
          return false;
        }

        if (!this.$store.getters.getState._id) {
          return false;
        }

        return true;
      },
      set() {},
    },
    name: {
      get() {
        return this.$store.getters.getState
          ? this.$store.getters.getState.name
          : "";
      },
      set(value) {
        this.newName = value;
      },
    },
    abbreviation: {
      get() {
        return this.$store.getters.getState
          ? this.$store.getters.getState.abbreviation
          : "";
      },
      set(value) {
        this.newAbbreviation = value;
      },
    },
  },
  methods: {
    async handleSubmit(e) {
      this.submitted = true;

      const _id = this.$store.getters.getState
        ? this.$store.getters.getState._id
        : "";

      const name = this.newName ? this.newName : this.name;
      const abbreviation = this.newAbbreviation
        ? this.newAbbreviation
        : this.abbreviation;

      if (name && abbreviation) {
        let token = this.$store.getters.getToken;
        let state = await StateController.post(token, name, abbreviation, _id)
          .then(function (response) {
            return response;
          })
          .catch(function (error) {
            console.error(error);

            return null;
          });

        if (state) {
          let states = this.$store.getters.getStates;

          if (!_id) {
            states.push(state);

            states.sort((st1, st2) => {
              return st1.name < st2.name ? -1 : 1;
            });

            this.$store.commit("setStates", states);
          }

          this.$store.commit("setState", state);
        }
      }
    },
  },
};
</script>
