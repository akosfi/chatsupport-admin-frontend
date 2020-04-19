<template>
    <div>
      <h2 class="text-center mt-3">Login</h2>
      <div class="d-flex justify-content-center mt-3">
        <form
          method="POST"
          @submit="submitForm"
        >
            
          <div 
            v-for="error in validationErrors"
            :key="error"
            class="alert alert-danger"
            role="alert">
            {{error}}
          </div>

          <div class="form-group">
            <label for="usernameInput">Username</label>
            <input 
              v-model="username"
              type="text"
              name="username"
              class="form-control"
              placeholder="Enter username"
              id="usernameInput">
          </div>

          <div class="form-group">
            <label for="passwordInput">Password</label>
            <input
              v-model="password"
              type="password"
              name="password"
              class="form-control"
              placeholder="Password"
              id="passwordInput">
          </div>

          <div class="d-flex justify-content-between">
            <router-link
              to="/register"
            >
              <button class="btn btn-link">Register</button>
            </router-link>
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
    
</template>

<script>
export default {
  data: function () {
    return {
      username: '',
      password: '',
      validationErrors: [],
    }
  },
  components: {
  },
  methods: {
    submitForm: function(e) {
      e.preventDefault();
      this.validationErrors = [];
      const _errors = [];
      if(!this.username) {
        _errors.push("Username cannot be empty!");
      }
      if(!this.password) {
        _errors.push("Password cannot be empty!");
      }

      if(_errors.length > 0) return this.validationErrors = _errors;

      this.$store
          .dispatch('user/loginUserAction', {username: this.username, password: this.password})
          .then((r) => {
            this.$router.push('/chat');
          })
          .catch((r) => {
            this.validationErrors.push(r.message);
          });
    }
  }
}
</script>

<style>
</style>