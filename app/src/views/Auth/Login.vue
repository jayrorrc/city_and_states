<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit" class="app-auth">
      <div class="form-group">
        <div class="app-auth-label">
          <label for="username">Username:</label>
        </div>
        <div class="app-auth-input">
          <input
            type="text"
            v-model="username"
            name="username"
            class="form-control"
            :class="{ 'is-invalid': submitted && !username }"
          />
          <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
        </div>
      </div>
      <div class="form-group">
        <div class="app-auth-label password">
          <label for="password">Password:</label>
        </div>
        <div class="app-auth-input">
          <input
            type="password"
            v-model="password"
            name="password"
            class="form-control"
            :class="{ 'is-invalid': submitted && !password }"
          />
          <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
        </div>
      </div>
      <div class="form-group">
        <div class="app-auth-button">
          <input type="submit" value="Login" />
          <router-link to="/signup" class="btn btn-link">Signup</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import Auth from "../../auth";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      submitted: false,
    };
  },
  methods: {
    async handleSubmit(e) {
      this.submitted = true;
      const { username, password } = this;

      if (username && password) {
        let auth = await Auth.login(username, password)
          .then(function (response) {
            let auth = {};
            auth.user = response.data.user;
            auth.token = response.data.token;

            return auth;
          })
          .catch(function (error) {
            console.error(error);

            return {};
          });
        this.$store.commit("setAuth", auth);
      }
    },
  },
};
</script>
<style scoped>
.app-auth {
  width: 235px;
  margin-left: auto;
  margin-right: auto;
}

.app-auth .form-group {
  margin: 5px;
  display: inline-flex;
  width: 100%;
}

.app-auth .form-group .app-auth-label {
  margin-left: auto;
  margin-right: 5px;
  margin-top: 5px;
}

.app-auth .form-group .app-auth-label.password {
  margin-right: 12px;
}

.app-auth .form-group .app-auth-input {
  margin-right: auto;
  margin-top: 5px;
}

.app-auth .form-group .app-auth-input input {
  width: 145px;
}

.app-auth .app-auth-button {
  margin-left: auto;
}
</style>
