<template>
  <div class="register-box">
    <h2>立即注册</h2>
    <form @submit.prevent="handleSubmit">
      <!-- 邮箱输入框 -->
      <div class="form-item">
        <input type="email" v-model="email" placeholder="请输入邮箱" required />
      </div>

      <!-- 用户名输入框 -->
      <div class="form-item">
        <input type="text" v-model="username" placeholder="请输入用户名" required />
      </div>

      <!-- 密码输入框 -->
      <div class="form-item">
        <input type="password" v-model="password" placeholder="设置密码" required />
      </div>

      <!-- 确认密码输入框 -->
      <div class="form-item">
        <input type="password" v-model="confirmPassword" placeholder="确认密码" required />
      </div>

      <!-- 验证码输入框 -->
      <div class="form-item">
        <input type="text" v-model="captcha" placeholder="请输入验证码" required />
        <button type="button" @click="sendCaptcha" :disabled="isCaptchaSent" >
          {{ isCaptchaSent ? `已发送(${timer}s)` : '发送验证码' }}
        </button>
      </div>

      <!-- 注册按钮 -->
      <div class="form-item">
        <button type="submit" :disabled="!agreeToTerms || !isPasswordMatching">注册</button>
      </div>
    </form>

    <!-- 切换到登录 -->
    <div class="login-link">
      <p>已有账号？ <a href="#" @click.prevent="switchToLogin">立即登录</a></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      captcha: '',
      isCaptchaSent: false,
      timer: 60,
      agreeToTerms: false,
    };
  },
  computed: {
    // 检查密码和确认密码是否一致
    isPasswordMatching() {
      return this.password === this.confirmPassword;
    }
  },
  methods: {
    handleSubmit() {
      if (this.isPasswordMatching && this.email && this.username && this.password) {
        alert('注册成功');
      } else {
        alert('请确保所有信息填写正确');
      }
    },
    switchToLogin() {
      this.$emit('switch-to-login');
    },
    sendCaptcha() {
      if (!this.email) {
        alert('请先输入邮箱');
        return;
      }

      this.isCaptchaSent = true;
      this.timer = 60;
      const interval = setInterval(() => {
        if (this.timer === 0) {
          clearInterval(interval);
          this.isCaptchaSent = false;
        } else {
          this.timer--;
        }
      }, 1000);

      // 假设发送验证码的逻辑
      console.log('验证码已发送到：', this.email);
    }
  }
};
</script>

<style scoped>
/* 主要的注册框样式 */
.register-box {
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
input[type="email"],
input[type="text"],
input[type="password"],
input[type="text"] {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* 包含内边距和边框 */
  margin: 0;
}

/* 输入框获得焦点时的样式 */
input[type="email"]:focus, input[type="password"]:focus, input[type="text"]:focus {
  border-color: #28a745; /* 绿色边框 */
  outline: none;
}

/* 按钮样式 */
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
  margin-top: 10px;
}


/* 按钮鼠标悬停时效果 */
button:hover:enabled {
  background-color: #218838; /* 深绿色 */
}

/* 登录切换链接 */
.login-link {
  margin-top: 20px;
  font-size: 14px;
  color: #333;
}

/* 登录链接样式 */
.login-link a {
  color: #007bff;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 600px) {
  .register-box {
    padding: 20px;
    width: 90%;
  }

  h2 {
    font-size: 20px;
  }

  button {
    font-size: 14px;
    padding: 10px;
  }

  input[type="email"], input[type="password"], input[type="text"] {
    padding: 12px;
    font-size: 14px;
  }
}
</style>
