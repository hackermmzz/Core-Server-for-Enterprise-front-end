<template>
  <div class="login-container">
    <!-- 科技感网格背景装饰 -->
    <div class="grid-pattern"></div>
    
    <div class="login-card">
      <!-- 左侧图片区域 -->
      <div class="left-side">
        <div class="image-overlay"></div>
        <img src="../assets/image2.png" alt="Tech Background" />
        <div class="tech-badge">
          <span>TECH AUTHENTICATION</span>
        </div>
        <!-- 新增科技线条装饰 -->
        <div class="tech-lines"></div>
      </div>

      <!-- 右侧登录表单 -->
      <div class="right-side">
        <div class="login-header">
          <h2>身份验证</h2>
          <p>请输入您的账号信息登录系统</p>
        </div>
        
        <form @submit.prevent="handleSubmit" class="login-form">
          <!-- 邮箱输入框 -->
          <div class="form-item">
            <div class="input-wrapper">
              <i class="icon-envelope">✉️</i>
              <input 
                type="email" 
                v-model="email" 
                placeholder="请输入邮箱" 
                required 
                :class="{ 'focused': emailFocused }"
                @focus="emailFocused = true"
                @blur="emailFocused = false"
              />
            </div>
          </div>

          <!-- 密码输入框 -->
          <div class="form-item">
            <div class="input-wrapper">
              <i class="icon-lock">🔒</i>
              <input 
                :type="showPassword ? 'text' : 'password'" 
                v-model="password" 
                placeholder="6-16位数字&字母密码" 
                required 
                :class="{ 'focused': passwordFocused }"
                @focus="passwordFocused = true"
                @blur="passwordFocused = false"
              />
              <button 
                type="button" 
                class="toggle-password" 
                @click="showPassword = !showPassword"
                :aria-label="showPassword ? '隐藏密码' : '显示密码'"
              >
                <i class="icon-eye">{{ showPassword ? '👁️' : '👁️‍🗨️' }}</i>
              </button>
            </div>
          </div>

          <!-- 记住密码选项 -->
          <div class="remember-option">
            <label class="custom-checkbox">
              <input type="checkbox" v-model="rememberMe">
              <span class="checkmark"></span>
              <span class="label-text">记住登录状态</span>
            </label>
            <a href="#" class="forgot-link">忘记密码?</a>
          </div>

          <!-- 登录按钮 -->
          <div class="form-item">
            <button type="submit" :disabled="loading" class="login-btn">
              <span v-if="!loading">登录</span>
              <span v-else class="loading-indicator">
                <span class="spinner"></span>
                验证中...
              </span>
            </button>
          </div>

          <!-- 切换到注册 -->
          <div class="register-link">
            <p>还没有账号？ <a href="#" @click.prevent="switchToRegister">立即注册</a></p>
          </div>
        </form>

        <!-- 底部科技标识 -->
        <div class="tech-footer">
          <span>SECURITY PROTOCOL v2.4.1</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      showPassword: false,
      emailFocused: false,
      passwordFocused: false,
      rememberMe: false,
      emailError: false,
      passwordError: false,
      emailErrorMessage: '',
      passwordErrorMessage: ''
    };
  },
  methods: {
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email) {
        this.emailError = true;
        this.emailErrorMessage = '请输入邮箱';
        return false;
      } else if (!emailRegex.test(this.email)) {
        this.emailError = true;
        this.emailErrorMessage = '请输入有效的邮箱地址';
        return false;
      } else {
        this.emailError = false;
        this.emailErrorMessage = '';
        return true;
      }
    },
    validatePassword() {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/;
      if (!this.password) {
        this.passwordError = true;
        this.passwordErrorMessage = '请输入密码';
        return false;
      } else if (!passwordRegex.test(this.password)) {
        this.passwordError = true;
        this.passwordErrorMessage = '密码必须包含数字和字母，长度6-16位';
        return false;
      } else {
        this.passwordError = false;
        this.passwordErrorMessage = '';
        return true;
      }
    },
    async handleSubmit() {
      // 验证表单
      const isEmailValid = this.validateEmail();
      const isPasswordValid = this.validatePassword();
      
      if (!isEmailValid || !isPasswordValid) {
        this.$message.warning('请正确填写登录信息');
        return;
      }

      this.loading = true;
      try {
        const response = await fetch(this.BASE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'type': 'Login'
          },
          body: JSON.stringify({
            account: this.email,
            password: this.password,
            remember: this.rememberMe
          }),
          credentials: 'include'
        });

        const data = await response.json();
        
        if (response.ok && data.status === true) {
          this.$message.success(data.msg || '登录成功！');
          
          // 存储用户信息到全局
          this.$store.commit('setUserInfo', {
            email: this.email,
            vipStatus: data.vip,
            registDate: data.date,
            userID: data.userID,
            avatar: this.BASE_URL + data.avatar
          });
          
          // 记住密码处理
          if (this.rememberMe) {
            localStorage.setItem('rememberedEmail', this.email);
          } else {
            localStorage.removeItem('rememberedEmail');
          }
          
          // 延迟跳转
          setTimeout(() => {
            this.$router.push('/home');
          }, 1500);
        } else {
          this.$message.error(data.msg || data.error || '登录失败');
        }
      } catch (error) {
        console.error('登录错误:', error);
        this.$message.error('登录错误！请检查网络连接或联系管理员');
      } finally {
        this.loading = false;
      }
    },
    switchToRegister() {
      this.$emit('switch-to-register');
    }
  },
  mounted() {
    // 初始化表单，读取记住的邮箱
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      this.email = rememberedEmail;
      this.rememberMe = true;
    }
    
    // 设置页面样式
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
  },
  beforeUnmount() {
    document.body.style.overflow = 'auto';
  }
};
</script>

