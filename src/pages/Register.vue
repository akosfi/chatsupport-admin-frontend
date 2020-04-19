<template>
    <div>
      <h2 class="text-center mt-3">Register</h2>
      <div class="d-flex justify-content-center mt-3">
        <form
          @submit="submitForm"
          method="POST"
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
            <label for="emailInput">Email</label>
            <input
              v-model="email"
              type="text"
              name="email"
              class="form-control"
              placeholder="Enter email"
              id="emailInput">
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

          <div class="form-group">
            <label for="passwordAgainInput">Repeat Password</label>
            <input
              v-model="repeatedPassword"
              type="password"
              name="passwordAgain"
              class="form-control"
              placeholder="Repeat Password"
              id="passwordAgainInput">
          </div>

          <div class="d-flex justify-content-between">
            <router-link
              to="/login"
            >
              <button class="btn btn-link">Login</button>
            </router-link>
            <button type="submit" class="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </div>
    
</template>

<script>
export default {
  data: function() {
    return {
      username: "",
      password: "",
      repeatedPassword: "",
      email: "",
      validationErrors: [],
    };
  },
  components: {
  },
  methods: {
    submitForm: function(e) {
      e.preventDefault();
      this.validationErrors = [];
      if(!this.username) {
        this.validationErrors.push("Name cannot be empty!");
      }
      if(!this.password) {
        this.validationErrors.push("Password cannot be empty!");
      }
      if(!this.repeatedPassword) {
        this.validationErrors.push("Repeated Password cannot be empty!");
      }
      if(!this.email) {
        this.validationErrors.push("Email cannot be empty!");
      }
      if(this.password !== this.repeatedPassword) {
        this.validationErrors.push("Passwords do not match!");
      }

      if(this.validationErrors.length > 0) return;

      this.$store
          .dispatch('user/registerUserAction', {
            username: this.username,
            password: this.password,
            email: this.email,
          })
          .then(()=>{
            this.$router.push('/login');
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