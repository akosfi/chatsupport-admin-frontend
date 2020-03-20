<template>
    <div class="sidebar">
        <div class="sidebar-item sidebar-item-active d-flex justify-content-center align-items-center">
            <img src="https://image.flaticon.com/icons/svg/1380/1380338.svg" alt="Chats">
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
        height: 100vh;
        background: #f5f5f5;
        padding: 0;

        &-item {
            cursor: pointer;
            height: 80px;
            
            & img {
                height: 40px;
                width: 40px;
            }

            &-active {
                background: #a6a6a6;
            }
        }

    }
</style>