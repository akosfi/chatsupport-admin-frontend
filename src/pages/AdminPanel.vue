<template>
    <div class="panel">
        <side-bar></side-bar>
        <div 
            class="panel-content" 
            v-if="isIdentificationAttempted === true">
            <chat></chat>
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
    }),
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