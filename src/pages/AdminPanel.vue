<template>
    <div class="panel">
        <side-bar></side-bar>
        <div 
            class="panel-content" 
            v-if="isIdentificationAttempted || isUserIdentified">

            <div v-if="getGuests">
                <chat
                    v-if="getGuests.length > 0"
                ></chat>

                <chat-install
                    v-if="getGuests.length === 0"
                ></chat-install>
            </div> 
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import SideBar from '../components/SideBar';
import ChatInstall from '../components/ChatInstall';
import Chat from '../components/Chat';

import ChatSocket from '../socket';

export default {
  components: {
      SideBar,
      ChatInstall,
      Chat,
  },
  computed: {
    ...mapGetters({
        isIdentificationAttempted: 'user/isIdentificationAttempted',
        isUserIdentified: 'user/isUserIdentified',
        getClient: 'chatClient/getClient',
        getGuests: 'chatClient/getGuests',
    }),
  },
  mounted: function() {
    this.$store
        .dispatch('chatClient/getClientAction')
        .then((r) => {
            return this.$store.dispatch('chatClient/getGuestsOfClientAction', this.getClient.id);
        })
        .catch(() => {
            return this.$store.dispatch('chatClient/createClientAction');
        });


    this.$store
        .dispatch('user/getChatConnectionToken')
        .then(token => {
            ChatSocket.chat_token = token;
            ChatSocket.onChange = () => {};
            //ChatSocket.onChange = (connected) => this.$store.dispatch('socket/changeConnectionStatus', {connected});
            ChatSocket.onMessage = (message) => this.$store.dispatch('chat/addMessage', {message: message.message});
            
            ChatSocket.connect();
        });
    }
}
</script>

<style lang="scss">
    .panel {
        display: flex;
        padding: 0;
        margin: 0;
        width: 100%;
        
        &-content {
            flex: 1 1 auto;
        }
    }
</style>