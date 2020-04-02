<template>
    <div class="chat">
        <div class="chat-guests">
            <div 
                class="chat-guests-guest"
                v-for="guest in getGuests"
                v-on:click="setCurrentGuest(guest.id)"
                :key="guest.id"
                v-bind:class="{ 
                    'chat-guests-guest-active': getCurrentGuest && getCurrentGuest.id == guest.id 
                    }">
                Guest #{{guest.id}}
            </div>
            
        </div>
        <div 
            class="chat-messages"
            v-if="getCurrentGuest"
            >
            <div class="chat-messages-list">
                <div 
                    class="chat-messages-message"
                    v-bind:class="styleChatMessage(message)"
                    v-for="message in getMessages"
                    :key="message.id"
                    >
                    <span>{{message.message}}</span>
                
                </div>
            </div>
            <div class="chat-messages-input">
                <input 
                    v-model="message"
                    v-on:keyup.enter="sendChatMessage"
                    placeholder="Enter message!">
                <div 
                    class="chat-messages-input-send"
                    v-on:click="sendChatMessage">
                    <img src="https://image.flaticon.com/icons/svg/481/481673.svg" alt="">
                </div>
            </div>
            
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
    styleChatMessage: function(message) {
        return {
            'chat-messages-message-left': !message.from_admin,
            'chat-messages-message-right': message.from_admin,
        }
    }
  },
  computed: {
    ...mapGetters({
        getClient: 'client/getClient',
        getGuests: 'client/getGuests',
        getCurrentGuest: 'client/getCurrentGuest',
        getUser: 'user/getUser',
        getMessages: 'client/getCurrentGuestMessages',
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
        $message-received-color: #5ea7ff;
        $message-received-font-color: white;
        $message-sent-color: white;
        $message-sent-font-color: black;

        width: 100%;
        display: flex;

        &-guests {
            flex: 0 0 20%;
            &-guest {
                padding-left: 16px;
                height: 48px;
                display: flex;
                align-items: center;
                font-size: 24px;
                cursor: pointer;
                border: 1px solid black;

                &-active {
                    background: gray;
                }
            }
        }

        &-messages {
            overflow-y: hidden;
            height: 100vh;
            width: 100%;
            background: #f5f5f5;
            display: flex;
            flex-direction: column;

            &-list {
                flex: 1 0 auto;
            }

            &-input {
                flex: 0 0 48px;
                background: red;
                position: relative;
                & input {
                    width: 100%;
                    border: none;
                    padding: 8px;
                    padding-right: 60px;
                    height: 100%;
                    box-sizing: border-box;
                }
                &-send {
                    height: 24px;
                    width: 24px;
                    cursor: pointer;
                    border-radius: 100%;
                    position: absolute;
                    right: 8px;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }

            &-message {
                width: 100%;
                
                &-left {
                    text-align: left;
                    
                    & > span {
                        background: $message-received-color;    
                        color: $message-received-font-color;
                    }
                }
                &-right {
                    text-align: right;

                    & > span {
                        background: $message-sent-color; 
                        color: $message-sent-font-color;   
                    }
                }
                & > span {
                    margin: 8px 8px 0 8px;
                    padding: 8px 16px;
                    border-radius: 16px;
                    display: inline-block;
                }
            }
        }
        
    }
</style>