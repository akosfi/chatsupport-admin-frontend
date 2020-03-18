<template>
    <div class="panel">
        <side-bar></side-bar>
        <div class="panel-content">
            <chat-install></chat-install>
        </div>
    </div>
</template>

<script>
import SideBar from '../components/SideBar';
import ChatInstall from '../components/ChatInstall';

export default {
  components: {
      SideBar,
      ChatInstall,
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
        /*
        &-guests {
            flex: 0 0 256px;
            &-guest {
                padding-left: 16px;
                background: palegreen;
                height: 48px;
                display: flex;
                align-items: center;
                font-size: 24px;
                cursor: pointer;
            }
        }

        &-active {
            flex: 0 0 auto;
        }*/
    }
</style>