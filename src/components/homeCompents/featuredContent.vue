<template>
  <div>
    <div class="card-group">
      <featured-gallery></featured-gallery>
    </div>

  </div>
</template>

<script>
import featuredGallery from '../workbenchCompents/featuredGallery.vue';
export default {
  name: 'featuredContent',
  components: {
    featuredGallery
  },
  data() {
    return {
      today: ''
    }
  },
  mounted() {
    // 格式化当前日期显示
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    this.today = new Date().toLocaleDateString('zh-CN', options);
  }
}
</script>

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
}

</style>