<style scoped>
/* 基础样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* 登录容器 */
.login-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #0f1221;
}

/* 科技感网格背景 - 调整密度和颜色 */
.grid-pattern {
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(59, 130, 246, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.08) 1px, transparent 1px);
  background-size: 30px 30px;
  z-index: 0;
  backdrop-filter: blur(10px);
  /* 网格动画效果 */
  animation: gridMove 15s linear infinite;
}

@keyframes gridMove {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 30px 30px;
  }
}

/* 登录卡片 - 优化光效 */
.login-card {
  position: relative;
  width: 90%;
  max-width: 1500px;
  height: 550px;
  display: flex;
  border-radius: 16px;
  overflow: hidden;
  z-index: 10;
  /* 优化边缘光效，增加动态感 */
  box-shadow: 
    0 0 15px rgba(59, 130, 246, 0.3),
    0 0 30px rgba(59, 130, 246, 0.15),
    0 0 45px rgba(59, 130, 246, 0.1),
    inset 0 0 1px rgba(255, 255, 255, 0.5);
  transition: all 0.5s ease;
}

/* 卡片悬浮效果增强 */
.login-card:hover {
  transform: translateY(-5px);
  box-shadow: 
    0 0 20px rgba(59, 130, 246, 0.4),
    0 0 40px rgba(59, 130, 246, 0.2),
    0 0 60px rgba(59, 130, 246, 0.15),
    inset 0 0 1px rgba(255, 255, 255, 0.7);
}

/* 左侧图片区域 */
.left-side {
  position: relative;
  flex: 1.2;
  height: 100%;
  overflow: hidden;
}

.left-side img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 8s ease;
  filter: brightness(0.6) contrast(1.2) saturate(1.1);
}

.login-card:hover .left-side img {
  transform: scale(1.05);
}

/* 图片覆盖层增强科技感 */
.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    rgba(15, 23, 42, 0.8),
    rgba(17, 24, 39, 0.4)
  );
  z-index: 1;
}

/* 新增科技线条装饰 */
.tech-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background: 
    linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: scanLines 4s linear infinite;
}

@keyframes scanLines {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 50px 50px;
  }
}

/* 左侧科技徽章优化 */
.tech-badge {
  position: absolute;
  bottom: 40px;
  left: 40px;
  z-index: 3;
  padding: 12px 20px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 30px;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.login-card:hover .tech-badge {
  border-color: rgba(59, 130, 246, 0.5);
  background: rgba(255, 255, 255, 0.08);
}

.tech-badge span {
  color: #e0e0e0;
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 300;
}

/* 右侧登录表单区域 */
.right-side {
  flex: 1;
  padding: 60px 50px;
  background: rgba(15, 23, 42, 0.3);
  backdrop-filter: blur(15px);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* 右侧背景装饰元素优化 */
.right-side::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 300px;
  height: 300px;
  background: rgba(59, 130, 246, 0.15);
  border-radius: 50%;
  filter: blur(100px);
  animation: pulse 6s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.4;
  }
}

/* 登录标题优化 */
.login-header {
  margin-bottom: 50px;
  text-align: center;
  position: relative;
}

