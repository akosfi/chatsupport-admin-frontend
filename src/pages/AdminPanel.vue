<template>
    <div class="panel">
        <side-bar></side-bar>
        <div 
            class="panel-content" 
            v-if="isIdentificationAttempted && isUserIdentified && getClient">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

import SideBar from '../components/SideBar';
import ChatInstall from '../components/ChatInstall';
import Chat from '../components/Chat';
import ChatAdmins from '../components/ChatAdmins';


export default {
    components: {
        SideBar,
        ChatInstall,
        Chat,
        ChatAdmins,
    },
    computed: {
        ...mapGetters({
            isIdentificationAttempted: 'user/isIdentificationAttempted',
            isUserIdentified: 'user/isUserIdentified',
            getClient: 'client/getClient',
        }),
    },
    mounted: function() {
        this.$store
            .dispatch('client/getClientAction')
            .then((r) => {
                this.$store.dispatch('client/getUnseenMessagesOfClient', this.getClient.id);
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