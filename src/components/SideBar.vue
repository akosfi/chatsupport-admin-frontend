<template>
    <div class="sidebar list-group">
        <div 
            v-on:click="navigateTo('/chat')"
            v-bind:class="{'active': isItemActive('/chat')}"
            class="sidebar-item list-group-item d-flex justify-content-center align-items-center">
            <svg class="bi bi-envelope" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M14 3H2a1 1 0 00-1 1v8a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1zM2 2a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H2z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M.071 4.243a.5.5 0 01.686-.172L8 8.417l7.243-4.346a.5.5 0 01.514.858L8 9.583.243 4.93a.5.5 0 01-.172-.686z" clip-rule="evenodd"/>
                <path d="M6.752 8.932l.432-.252-.504-.864-.432.252.504.864zm-6 3.5l6-3.5-.504-.864-6 3.5.504.864zm8.496-3.5l-.432-.252.504-.864.432.252-.504.864zm6 3.5l-6-3.5.504-.864 6 3.5-.504.864z"/>
            </svg>
        </div>

        <div 
            v-on:click="navigateTo('/admins')"
            v-bind:class="{'active': isItemActive('/admins')}"
            class="sidebar-item list-group-item d-flex justify-content-center align-items-center">
            <svg class="bi bi-person" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M13 14s1 0 1-1-1-4-6-4-6 3-6 4 1 1 1 1h10zm-9.995-.944v-.002.002zM3.022 13h9.956a.274.274 0 00.014-.002l.008-.002c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664a1.05 1.05 0 00.022.004zm9.974.056v-.002.002zM8 7a2 2 0 100-4 2 2 0 000 4zm3-2a3 3 0 11-6 0 3 3 0 016 0z" clip-rule="evenodd"/>
            </svg>
        </div>

        <div
            v-on:click="logout"
            class="sidebar-item sidebar-item-last list-group-item d-flex justify-content-center align-items-center">
            <svg class="bi bi-power" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M5.578 4.437a5 5 0 104.922.044l.5-.866a6 6 0 11-5.908-.053l.486.875z" clip-rule="evenodd"/>
                <path fill-rule="evenodd" d="M7.5 8V1h1v7h-1z" clip-rule="evenodd"/>
            </svg>
        </div>
    </div>
</template>

<script>
export default {
  components: {
  },
  mounted: function() {
      console.log("hi");
  },
  methods: {
      isItemActive(route) {
          return route === this.$route.path;
      },
      logout() {
        this.$store
            .dispatch('socket/disconnectAction')
            .then(() => {
                return this.$store.dispatch('user/logoutUserAction'); 
            })
            .then(() => {
                this.navigateTo('/login');
            });
      },
      navigateTo: function(url){
        this.$router.push(url);
      }
  }
}
</script>

<style lang="scss">
    @import "~bootstrap/scss/bootstrap.scss";
    
    
    .sidebar {
        flex: 0 0 80px;
        height: 100vh;
        background: #f5f5f5;
        padding: 0;

        &-item {
            cursor: pointer;
            height: 80px;

            & svg {
                height: 40px;
                width: 40px;
            }

            &-last {
                margin-top: auto;
            }
        }

    }
</style>