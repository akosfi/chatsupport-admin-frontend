<template>
    <div class="">
      <router-view></router-view>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App',
  components: {
  },
  computed: {
    ...mapGetters({
      isUserIdentified: 'user/isUserIdentified',
    }),
  },
  mounted: function () {
    this.$store
        .dispatch('user/isUserLoggedInAction')
        .then(() => {
          this.$router.push('/chat');
        })
        .catch(() => {
          if(this.$route.path !== '/login' && this.$route.path !== '/register'){
            return this.$router.push('/login');
          } 
        });

      
  },
}
</script>

<style lang="scss">
  @import "~bootstrap/scss/bootstrap.scss";
  @import "~highlight.js/scss/railscasts.scss";
  
  * {
    margin: 0;
    padding: 0;
  }

</style>