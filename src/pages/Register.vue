<template>
    <div>
      <h2 class="text-center mt-3">Register</h2>
      <div class="d-flex justify-content-center mt-3">
        <form>
          <div class="form-group">
            <label for="usernameInput">Username</label>
            <input type="text" name="username" class="form-control" placeholder="Enter username" id="usernameInput">
          </div>

          <div class="form-group">
            <label for="emailInput">Email</label>
            <input type="text" name="email" class="form-control" placeholder="Enter email" id="emailInput">
          </div>

          <div class="form-group">
            <label for="passwordInput">Password</label>
            <input type="password" name="password" class="form-control" placeholder="Password" id="passwordInput">
          </div>

          <div class="form-group">
            <label for="passwordAgainInput">Repeat Password</label>
            <input type="password" name="passwordAgain" class="form-control" placeholder="Repeat Password" id="passwordAgainInput">
          </div>

          <button type="submit" class="btn btn-primary">Register</button>
        </form>
      </div>
    </div>
    
</template>

<script>
export default {
  components: {
  }
}
</script>

<style>
</style>