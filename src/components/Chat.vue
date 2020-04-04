<template>
    <div 
        class="chat"
        v-if="isConnected"
        >
        <div class="chat-guests list-group">
            <div 
                class="chat-guests-guest list-group-item"
                v-for="guest in getGuests"
                v-on:click="setCurrentGuest(guest.id)"
                :key="guest.id"
                v-bind:class="isGuestCurrent(guest)">
                Guest #{{guest.id}}

                <span class="chat-guests-guest-notification">2</span>
            </div>
            
        </div>
        <div 
            class="chat-messages"
            v-if="getCurrentGuest"
            >
            <div id="messages" class="chat-messages-list">
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

export default {
    data: function() {
        return {
            message: "",
        }
    },
    components: {
    },
    methods: {
        setCurrentGuest: function(id) {
            this.$store
                .dispatch('client/setCurrentGuestAction', id);
        },
        styleChatMessage: function(message) {
            return {
                'chat-messages-message-left': !message.from_admin,
                'chat-messages-message-right': message.from_admin,
            }
        },
        sendChatMessage: function() {
            if(!this.message) return;
            this.$store.dispatch('socket/sendMessageAction', {message: this.message, guest_id: this.getCurrentGuest.id});
            
            this.message = "";
        },
        isGuestCurrent: function(guest) {
            return { 
                'active': this.getCurrentGuest && this.getCurrentGuest.id == guest.id 
            };
        },
        scrollToBottom: function() {
            if(!this.$el.querySelector) return;
            var container = this.$el.querySelector("#messages");
            if(!container) return;
            container.scrollTop = container.scrollHeight;
        }
    },
    computed: {
        ...mapGetters({
            getClient: 'client/getClient',
            getGuests: 'client/getGuests',
            getCurrentGuest: 'client/getCurrentGuest',
            getUser: 'user/getUser',
            getMessages: 'client/getCurrentGuestMessages',
            isConnected: 'socket/isConnected',
            hasTriedConnecting: 'socket/hasTriedConnecting',
        }),
    },
    watch: {
        isConnected: function(val) {
            if(this.hasTriedConnecting) {
                if(val === false) {
                    this.$store.dispatch('socket/connectAction');
                }
            }
        }
    },
    mounted: function() {
        this.$store
            .dispatch('user/getChatConnectionToken')
            .then(token => {
                this.$store
                    .dispatch('socket/setCredentialsAction', {user_id: this.getUser.id, chat_token: token})
                    .then(() => {
                        this.$store.dispatch('socket/connectAction');
                    });
            });
    },

    updated: function() {
        this.scrollToBottom();
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
                cursor: pointer;
                position: relative;

                &-notification {
                    background: red;
                    color: white;
                    border-radius: 100%;
                    position: absolute;
                    right: 8px;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 24px;
                    height: 24px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }
        }

        &-messages {
            height: 100vh;
            max-height: 100vh;
            width: 100%;
            background: #f5f5f5;
            display: flex;
            flex-direction: column;

            &-list {
                overflow-y: scroll;
                flex: 0 0 calc(#{100%} - #{48px});
            }

            &-input {
                flex: 0 0 48px;
                position: relative;
                border-top: 1px solid lightslategrey;

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