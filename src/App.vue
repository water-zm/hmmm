<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style>
@import url(~@/style/base.css);
.app {
  height: 100%;
}
#nprogress .spinner {
  display: none !important;
}
</style>
