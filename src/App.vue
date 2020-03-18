<template>
    <div class="">
      <router-view></router-view>
    </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang="scss">
  @import "~bootstrap/scss/bootstrap.scss";
  @import "~highlight.js/scss/atom-one-dark.scss";
  
  * {
    margin: 0;
    padding: 0;
  }

</style>