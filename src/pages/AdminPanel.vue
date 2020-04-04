<template>
    <div class="panel">
        <side-bar></side-bar>
        <div 
            class="panel-content" 
            v-if="isIdentificationAttempted && isUserIdentified">

            <div v-if="getClient && getGuests">
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
            getClient: 'client/getClient',
            getGuests: 'client/getGuests',
        }),
    },
    watch: {
        getGuests: function(guests) {
            if(guests.length > 0) {
                this.$store.dispatch('client/setCurrentGuestAction', guests[0].id)
            }
        },
    },
    mounted: function() {
        this.$store
            .dispatch('client/getClientAction')
            .then((r) => {
                return this.$store.dispatch('client/getGuestsOfClientAction', this.getClient.id);
            })
            .catch(() => {
                return this.$store
                    .dispatch('client/createClientAction');
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