<template>
    <div class="panel">
        <side-bar></side-bar>
        <div 
            class="panel-content" 
            v-if="isIdentificationAttempted || isUserIdentified">

            <chat
                v-if="getGuests.length > 0"
            ></chat>

            <chat-install
                v-if="getGuests.length === 0"
            ></chat-install>
        </div>
    </div>
</template>

<script>
import SideBar from '../components/SideBar';
import ChatInstall from '../components/ChatInstall';
import Chat from '../components/Chat';
import { mapGetters } from 'vuex';

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