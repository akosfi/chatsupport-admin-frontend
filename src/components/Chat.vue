<template>
    <div class="chat">
        <div class="chat-guests">
            <div 
                class="chat-guests-guest"
                v-for="guest in getGuests"
                v-on:click="setCurrentGuest(guest.id)"
                :key="guest.id">
                Guest #{{guest.id}}
            </div>
            
        </div>
        <div class="chat-messages">

        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';


import ChatSocket from '../socket';

export default {
  components: {
  },
  methods: {
    setCurrentGuest: function(id) {
        this.$store
            .dispatch('client/setCurrentGuestAction', id)
            .then(() => {
                
            });
    },
  },
  computed: {
    ...mapGetters({
        getClient: 'client/getClient',
        getGuests: 'client/getGuests',
        getUser: 'user/getUser',
    }),
  },
  mounted: function() {
    this.$store
        .dispatch('user/getChatConnectionToken')
        .then(token => {
            ChatSocket.chat_token = token;
            ChatSocket.user_id = this.getUser.id;
            ChatSocket.onChange = () => {};
            //ChatSocket.onChange = (connected) => this.$store.dispatch('socket/changeConnectionStatus', {connected});
            ChatSocket.onMessage = (message) => this.$store.dispatch('chat/addMessage', {message: message.message});
            
            ChatSocket.connect();
        });
  },
}
</script>

<style lang="scss">
    .chat {
        width: 100%;
        display: flex;

        &-guests {
            flex: 0 0 20%;
            background: red;
            &-guest {
                padding-left: 16px;
                background: yellow;
                height: 48px;
                display: flex;
                align-items: center;
                font-size: 24px;
                cursor: pointer;
            }
        }

        &-messages {
            flex: 0 0 80%;
            background: salmon;
            height: 100vh;
        }
    }
</style>