.login-header h2 {
  font-size: 28px;
  color: #ffffff;
  margin-bottom: 10px;
  font-weight: 600;
  letter-spacing: 0.5px;
  position: relative;
  display: inline-block;
}

.login-header h2::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 2px;
  background: #3b82f6;
  border-radius: 1px;
}

.login-header p {
  color: #a0aec0;
  font-size: 15px;
  font-weight: 300;
}

/* 表单样式优化 */
.login-form {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

/* 表单项样式 */
.form-item {
  margin-bottom: 25px;
  width: 100%;
}

.input-wrapper {
  position: relative;
  width: 100%;
}

/* 输入框样式优化 */
input[type="email"],
input[type="password"],
input[type="text"] {
  width: 100%;
  padding: 15px 20px 15px 50px;
  font-size: 16px;
  border: 1px solid rgba(75, 85, 99, 0.5);
  border-radius: 10px;
  background: rgba(30, 41, 59, 0.5);
  color: #e2e8f0;
  transition: all 0.3s ease;
  outline: none;
}

input[type="email"]::placeholder,
input[type="password"]::placeholder,
input[type="text"]::placeholder {
  color: #64748b;
  transition: color 0.3s ease;
}

input[type="email"]:focus::placeholder,
input[type="password"]:focus::placeholder,
input[type="text"]:focus::placeholder {
  color: transparent;
}

input[type="email"]:focus,
input[type="password"]:focus,
input[type="text"]:focus,
input.focused {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  background: rgba(30, 41, 59, 0.7);
}

/* 输入框图标 */
.icon-envelope, .icon-lock, .icon-eye, .icon-eye-off {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #64748b;
  transition: color 0.3s ease;
  width: 18px;
  height: 18px;
}

.input-wrapper:focus-within .icon-envelope,
.input-wrapper:focus-within .icon-lock,
input.focused ~ .icon-envelope,
input.focused ~ .icon-lock {
  color: #3b82f6;
}

/* 密码切换按钮 */
.toggle-password {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #64748b;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
  padding: 0;
}

.toggle-password:hover {
  color: #e2e8f0;
}

.icon-eye, .icon-eye-off {
  left: auto;
  right: 15px;
}

/* 记住密码选项 */
.remember-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  font-size: 14px;
}

.custom-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.custom-checkbox input {
  display: none;
}

.checkmark {
  width: 16px;
  height: 16px;
  border: 1px solid #64748b;
  border-radius: 4px;
  margin-right: 8px;
  position: relative;
  transition: all 0.3s ease;
}

.custom-checkbox input:checked ~ .checkmark {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

.custom-checkbox input:checked ~ .checkmark::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.label-text {
  color: #a0aec0;
  transition: color 0.3s ease;
}

.custom-checkbox:hover .label-text {
  color: #e2e8f0;
}

.forgot-link {
  color: #3b82f6;
  text-decoration: none;
  transition: all 0.3s ease;
}

.forgot-link:hover {
  color: #60a5fa;
  text-decoration: underline;
}

/* 登录按钮样式优化 */
.login-btn {
  width: 100%;
  padding: 15px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 10px;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.login-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: 0.6s;
}

.login-btn:hover:not(:disabled)::before {
  left: 100%;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.4);
}

.login-btn:disabled {
  background: #475569;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

/* 加载指示器 */
.loading-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 注册链接 */
.register-link {
  margin-top: 40px;
  text-align: center;
  font-size: 15px;
  color: #a0aec0;
}

.register-link a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  padding-bottom: 2px;
}

.register-link a::after {
  content: '';
  position: absolute;
  width: 0;
  height: 1px;
  bottom: 0;
  left: 0;
  background-color: #3b82f6;
  transition: width 0.3s ease;
}

.register-link a:hover {
  color: #60a5fa;
}

.register-link a:hover::after {
  width: 100%;
}

/* 新增底部科技标识 */
.tech-footer {
  margin-top: auto;
  text-align: center;
  font-size: 12px;
  color: rgba(160, 174, 192, 0.5);
  padding-bottom: 10px;
}

/* 响应式设计优化 */
@media (max-width: 900px) {
  .login-card {
    flex-direction: column;
    height: auto;
    max-width: 500px;
    margin: 20px auto;
  }
  
  .left-side {
    height: 250px;
  }
  
  .tech-badge {
    bottom: 20px;
    left: 20px;
  }
  
  .right-side {
    padding: 40px 30px;
  }

  .login-header {
    margin-bottom: 30px;
  }
}
</style>