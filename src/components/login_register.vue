<template>
  <div class="home-container">
    
    

      <!-- 条件渲染：根据 isLogin 来决定显示哪个组件 -->
      <div v-if="isLogin">
        <login @switch-to-register="switchToRegister" />
      </div>
      <div v-else>
        <register @switch-to-login="switchToLogin" />
      </div>
    </div>
  
</template>

<script>
// 引入 Login 和 Register 组件
import login from './login.vue';
import register from './register.vue';

export default {
  name: 'Home',
  components: {
    login,
    register
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
  position: fixed; /* 使容器固定在视口 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh; /* 使容器占满整个屏幕 */
  background-image: url('../assets/login_register.jpg'); /* 替换为你自己的背景图片路径 */
  background-size: cover; /* 背景图片覆盖整个屏幕 */
  background-position: center; /* 背景图片居中 */
  background-attachment: fixed; /* 确保背景图片固定不动 */
  z-index: 0; /* 确保背景层显示在最底层 */
}

/* 内容区域样式 */
.content {
  background-color: rgba(255, 255, 255, 0.8); /* 半透明白色背景 */
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px; /* 最大宽度 */
  text-align: center;
  z-index: 1; /* 确保内容在背景之上 */
}
</style>
