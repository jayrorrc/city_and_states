<template>
  <div>
    <div v-if="isEdit">
      <h2>Editar Estado</h2>
    </div>
    <div v-else>
      <h2>Novo Estado</h2>
    </div>

    <form @submit.prevent="handleSubmit" class="app-state">
      <div class="form-group">
        <div class="app-state-label name">
          <label for="name">Nome:</label>
        </div>
        <div class="app-state-input">
          <input
            type="text"
            v-model="name"
            name="name"
            class="form-control"
            :class="{ 'is-invalid': submitted && !name }"
          />
          <div v-show="submitted && !name" class="invalid-feedback">O estado precisa de um nome</div>
        </div>
      </div>
      <div class="form-group">
        <div class="app-state-label">
          <label for="abbreviation" class="app-state-label">Abbreviation:</label>
        </div>
        <div class="app-state-input">
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
          <div
            v-show="submitted && !isLetter"
            class="invalid-feedback"
          >Abreviação precisa ter duas letras maiúsculas</div>
        </div>
      </div>
      <div class="form-group">
        <div class="app-state-button">
          <input type="submit" value="Save" />
        </div>
      </div>
    </form>
    <br />
    <br />
    <div class="app-state-list-city" v-if="isEdit">
      <Menu :title="'Cidades'" :page="'city'" :child="true" />
    </div>
  </div>
</template>

<script>
import StateController from "./../../controllers/state";
import Menu from "./../../components/dashboard/Menu";

export default {
  name: "RegisterState",
  data() {
    return {
      newName: "",
      newAbbreviation: "",
      submitted: false,
    };
  },
  components: {
    Menu,
  },
  computed: {
    isLetter: function () {
      return /^[A-Z]{2}$/.test(this.abbreviation);
    },
    isEdit: function () {
      if (!this.$store.getters.getState) {
        return false;
      }

      if (!this.$store.getters.getState._id) {
        return false;
      }

      return true;
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
<style scoped>
.app-state,
.app-state-list-city {
  width: 285px;
  margin-left: auto;
  margin-right: auto;
}

.app-state .form-group {
  margin: 5px;
  display: inline-flex;
  width: 100%;
}

.app-state .form-group .app-state-label {
  margin-left: auto;
  margin-right: 5px;
  margin-top: 5px;
}

.app-state .form-group .app-state-label.name {
  margin-right: 56px;
}

.app-state .form-group .app-state-input {
  margin-right: auto;
  margin-top: 5px;
}

.app-state .app-state-button {
  margin-left: auto;
}
</style>
