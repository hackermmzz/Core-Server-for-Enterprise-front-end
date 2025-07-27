<template>
  <div class="login-box">
    <h2>邮箱密码登录</h2>
    <form @submit.prevent="handleSubmit">
      <!-- 邮箱输入框 -->
      <div class="form-item">
        <input type="email" v-model="email" placeholder="请输入邮箱" required />
      </div>

      <!-- 密码输入框 -->
      <div class="form-item">
        <input type="password" v-model="password" placeholder="6-16位数字&字母密码" required />
      </div>

      <!-- 登录按钮 -->
      <div class="form-item">
        <button type="submit">登录</button>
      </div>

      <!-- 切换到注册 -->
      <div class="register-link">
        <p>还没有账号？ <a href="#" @click.prevent="switchToRegister">立即注册</a></p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    handleSubmit() {
      // 登录处理逻辑
      alert('登录成功');
    },
    switchToRegister() {
      // 通知父组件切换到注册页面
      this.$emit('switch-to-register');
    }
  }
};
</script>

<style scoped>
/* 整体页面背景渐变 */
body {
  margin: 0;
  height: 100vh;
  background: linear-gradient(135deg, #0a1d2c, #4e7d94); /* 星空渐变背景 */
  background-size: cover;
  background-position: center;
}

/* 主要的登录框样式 */
.login-box {
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.4); /* 半透明背景 */
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 20px auto;
}

/* 标题样式 */
h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

/* 表单项容器 */
.form-item {
  margin-bottom: 20px;
}

/* 输入框样式 */
input[type="email"], input[type="password"] {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* 包含内边距和边框 */
  margin: 0;
}

/* 输入框获得焦点时的样式 */
input[type="email"]:focus, input[type="password"]:focus {
  border-color: #28a745; /* 绿色边框 */
  outline: none;
}

/* 登录按钮样式 */
button {
  width: 100%;
  padding: 12px;
  background-color: #28a745;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* 按钮禁用时的样式 */
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* 按钮鼠标悬停时效果 */
button:hover:enabled {
  background-color: #218838; /* 深绿色 */
}

/* 切换到注册页面的链接 */
.register-link {
  margin-top: 20px;
  font-size: 14px;
  color: #333;
}

/* 注册链接样式 */
.register-link a {
  color: #007bff;
  text-decoration: none;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
