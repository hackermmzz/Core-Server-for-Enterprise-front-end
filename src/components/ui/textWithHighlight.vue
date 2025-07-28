<template>
  <div class="text-container">
    <span><slot name="text-before">Build </slot></span>
    <span class="highlighted-text"><slot name="highlighted-text">beautiful</slot></span>
    <span><slot name="text-after"> websites using Vue & Nuxt</slot></span>
  </div>
</template>

<script>
export default {
  name: 'TextWithHighlight'
}
</script>

<style scoped>
.text-container {
  font-size: 50px;
  font-weight: 700;
  color: white;
  display: flex;
  align-items: center;
}

.highlighted-text {
  background-image: linear-gradient(135deg, #ff5f6d, #ffc3a0);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  font-size: 55px;
  font-weight: 900;
  padding: 0 5px;
  animation: highlightText 2s infinite alternate;
}

@keyframes highlightText {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
</style>
