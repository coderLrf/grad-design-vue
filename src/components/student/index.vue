<template>
  <div class="index">
    <div class="con">
      <svg viewBox="0 0 400 300" class="svg">
        <symbol id="id">
          <text dy="1em">欢迎进入选题系统</text>
        </symbol>
        <use class="text" xlink:href="#id"></use>
        <use class="text" xlink:href="#id"></use>
        <use class="text" xlink:href="#id"></use>
        <use class="text" xlink:href="#id"></use>
        <use class="text" xlink:href="#id"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
};
</script>

<style scoped>
.index{
  width: 100%;
  height: calc(100vh - 100px);
  overflow: hidden;
}
.svg{    
    margin-top:11rem;
}
.text {
  font: 3em/1 Arial Rounded MT Bold;
  text-transform: uppercase;
  fill: none;
  stroke-width: 3;
  stroke-linejoin: round;
  stroke-dasharray: 70 330;
  stroke-dashoffset: 0;
  animation: stroke 15s infinite;
}
.text:nth-child(5n + 1) {
  stroke: #9fa8da;
  animation-delay: -1.5s;
}
.text:nth-child(5n + 2) {
  stroke: #9fa8da;
  animation-delay: -3s;
}
.text:nth-child(5n + 3) {
  stroke: #7986cb;
  animation-delay: -4.5s;
}
.text:nth-child(5n + 4) {
  stroke: #5c6bc0;
  animation-delay: -6s;
}
.text:nth-child(5n + 5) {
  stroke: #3f51b5;
  animation-delay: -7.5s;
}
@keyframes stroke {
  100% {
    stroke-dashoffset: -400;
  }
}
</style>