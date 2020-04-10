<template>
    <div class="">
      <router-view
        v-if="isIdentificationAttempted"
      ></router-view>
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
      isIdentificationAttempted: 'user/isIdentificationAttempted',
    }),
  },
  mounted: function () {
    this.$store
        .dispatch('user/isUserLoggedInAction')
        .then(() => {})
        .catch(() => {
          if(this.$route.path != "/login" && this.$route.path != "/register") {
            this.$router.push('/login');
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