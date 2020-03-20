<template>
    <div class="">
      <router-view></router-view>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ChatSocket from './socket';

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

          //move this to admin panel
          /*this.$store
              .dispatch('user/getChatConnectionToken')
              .then(chat_token => {
                ChatSocket.chat_token = chat_token;
                //ChatSocket.onChange = (connected) => this.$store.dispatch('socket/changeConnectionStatus', {connected});
                //ChatSocket.onMessage = (message) => this.$store.dispatch('chat/addMessage', {message: message.message});
                //ChatSocket.onConnectError = () => console.log("asd");
                ChatSocket._connect();
              })
              .catch(() => {});*/
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