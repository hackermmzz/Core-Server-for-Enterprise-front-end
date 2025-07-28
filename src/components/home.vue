<template>
  <div class="main-container">
    <!-- 左侧导航栏 -->
    <Sidebar />
    
    <!-- 右侧内容区域 -->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/siderBar.vue';

export default {
  name: 'App',
  components: {
    Sidebar,
  }
}
</script>

<style>
.main-container {
  display: flex;
  height: 100vh;
}

.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>
