<template>
  <div class="home">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Home",
  inject: ['reload'] // 引入方法
};
</script>

<style scoped>
</style>