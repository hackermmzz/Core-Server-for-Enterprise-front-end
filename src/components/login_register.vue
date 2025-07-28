<template>
  <vortex-component class="aurora-background" />

    

  <div class="home-container">
  <div class="text">
    <TextWithHighlight>
      <template v-slot:text-before>一起探索 </template>
      <template v-slot:highlighted-text>幻衣AI</template>
      <template v-slot:text-after> ，创造无限可能</template>
    </TextWithHighlight>
  </div>


    <!-- 条件渲染：根据 isLogin 来决定显示哪个组件 -->
    <div class="content-wrapper">


      <div v-if="isLogin">
        <login @switch-to-register="switchToRegister" class="content"></login>
      </div>
      <div v-else>
        <register @switch-to-login="switchToLogin" class="content"></register>
      </div>
    </div>

    
  </div>
  
</template>

<script>
// 引入 Login、Register 和 Vortex 组件
import login from './login.vue';
import register from './register.vue';
import vortexComponent from './Vortex.vue'; // 假设 Vortex 组件文件路径
import TextWithHighlight from '../components/ui/textWithHighlight.vue';
export default {
  name: 'Home',
  components: {
    login,
    register,
    vortexComponent, // 注册 Vortex 组件
    TextWithHighlight
  },
  data() {
    return {
      isLogin: true,  // 初始状态为登录
    };
  },
  methods: {
    // 切换到注册页面
    switchToRegister() {
      this.isLogin = false;
    },
    // 切换到登录页面
    switchToLogin() {
      this.isLogin = true;
    },
    // 切换登录和注册视图
    toggleLoginRegister() {
      this.isLogin = !this.isLogin;
    },
  }
};
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh; /* 确保容器占满整个视口 */
  z-index: 0; /* 确保整体容器在最底层 */
  overflow: hidden; /* 防止内容溢出 */
    background-color: rgba(255, 255, 255, 0.0); /* 半透明白色背景 */
}

/* Vortex 组件的背景样式 */
.aurora-background {
  position:fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* 保证 Vortex 背景在最底层 */
}

/* 内容区域的容器，确保内容在背景之上 */
.content-wrapper {
  position: fixed;
  z-index: 2; /* 确保内容在背景之上 */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

/* 内容区域样式 */
.content {
  background-color: rgba(255, 255, 255, 0.0); /* 半透明白色背景 */
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1200px; /* 最大宽度 */
  text-align: center;
}
.text {
  margin-bottom: 650px;
  z-index: 5;
}
</style>
