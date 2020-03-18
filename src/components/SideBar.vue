<template>
    <div class="sidebar">
        <div class="sidebar-item d-flex justify-content-center align-items-center">
            CHATS
        </div>
    </div>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style lang="scss">
    .sidebar {
        flex: 0 0 80px;
        padding: 0;

        &-item {
            cursor: pointer;
            height: 80px;
            background: palevioletred;
        }
    }
</style>