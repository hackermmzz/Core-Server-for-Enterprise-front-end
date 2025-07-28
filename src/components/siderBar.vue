<template>
  <div class="sidebar">
    <div class="logo">
      <h2>Tech Logo</h2>
    </div>
    <ul class="nav-list">
      <li @click="navigateTo('home')">首页</li>
      <li @click="navigateTo('scene-fission')">场景裂变</li>
      <li @click="navigateTo('virtual-clothing')">虚拟穿衣</li>
      <li @click="navigateTo('smart-cutout')">智能抠图</li>
      <li @click="navigateTo('profile')">个人中心</li>
    </ul>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'Sidebar',
  setup() {
    const router = useRouter();

    const navigateTo = (page) => {
      router.push({ name: page });
    }

    return {
      navigateTo
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.6));
  color: #00ffcc;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.7);
  position: fixed;
  height: 100%;
  z-index: 100;
  transition: all 0.3s ease;
}

.sidebar:hover {
  box-shadow: 0 6px 50px rgba(0, 255, 204, 0.8);
}

.logo {
  padding: 0 20px;
  margin-bottom: 30px;
  font-size: 28px;
  text-align: center;
  color: #00ffcc;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 2px;
}

.nav-list {
  list-style-type: none;
  padding: 0;
  width: 100%;
}

.nav-list li {
  padding: 18px 20px;
  cursor: pointer;
  width: 100%;
  text-align: left;
  font-size: 18px;
  font-weight: 600;
  color: #00ffcc;
  transition: background-color 0.3s ease;
}

.nav-list li:hover {
  background-color: rgba(0, 255, 204, 0.2);
  transform: translateX(10px);
}

.nav-list li:active {
  background-color: rgba(0, 255, 204, 0.4);
  transform: translateX(5px);
}

/* 动画效果 */
@keyframes slideIn {
  0% {
    transform: translateX(-250px);
  }
  100% {
    transform: translateX(0);
  }
}

.sidebar {
  animation: slideIn 0.5s ease-out;
}
</style>
