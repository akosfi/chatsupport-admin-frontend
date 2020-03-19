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
          if(!this.isUserIdentified) {
            return this.$router.push('/login');
          }
          return this.$router.push('/chat');
        });
  },
}
</script>

<style lang="scss">
  @import "~bootstrap/scss/bootstrap.scss";
  @import "~highlight.js/scss/atom-one-dark.scss";
  
  * {
    margin: 0;
    padding: 0;
  }

</style>