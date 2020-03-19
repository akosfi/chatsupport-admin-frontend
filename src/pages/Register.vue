<template>
    <div>
      <h2 class="text-center mt-3">Register</h2>
      <div class="d-flex justify-content-center mt-3">
        <form
          @submit="submitForm"
          method="POST"
        >
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

          <button type="submit" class="btn btn-primary">Register</button>
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
    };
  },
  components: {
  },
  methods: {
    submitForm: function(e) {
      e.preventDefault();
      const validationErrors = [];
      if(!this.username) {
        validationErrors.push("Name cannot be empty!");
      }
      if(!this.password) {
        validationErrors.push("Password cannot be empty!");
      }

      if(validationErrors.length > 0) return false;

      this.$store.dispatch('user/registerUserAction', {
        username: this.username,
        password: this.password,
        email: this.email,
      }).then(()=>{
        this.$router.push('/login');
      })
      .catch(() => {
        //push vlaidation erros to list
      });

    }
  }
}
</script>

<style>
</style>