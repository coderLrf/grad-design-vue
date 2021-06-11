<template>
  <div class="home">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      
    };
  },
  beforeCreate() {
    this.$store.state.top == "学生" ? this.$router.replace( '/home/Studenthome/instructor')  : this.$router.replace('/home/teacherhome/newlyAdded')     
  },
  methods: {

  },
};
</script>

<style scoped>
</style>